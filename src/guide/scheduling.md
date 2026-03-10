# Scheduling

## Table of Contents

- [Overview](#overview)
- [Defining schedules](#defining-schedules)
- [Cron-style schedules](#cron-style-schedules)
- [Timers](#timers)
- [Timers vs schedule calls](#timers-vs-schedule-calls)
- [Running scheduled tasks](#running-scheduled-tasks)
- [Worker behavior](#worker-behavior)
- [API reference](#api-reference)
  - [Schedule facade](#schedule-facade)
  - [Scheduler methods](#scheduler-methods)
  - [Timer methods](#timer-methods)
- [Notes and current behaviors](#notes-and-current-behaviors)

## Overview

Phenix Scheduling provides two execution models:

- Cron-style schedules using `Schedule::call(...)` and `Scheduler`.
- Interval timers using `Schedule::timer(...)` and `Timer`.

It also provides two CLI commands:

- `php phenix schedule:run`: executes scheduled cron tasks once.
- `php phenix schedule:work`: runs a long-lived worker loop for cron tasks.

Recommended runtime approach: use `schedule:work` as the primary process for cron schedules.

## Defining schedules

Schedules are loaded from:

```txt
schedule/schedules.php
```

This file is loaded automatically by `SchedulingServiceProvider` when it exists.

Example:

```php
<?php

declare(strict_types=1);

use Phenix\Facades\Schedule;

Schedule::call(function (): void {
    // Cron-style task
})->dailyAt('03:30');

Schedule::timer(function (): void {
    // Interval timer task
})->everyFiveMinutes();
```

## Cron-style schedules

Use `Schedule::call(...)` to define cron-based tasks.

```php
use Phenix\Facades\Schedule;

Schedule::call(function (): void {
    // Runs every day at 07:30 in New York time
})->dailyAt('07:30')->timezone('America/New_York');
```

Common helpers:

- `hourly()`, `daily()`, `weekly()`, `monthly()`
- `everyMinute()`, `everyFiveMinutes()`, `everyTenMinutes()`, `everyFifteenMinutes()`, `everyThirtyMinutes()`
- `everyTwoHours()`, `everyTwoDays()`, `everyWeekday()`, `everyWeekend()`, `mondays()`, `fridays()`
- `dailyAt('HH:MM')`, `weeklyAt('HH:MM')`, `at('HH:MM')`

## Timers

Use `Schedule::timer(...)` for repeated interval execution.

```php
use Phenix\Facades\Schedule;

Schedule::timer(function (): void {
    // Cleanup or retry logic every 10 seconds
})->everyTenSeconds();
```

Milliseconds are supported:

```php
Schedule::timer(function (): void {
    // Fast poller
})->milliseconds(250);
```

Timer control methods:

- `reference()` / `unreference()`
- `enable()` / `disable()`
- `isEnabled()`

## Timers vs schedule calls

`Schedule::call(...)` and `Schedule::timer(...)` are executed by different runtimes:

- `schedule:run` and `schedule:work` execute cron schedules (`Schedule::call(...)`) through `Schedule::run()`.
- Timers (`Schedule::timer(...)`) are **not** executed by `schedule:run` or `schedule:work`.

Timers are started automatically by the server runtime event loop when the app boots and runs `TimerRegistry::run()`.

In practice:

- Use `Schedule::call(...)` for minute-based cron execution with `schedule:run` / `schedule:work`.
- Use `Schedule::timer(...)` for interval-based execution inside the running server process.

## Running scheduled tasks

Run cron schedules once:

```bash
php phenix schedule:run
```

Run cron schedules continuously (recommended):

```bash
php phenix schedule:work
```

Typical production pattern is to keep `schedule:work` running as a managed process.

## Worker behavior

`ScheduleWorker` currently behaves as follows:

- Poll loop sleeps every `100ms`.
- Time source is `UTC` (`Date::now('UTC')`).
- It runs schedules only when `second === 0`.
- It prevents duplicate execution within the same minute using a `Y-m-d H:i` key.
- It listens for `SIGINT` and `SIGTERM` and exits gracefully.

## API reference

### Schedule facade

- `Schedule::call(Closure $closure): Scheduler`
- `Schedule::timer(Closure $closure): Timer`
- `Schedule::run(): void`

### Scheduler methods

Core:

- `hourly(): self`
- `daily(): self`
- `weekly(): self`
- `monthly(): self`
- `everyMinute(): self`
- `everyFiveMinutes(): self`
- `everyTenMinutes(): self`
- `everyFifteenMinutes(): self`
- `everyThirtyMinutes(): self`
- `everyTwoHours(): self`
- `everyTwoDays(): self`
- `everyWeekday(): self`
- `everyWeekend(): self`
- `mondays(): self`
- `fridays(): self`

Time composition:

- `dailyAt(string $time): self`
- `weeklyAt(string $time): self`
- `at(string $time): self`
- `timezone(string $tz): self`

Execution:

- `tick(Date|null $now = null): void`

### Timer methods

Interval setup:

- `seconds(float $seconds): self`
- `milliseconds(int $milliseconds): self`
- `everySecond(): self`
- `everyTwoSeconds(): self`
- `everyFiveSeconds(): self`
- `everyTenSeconds(): self`
- `everyFifteenSeconds(): self`
- `everyThirtySeconds(): self`
- `everyMinute(): self`
- `everyTwoMinutes(): self`
- `everyFiveMinutes(): self`
- `everyTenMinutes(): self`
- `everyFifteenMinutes(): self`
- `everyThirtyMinutes(): self`
- `hourly(): self`

Lifecycle:

- `reference(): self`
- `unreference(): self`
- `run(): self`
- `enable(): self`
- `disable(): self`
- `isEnabled(): bool`

## Notes and current behaviors

- Scheduler timezone defaults to `UTC`.
- `schedule:run` triggers only cron schedules (`Schedule::run()`); it does not run interval timers.
- Timers are registered in `TimerRegistry` and are started when the server runtime calls `TimerRegistry::run()`.
- Timer intervals have a minimum effective value of `0.001` seconds.
- For timers, you should define interval methods (for example `everySecond()` or `milliseconds(100)`) before runtime starts timers.
