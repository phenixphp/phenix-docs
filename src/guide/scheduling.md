# Scheduling

## Table of Contents

- [Overview](#overview)
- [Defining schedules](#defining-schedules)
- [Distributed occurrence lock](#distributed-occurrence-lock)
- [Frequency and timezone](#frequency-and-timezone)
- [Running schedules](#running-schedules)
- [Breaking changes](#breaking-changes)
- [Worker behavior](#worker-behavior)

## Overview

Phenix runs named cron schedules in a dedicated scheduler process. Scheduled
business work never starts inside HTTP workers, so increasing the HTTP cluster
size does not multiply scheduled executions.

Two commands are available:

- `php phenix schedule:run`: evaluates schedules once and exits.
- `php phenix schedule:work`: continuously evaluates schedules once per minute.

Production deployments should run `schedule:work` separately from the HTTP
server and queue workers.

## Defining schedules

Schedules are loaded from `schedule/schedules.php`:

```php
<?php

declare(strict_types=1);

use App\Tasks\DeleteExpiredTokens;
use Phenix\Facades\Schedule;

Schedule::call('delete-expired-tokens', function (): void {
    DeleteExpiredTokens::dispatch();
})->everyMinute();
```

The first argument is a required, stable, application-wide name. Duplicate
names are rejected while the application boots.

Prefer dispatching a durable queue task from the callback. The scheduler
decides when work is due; queue workers execute and retry it.

## Distributed occurrence lock

Before invoking a due callback, Phenix acquires a Redis lock for the schedule
name and UTC minute. If two scheduler processes evaluate the same occurrence,
only one invokes the callback.

Configure the lock in `config/schedule.php`:

```php
return [
    'connection' => env('SCHEDULE_REDIS_CONNECTION', static fn (): string => 'default'),
    'lock_prefix' => env('SCHEDULE_LOCK_PREFIX', static fn (): string => 'phenix:schedule:'),
    'occurrence_ttl' => env('SCHEDULE_OCCURRENCE_TTL', static fn (): int => 86400),
];
```

Redis is therefore required when schedules are enabled. The occurrence lock is
a duplicate-dispatch guard, not a durable job store. A callback should enqueue
important work rather than perform a long operation directly.

If a callback throws, Phenix releases its occurrence lock so another evaluation
can retry it. A process failure after acquiring the lock cannot release it, so
the lock expires after `occurrence_ttl`. Scheduled callbacks should remain short
and dispatch durable, idempotent queue tasks.

## Frequency and timezone

```php
Schedule::call('daily-report', function (): void {
    GenerateDailyReport::dispatch();
})->dailyAt('07:30')->timezone('America/New_York');
```

Available helpers:

- `hourly()`, `daily()`, `weekly()`, `monthly()`
- `everyMinute()`, `everyFiveMinutes()`, `everyTenMinutes()`
- `everyFifteenMinutes()`, `everyThirtyMinutes()`
- `everyTwoHours()`, `everyTwoDays()`
- `everyWeekday()`, `everyWeekend()`, `mondays()`, `fridays()`
- `dailyAt('HH:MM')`, `weeklyAt('HH:MM')`, `at('HH:MM')`
- `timezone(string $timezone)`

Timezone defaults to UTC. The distributed occurrence key always uses the UTC
minute, independently of the timezone used to evaluate the cron expression.

## Running schedules

Run once, typically from an external cron service:

```bash
php phenix schedule:run
```

Run as a managed long-lived process:

```bash
php phenix schedule:work
```

Although the distributed lock prevents duplicate occurrences, keep one
scheduler replica under normal operation. The lock protects deployments,
restarts and accidental overlap.

## Breaking changes

- `Schedule::call()` now requires a stable name before the closure.
- `Schedule::timer()`, `Timer` and `TimerRegistry` were removed.
- HTTP server startup no longer starts periodic business work.
- Work requiring intervals shorter than one minute should use a dedicated
  managed process, not an HTTP worker.

## Worker behavior

`ScheduleWorker`:

- uses UTC as its clock;
- evaluates schedules at the start of each minute;
- avoids repeated evaluation of the same minute inside one process;
- relies on the Redis occurrence lock across processes;
- handles `SIGINT` and `SIGTERM` for graceful shutdown.
