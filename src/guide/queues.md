# Queue

## Table of Contents

- [Introduction](#introduction)
- [Creating Tasks](#creating-tasks)
    - [Generate a Queuable Task](#generate-a-queuable-task)
    - [Task Class](#task-class)
- [Dispatching Tasks](#dispatching-tasks)
    - [Basic Dispatch](#basic-dispatch)
    - [Dispatch to a Specific Queue and Connection](#dispatch-to-a-specific-queue-and-connection)
    - [Conditional Dispatch](#conditional-dispatch)
    - [Dispatch with Queue Facade](#dispatch-with-queue-facade)
- [Running Queue Workers](#running-queue-workers)
    - [Start the Worker](#start-the-worker)
    - [Process a Single Iteration](#process-a-single-iteration)
    - [Process a Specific Queue](#process-a-specific-queue)
    - [Chunk Processing](#chunk-processing)
    - [Sleep Time](#sleep-time)
- [Retries, Attempts and Timeouts](#retries-attempts-and-timeouts)
- [Queue Drivers](#queue-drivers)
    - [Parallel Driver](#parallel-driver)
    - [Database Driver](#database-driver)
    - [Redis Driver](#redis-driver)
- [Testing Queue Tasks](#testing-queue-tasks)
    - [Queue Logging](#queue-logging)
    - [Faking Queue Pushes](#faking-queue-pushes)
    - [Queue Assertions](#queue-assertions)
    - [Production Behavior](#production-behavior)
- [CLI Commands](#cli-commands)
- [Configuration Reference](#configuration-reference)
- [Queue Facade Reference](#queue-facade-reference)

## Introduction

Phenix queues allow you to process work asynchronously using **Tasks**.

A queueable task is a class that extends `Phenix\Tasks\QueuableTask` (from `src/Tasks`), and is pushed/processed through the queue system in `src/Queue`.

Supported drivers:

- `parallel`
- `database`
- `redis`

## Creating Tasks

### Generate a Queuable Task

Generate a queueable task:

```sh
php phenix make:task SendWelcomeEmail --queue
```

Force overwrite:

```sh
php phenix make:task SendWelcomeEmail --queue --force
php phenix make:task SendWelcomeEmail --queue -f
```

### Task Class

```php
<?php

declare(strict_types=1);

namespace App\Tasks;

use Amp\Cancellation;
use Amp\Sync\Channel;
use Phenix\Tasks\QueuableTask;
use Phenix\Tasks\Result;

class SendWelcomeEmail extends QueuableTask
{
    protected ?int $maxTries = 5;

    public function __construct()
    {
        $this->setTimeout(120);
    }

    protected function handle(Channel $channel, Cancellation $cancellation): Result
    {
        // ...

        return Result::success(message: 'Welcome email sent');
    }
}
```

## Dispatching Tasks

### Basic Dispatch

```php
use App\Tasks\SendWelcomeEmail;

SendWelcomeEmail::dispatch();
```

### Dispatch to a Specific Queue and Connection

Use `enqueue()` when you want to configure queue/connection before dispatching:

```php
SendWelcomeEmail::enqueue()
    ->onQueue('emails')
    ->onConnection('default')
    ->dispatch();
```

### Conditional Dispatch

```php
SendWelcomeEmail::dispatchIf(true);

$pending = SendWelcomeEmail::enqueueIf(fn (): bool => true);
$pending?->dispatch();
```

### Dispatch with Queue Facade

```php
use App\Tasks\SendWelcomeEmail;
use Phenix\Facades\Queue;

Queue::push(new SendWelcomeEmail());
Queue::pushOn('emails', new SendWelcomeEmail());
```

You can also consume manually:

```php
$task = Queue::pop('emails');
$tasks = Queue::popChunk(10, 'emails');
```

## Running Queue Workers

### Start the Worker

```sh
php phenix queue:work
```

You can pass the connection as an argument:

```sh
php phenix queue:work mysql
```

### Process a Single Iteration

```sh
php phenix queue:work --once
php phenix queue:work -o
```

### Process a Specific Queue

```sh
php phenix queue:work --queue=emails
```

### Chunk Processing

Enable chunk mode:

```sh
php phenix queue:work --chunks
```

In chunk mode, prefer one queue name per worker process.

### Sleep Time

Seconds to sleep when no tasks are available:

```sh
php phenix queue:work --sleep=1
php phenix queue:work -s 1
```

## Retries, Attempts and Timeouts

Execution flow:

- Worker executes `task->output()`.
- On success, the task is marked completed.
- On failure, the task is retried until max tries; then it is marked failed.

Max tries precedence:

- `QueuableTask::$maxTries` in your task class (if defined).
- Otherwise worker option `maxTries` (default: `3`).

Timeout is per task through `setTimeout()` / `getTimeout()` and enforced with `TimeoutCancellation`.

## Queue Drivers

### Parallel Driver

`parallel` uses in-memory queueing with async processing. I automatically starts processing after  call `push()`.

### Database Driver

`database` stores tasks in a SQL table and reserves tasks atomically via transactions.

Generate the queue table migration:

```sh
php phenix queue:table
php phenix queue:table --force
php phenix queue:table -f
```

Then run:

```sh
php phenix migrate
```

Generated migration filename:

- `database/migrations/20250101205638_create_tasks_table.php`

### Redis Driver

`redis` uses Redis data structures and Lua scripts for atomic pop/reserve/retry/fail behavior.

## CLI Commands

```sh
php phenix make:task SendWelcomeEmail --queue

php phenix queue:work
php phenix queue:work mysql --queue=default --sleep=3
php phenix queue:work --once
php phenix queue:work --chunks

php phenix queue:table
php phenix queue:table --force
php phenix queue:table -f
```

## Configuration Reference

Queue configuration is defined in `config/queue.php`:

```php
<?php

declare(strict_types=1);

return [
    'default' => env('QUEUE_DRIVER', static fn (): string => 'database'),

    'drivers' => [
        'parallel' => [
            'timeout' => env('PARALLEL_QUEUE_TIMEOUT', static fn (): int => 2),
            'chunk_processing' => env('PARALLEL_QUEUE_CHUNK_PROCESSING', static fn (): bool => true),
            'chunk_size' => env('PARALLEL_QUEUE_CHUNK_SIZE', static fn (): int => 10),
            'max_retries' => env('PARALLEL_QUEUE_MAX_RETRIES', static fn (): int => 3),
            'retry_delay' => env('PARALLEL_QUEUE_RETRY_DELAY', static fn (): int => 2),
            'interval' => env('PARALLEL_QUEUE_INTERVAL', static fn (): float => 2.0),
        ],

        'database' => [
            'connection' => env('DB_QUEUE_CONNECTION', static fn (): string => 'mysql'),
            'table' => env('DB_QUEUE_TABLE', static fn (): string => 'tasks'),
            'queue' => env('DB_QUEUE', static fn (): string => 'default'),
        ],

        'redis' => [
            'connection' => env('REDIS_QUEUE_CONNECTION', static fn (): string => 'default'),
            'queue' => env('REDIS_QUEUE', static fn (): string => 'default'),
        ],
    ],
];
```

## Queue Facade Reference

`Phenix\Facades\Queue` methods:

- Queue operations:
  - `push(QueuableTask $task)`
  - `pushOn(string $queue, QueuableTask $task)`
  - `pop(string|null $queueName = null)`
  - `popChunk(int $limit, string|null $queueName = null)`
  - `size()`
  - `clear()`
  - `getConnectionName()`
  - `setConnectionName(string $name)`
  - `driver(QueueDriver|null $driverName = null)`
- Logging and fakes:
  - `log()`
  - `fake()`
  - `fakeWhen(string $taskClass, Closure $callback)`
  - `fakeTimes(string $taskClass, int $times)`
  - `fakeOnce(string $taskClass)`
  - `fakeOnly(string $taskClass)`
  - `fakeExcept(string $taskClass)`
  - `getQueueLog()`
  - `resetQueueLog()`
  - `resetFaking()`
- Assertions helper:
  - `expect(string $taskClass): Phenix\Testing\TestQueue`

## Testing Queue Tasks

### Queue Logging

```php
use App\Tasks\SendWelcomeEmail;
use Phenix\Facades\Queue;

Queue::log();
Queue::push(new SendWelcomeEmail());

$log = Queue::getQueueLog();

Queue::resetQueueLog();
```

### Faking Queue Pushes

```php
use App\Tasks\SendWelcomeEmail;
use Phenix\Data\Collection;
use Phenix\Facades\Queue;

Queue::fake();
Queue::fakeOnly(SendWelcomeEmail::class);
Queue::fakeExcept(SendWelcomeEmail::class);
Queue::fakeOnce(SendWelcomeEmail::class);
Queue::fakeTimes(SendWelcomeEmail::class, 2);

Queue::fakeWhen(SendWelcomeEmail::class, function (Collection $log): bool {
    return $log->count() < 3;
});

Queue::resetFaking();
```

### Queue Assertions

```php
Queue::expect(SendWelcomeEmail::class)->toBePushed();
Queue::expect(SendWelcomeEmail::class)->toBePushedTimes(1);
Queue::expect(SendWelcomeEmail::class)->toNotBePushed();
Queue::expect(SendWelcomeEmail::class)->toPushNothing();
```

Predicate assertion:

```php
Queue::expect(SendWelcomeEmail::class)->toBePushed(function ($task): bool {
    return $task !== null && $task->getQueueName() === 'emails';
});
```

### Production Behavior

Queue log/fake helpers are intentionally ignored in production environment.

