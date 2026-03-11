# Events

## Table of Contents

- [Introduction](#introduction)
- [Event Service Provider](#event-service-provider)
    - [Automatic Event File Loading](#automatic-event-file-loading)
- [Creating Events and Listeners](#creating-events-and-listeners)
    - [Generate an Event Class](#generate-an-event-class)
    - [Generate a Listener Class](#generate-a-listener-class)
    - [Manual Event Class](#manual-event-class)
    - [Manual Listener Class](#manual-listener-class)
- [Registering Listeners](#registering-listeners)
    - [Closure Listener](#closure-listener)
    - [Listener Class String](#listener-class-string)
    - [Listener Instance](#listener-instance)
    - [One-Time Listener](#one-time-listener)
- [Dispatching Events](#dispatching-events)
    - [Dispatch by Event Name](#dispatch-by-event-name)
    - [Dispatch Event Objects](#dispatch-event-objects)
    - [Listener Return Values](#listener-return-values)
- [Async Events](#async-events)
- [Listener Lifecycle](#listener-lifecycle)
- [Listener Priority and Limits](#listener-priority-and-limits)
- [Stopping Propagation](#stopping-propagation)
- [Error Handling and Warnings](#error-handling-and-warnings)
- [Event Logging](#event-logging)
- [Event Faking](#event-faking)
    - [Fake All Events](#fake-all-events)
    - [Fake One Event](#fake-one-event)
    - [Fake N Times](#fake-n-times)
    - [Conditional Faking](#conditional-faking)
    - [Fake All Except](#fake-all-except)
    - [Reset Faking State](#reset-faking-state)
    - [Production Behavior](#production-behavior)
- [Testing Event Dispatch](#testing-event-dispatch)
- [Event CLI Commands](#event-cli-commands)
- [Facade API Reference](#facade-api-reference)

## Introduction

Phenix provides an event emitter that supports synchronous and asynchronous dispatch, listener priorities, one-time listeners, propagation control, and testing utilities (logging/faking/assertions).

The main facade is `Phenix\Facades\Event`.

## Event Service Provider

The event system is registered by `Phenix\Events\EventServiceProvider`.

At boot time, it:

- Registers `Phenix\Events\EventEmitter` in the container.
- Binds `Phenix\Events\Contracts\EventEmitter` to `EventEmitter`.
- Registers CLI commands:
  - `make:event`
  - `make:listener`
- Loads listeners from `listen/events.php` when that file exists.

### Automatic Event File Loading

Use `listen/events.php` to register your listeners in one place:

```php
<?php

declare(strict_types=1);

use Phenix\Events\Contracts\Event as EventContract;
use Phenix\Facades\Event;

Event::on('user.registered', function (EventContract $event): void {
    // Handle event
});
```

## Creating Events and Listeners

### Generate an Event Class

```sh
php phenix make:event UserRegistered
```

With force option:

```sh
php phenix make:event UserRegistered --force
php phenix make:event UserRegistered -f
```

Nested namespace path:

```sh
php phenix make:event Admin/UserRegistered
```

Generated path: `app/Events/...`.

### Generate a Listener Class

```sh
php phenix make:listener SendWelcomeEmail
```

With force option:

```sh
php phenix make:listener SendWelcomeEmail --force
php phenix make:listener SendWelcomeEmail -f
```

Nested namespace path:

```sh
php phenix make:listener Admin/SendWelcomeEmail
```

Generated path: `app/Listeners/...`.

### Manual Event Class

You can create event classes by extending `AbstractEvent`:

```php
<?php

declare(strict_types=1);

namespace App\Events;

use Phenix\Events\AbstractEvent;

class UserRegistered extends AbstractEvent
{
    public function __construct(public readonly int $userId)
    {
        // optional payload for generic handlers
        $this->payload = ['user_id' => $userId];
    }
}
```

`AbstractEvent` already provides:

- `getName(): string` (defaults to `static::class`)
- `getPayload(): mixed`
- `stopPropagation(): void`
- `isPropagationStopped(): bool`

### Manual Listener Class

You can create listener classes by extending `AbstractListener`:

```php
<?php

declare(strict_types=1);

namespace App\Listeners;

use Phenix\Events\AbstractListener;
use Phenix\Events\Contracts\Event;

class SendWelcomeEmail extends AbstractListener
{
    public function handle(Event $event): mixed
    {
        // ...
        return null;
    }
}
```

## Registering Listeners

### Closure Listener

```php
use Phenix\Events\Contracts\Event as EventContract;
use Phenix\Facades\Event;

Event::on('user.registered', function (EventContract $event): void {
    $payload = $event->getPayload();
});
```

### Listener Class String

```php
use App\Listeners\SendWelcomeEmail;
use Phenix\Facades\Event;

Event::on('user.registered', SendWelcomeEmail::class);
```

When a class string is used, Phenix instantiates it and executes `handle($event)`.

### Listener Instance

```php
use App\Listeners\SendWelcomeEmail;
use Phenix\Facades\Event;

$listener = (new SendWelcomeEmail())->setPriority(10);

Event::on('user.registered', $listener);
```

### One-Time Listener

```php
use Phenix\Facades\Event;

Event::once('user.registered', function (): void {
    // Runs only once
});
```

## Dispatching Events

### Dispatch by Event Name

```php
use Phenix\Facades\Event;

Event::emit('user.registered', [
    'id' => 1,
    'email' => 'john@example.com',
]);
```

### Dispatch Event Objects

```php
use App\Events\UserRegistered;
use Phenix\Facades\Event;

Event::emit(new UserRegistered(userId: 1));
```

### Listener Return Values

`emit()` returns an array with every listener result in execution order.

```php
$results = Event::emit('invoice.closed');
```

## Async Events

Use `emitAsync()` for asynchronous dispatch. It returns an `Amp\Future`.

```php
use Phenix\Facades\Event;

$future = Event::emitAsync('user.registered', ['id' => 1]);

$results = $future->await();
```

## Listener Lifecycle

Remove a specific listener:

```php
$listener = fn () => null;

Event::on('user.registered', $listener);
Event::off('user.registered', $listener);
```

Remove all listeners of one event:

```php
Event::off('user.registered');
```

Remove every registered listener from every event:

```php
Event::removeAllListeners();
```

## Listener Priority and Limits

Higher priority listeners run first:

```php
Event::on('priority.test', fn () => 'low', 1);
Event::on('priority.test', fn () => 'high', 10);
Event::on('priority.test', fn () => 'medium', 5);
```

Priority is normalized to range `0..100` for `AbstractListener` instances.

Maximum listeners per event (default `10`):

```php
Event::setMaxListeners(20);
$max = Event::getMaxListeners();
```

When warnings are enabled and the max is exceeded, a warning is logged.

```php
Event::setEmitWarnings(true);
```

Useful introspection helpers:

- `Event::hasListeners(string $event): bool`
- `Event::getListeners(string $event): array`
- `Event::getListenerCount(string $event): int`
- `Event::getEventNames(): array`

## Stopping Propagation

A listener can stop subsequent listeners for the same dispatch:

```php
use Phenix\Events\Contracts\Event as EventContract;

Event::on('order.created', function (EventContract $event): void {
    $event->stopPropagation();
});

Event::on('order.created', function (): void {
    // Not executed
});
```

## Error Handling and Warnings

If a listener throws an exception:

- Errors are logged.
- With `Event::setEmitWarnings(true)`, synchronous `emit()` throws `Phenix\Events\Exceptions\EventException`.
- With `Event::setEmitWarnings(false)`, the emitter logs the error and continues.

For `emitAsync()`, listener failures are logged and the async result slot becomes `null` when failures are consumed during await.

## Event Logging

Enable logging of dispatched events (for tests and diagnostics):

```php
use Phenix\Facades\Event;

Event::log();

Event::emit('user.registered');

$log = Event::getEventLog();
```

Log entries include:

- `name`
- `event`
- `timestamp`

Reset only the log:

```php
Event::resetEventLog();
```

## Event Faking

Faking records dispatches in the log but prevents listener execution according to the fake strategy.

### Fake All Events

```php
Event::fake();
```

### Fake One Event

Fake one event indefinitely:

```php
Event::fakeOnly('user.registered');
```

Fake only the next dispatch of an event:

```php
Event::fakeOnce('user.registered');
```

### Fake N Times

```php
Event::fakeTimes('user.registered', 2);
```

### Conditional Faking

```php
use Phenix\Data\Collection;

Event::fakeWhen('user.registered', function (Collection $log): bool {
    return $log->count() < 3;
});
```

### Fake All Except

Fake every event except one:

```php
Event::fakeExcept('user.registered');
```

### Reset Faking State

Reset log + fake configuration:

```php
Event::resetFaking();
```

### Production Behavior

In production environment, faking/logging methods are intentionally ignored.

## Event CLI Commands

Create event class:

```sh
php phenix make:event UserRegistered
php phenix make:event Admin/UserRegistered
php phenix make:event UserRegistered --force
php phenix make:event UserRegistered -f
```

Create listener class:

```sh
php phenix make:listener SendWelcomeEmail
php phenix make:listener Admin/SendWelcomeEmail
php phenix make:listener SendWelcomeEmail --force
php phenix make:listener SendWelcomeEmail -f
```

## Facade API Reference

`Phenix\Facades\Event` exposes:

- Registration and dispatch:
  - `on(string $event, Closure|EventListener|string $listener, int $priority = 0)`
  - `once(string $event, Closure|EventListener|string $listener, int $priority = 0)`
  - `off(string $event, Closure|EventListener|string|null $listener = null)`
  - `emit(string|EventContract $event, mixed $payload = null): array`
  - `emitAsync(string|EventContract $event, mixed $payload = null): Future`
- Listener inspection and controls:
  - `getListeners(string $event): array`
  - `hasListeners(string $event): bool`
  - `removeAllListeners(): void`
  - `setMaxListeners(int $maxListeners): void`
  - `getMaxListeners(): int`
  - `setEmitWarnings(bool $emitWarnings): void`
  - `getListenerCount(string $event): int`
  - `getEventNames(): array`
- Logging and fakes:
  - `log(): void`
  - `fake(): void`
  - `fakeWhen(string $event, Closure $callback): void`
  - `fakeTimes(string $event, int $times): void`
  - `fakeOnce(string $event): void`
  - `fakeOnly(string $event): void`
  - `fakeExcept(string $event): void`
  - `getEventLog(): Collection`
  - `resetEventLog(): void`
  - `resetFaking(): void`
- Assertions helper:
  - `expect(string $event): Phenix\Testing\TestEvent`

## Testing Event Dispatch

Use `Event::expect('event.name')` assertions:

```php
use Phenix\Facades\Event;

Event::log();
Event::emit('user.registered', ['id' => 1]);

Event::expect('user.registered')->toBeDispatched();
Event::expect('user.registered')->toBeDispatchedTimes(1);
Event::expect('other.event')->toNotBeDispatched();
```

Predicate assertions:

```php
Event::expect('user.registered')->toBeDispatched(function ($event): bool {
    return $event !== null && ($event->getPayload()['id'] ?? null) === 1;
});
```

Assert that nothing was dispatched:

```php
Event::expect('any.event')->toDispatchNothing();
```

