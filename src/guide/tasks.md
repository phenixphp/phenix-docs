# Tasks

## Table of Contents

- [Introduction](#introduction)
- [Task vs QueuableTask](#task-vs-queuabletask)
- [Generating Tasks](#generating-tasks)
    - [Generate a Standard Task](#generate-a-standard-task)
    - [Generate a Queuable Task](#generate-a-queuable-task)
- [Writing Tasks](#writing-tasks)
    - [Task Class Example](#task-class-example)
    - [Returning Results](#returning-results)
- [Executing Tasks Immediately](#executing-tasks-immediately)
    - [Run a Single Task](#run-a-single-task)
    - [Set Timeout](#set-timeout)
    - [Run Multiple Tasks in Parallel](#run-multiple-tasks-in-parallel)
- [Using QueuableTask](#using-queuabletask)
- [Error and Cancellation Behavior](#error-and-cancellation-behavior)
- [Result API](#result-api)
- [CLI Reference](#cli-reference)
- [Task API Reference](#task-api-reference)

## Introduction

Phenix tasks are designed to run in a separate worker process (parallel execution).

A **standard task** (`Task`) is usually executed directly from your code and returns its `Result` immediately.

A **queuable task** (`QueuableTask`) is pushed to the queue system and processed later by queue workers. When you dispatch it to queue, you do not receive immediate output in the caller.

## Task vs QueuableTask

- `Phenix\Tasks\Task`
  - Use when you want to execute work now and get output now.
  - Typical call: `$result = $task->output();`
- `Phenix\Tasks\QueuableTask`
  - Extends `Task` and adds queue metadata + dispatch helpers.
  - Typical call: `MyTask::dispatch();`
  - Output is not returned to the caller at dispatch time.

For full queue runtime details, see [Queues guide](/guide/queues).

## Generating Tasks

### Generate a Standard Task

```sh
php phenix make:task ResizeImageTask
```

With force:

```sh
php phenix make:task ResizeImageTask --force
php phenix make:task ResizeImageTask -f
```

Nested namespace path:

```sh
php phenix make:task Media/ResizeImageTask
```

### Generate a Queuable Task

```sh
php phenix make:task SendWelcomeEmailTask --queue
```

This generates a class extending `QueuableTask` instead of `Task`.

## Writing Tasks

### Task Class Example

```php
<?php

declare(strict_types=1);

namespace App\Tasks;

use Amp\Cancellation;
use Amp\Sync\Channel;
use Phenix\Tasks\Result;
use Phenix\Tasks\Task;

class ResizeImageTask extends Task
{
    protected function handle(Channel $channel, Cancellation $cancellation): Result
    {
        // Task logic...

        return Result::success(
            output: 'Image resized successfully',
            message: 'Resize operation completed'
        );
    }
}
```

### Returning Results

Task handlers should return a `Phenix\Tasks\Result` object:

```php
return Result::success(output: $data, message: 'Done');

return Result::failure(message: 'Something went wrong');
```

## Executing Tasks Immediately

### Run a Single Task

```php
use App\Tasks\ResizeImageTask;

$task = new ResizeImageTask();
$result = $task->output();

if ($result->isSuccess()) {
    $output = $result->output();
}
```

### Set Timeout

`Task` has a default timeout of `60` seconds.

```php
$task = new ResizeImageTask();
$task->setTimeout(10);

$result = $task->output();
```

### Run Multiple Tasks in Parallel

Use `Phenix\Tasks\WorkerPool::awaitAll()`:

```php
use App\Tasks\ResizeImageTask;
use Phenix\Tasks\WorkerPool;

$results = WorkerPool::awaitAll([
    new ResizeImageTask(),
    new ResizeImageTask(),
]);

foreach ($results as $result) {
    if ($result->isFailure()) {
        // Handle failure
    }
}
```

## Using QueuableTask

For dispatching and processing queuable tasks, see the [Queues guide](/guide/queues).

Queuable tasks are processed asynchronously by queue workers and do not return immediate output at dispatch time.

## Error and Cancellation Behavior

- If cancellation happens (for example timeout), task execution returns `Result::failure(...)`.
- If any exception is thrown during task execution, it is reported and converted to `Result::failure(...)`.

## Result API

`Phenix\Tasks\Result` provides:

- `output(): mixed`
- `message(): ?string`
- `isSuccess(): bool`
- `isFailure(): bool`
- `Result::success(mixed $output = null, ?string $message = null)`
- `Result::failure(mixed $output = null, ?string $message = null)`

## CLI Reference

```sh
php phenix make:task ResizeImageTask
php phenix make:task ResizeImageTask --queue
php phenix make:task ResizeImageTask --force
php phenix make:task ResizeImageTask -f
php phenix make:task Media/ResizeImageTask
```

## Task API Reference

### `Task`

- `output(): Result`
- `setTimeout(int $timeout): void`
- `getTimeout(): int`
- `Task::setBootingSettings(): void`

### `QueuableTask`

Queue metadata:

- `setConnectionName(string $connectionName): void`
- `getConnectionName(): ?string`
- `setQueueName(string $queueName): void`
- `getQueueName(): ?string`
- `getTaskId(): ?string`
- `setTaskId(string $taskId): void`
- `getAttempts(): int`
- `setAttempts(int $attempts): void`
- `getMaxTries(): ?int`
- `getPayload(): string`

Dispatch helpers:

- `enqueue(mixed ...$args): PendingTask`
- `enqueueIf(Closure|bool $condition, mixed ...$args): ?PendingTask`
- `dispatch(mixed ...$args): void`
- `dispatchIf(Closure|bool $condition, mixed ...$args): void`
