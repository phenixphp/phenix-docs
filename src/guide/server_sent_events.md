# Server-sent events

## Table of Contents

- [Creating an event stream](#creating-an-event-stream)
- [Event fields](#event-fields)
- [Multiline data](#multiline-data)
- [Using iterables and raw frames](#using-iterables-and-raw-frames)
- [Status and headers](#status-and-headers)
- [Resuming a stream](#resuming-a-stream)
- [Testing event streams](#testing-event-streams)

Server-sent events (SSE) let an HTTP endpoint push a stream of text events to a browser over a single connection. They are useful for notifications, progress updates, live feeds, and other one-way updates from the server.

## Creating an event stream

Use `response()->eventStream()` and yield `Phenix\Http\ServerSentEvent` instances from a closure:

```php
use Phenix\Facades\Route;
use Phenix\Http\Response;
use Phenix\Http\ServerSentEvent;

Route::get('/events', function (): Response {
    return response()->eventStream(function (): iterable {
        for ($index = 0; $index < 3; $index++) {
            yield new ServerSentEvent(
                data: "Event {$index}",
                event: 'notification',
                id: "event-{$index}"
            );
        }
    });
});
```

The response uses `text/event-stream; charset=utf-8` as its content type and disables caching with `Cache-Control: no-cache`. Events are read from the iterable as the response body is consumed instead of being assembled into one string first.

The method signature is:

```php
eventStream(
    Closure|iterable $events,
    HttpStatus $status = HttpStatus::OK,
    array $headers = []
): Response
```

The closure must return an iterable. Phenix throws an `InvalidArgumentException` if it returns any other value.

In a browser, connect to the endpoint with the standard `EventSource` API:

```js
const stream = new EventSource('/events')

stream.addEventListener('notification', (event) => {
  console.log(event.lastEventId, event.data)
})
```

## Event fields

The `ServerSentEvent` constructor accepts the fields defined by the SSE wire format:

```php
new ServerSentEvent(
    data: 'Order completed',
    event: 'order.updated',
    id: 'order-42',
    retry: 3000,
    comment: 'order status stream'
);
```

| Argument | Type | Description |
| --- | --- | --- |
| `data` | `string` | Event payload. This is the only required argument. |
| `event` | `string|null` | Event name used by `EventSource.addEventListener()`. |
| `id` | `string|null` | Identifier used by the client when reconnecting. |
| `retry` | `int|null` | Suggested reconnection delay in milliseconds. |
| `comment` | `string|null` | SSE comment, commonly used for metadata or keep-alive frames. |

The example is serialized as:

```text
: order status stream
event: order.updated
id: order-42
retry: 3000
data: Order completed

```

## Multiline data

Phenix normalizes line endings and emits each line of `data` or `comment` as a separate SSE field:

```php
yield new ServerSentEvent(
    data: "First line\nSecond line",
    event: 'notification'
);
```

This produces:

```text
event: notification
data: First line
data: Second line

```

## Using iterables and raw frames

`eventStream()` also accepts an iterable directly:

```php
return response()->eventStream([
    new ServerSentEvent(data: 'First event'),
    new ServerSentEvent(data: 'Second event'),
]);
```

You can yield preformatted SSE frames when you need direct control over the wire format:

```php
return response()->eventStream([
    "event: notification\ndata: First event",
    "event: notification\ndata: Second event\n\n",
]);
```

Raw frames that do not already end with a blank line receive the required `\n\n` terminator automatically.

## Status and headers

Pass a status and additional headers after the event source:

```php
use Phenix\Http\Constants\HttpStatus;

return response()->eventStream(
    events: $events,
    status: HttpStatus::OK,
    headers: ['X-Stream-Name' => 'notifications']
);
```

Values in the custom headers array can override the default event-stream headers when required.

## Resuming a stream

Browsers reconnect automatically when an `EventSource` connection closes. If events include an `id`, the browser sends the most recently received value in the `Last-Event-ID` request header. Use it to decide where the new stream should begin:

```php
use Phenix\Facades\Route;
use Phenix\Http\Request;
use Phenix\Http\Response;
use Phenix\Http\ServerSentEvent;

Route::get('/events', function (Request $request): Response {
    $lastEventId = $request->getHeader('Last-Event-ID');
    $start = $lastEventId === null
        ? 0
        : ((int) str_replace('event-', '', $lastEventId)) + 1;

    return response()->eventStream(function () use ($start): iterable {
        for ($index = $start; $index < 4; $index++) {
            yield new ServerSentEvent(
                data: "Event {$index}",
                event: 'notification',
                id: "event-{$index}"
            );
        }
    });
});
```

The application is responsible for retaining or recreating any events needed after a reconnect.

## Testing event streams

Use `assertIsEventStream()` to verify the response content type, then assert individual frames in the buffered body:

```php
Route::get('/events', function (): Response {
    return response()->eventStream([
        new ServerSentEvent(
            data: 'Event 0',
            event: 'notification',
            id: 'event-0'
        ),
    ]);
});

$this->app->run();

$this->get('/events')
    ->assertOk()
    ->assertIsEventStream()
    ->assertBodyContains([
        "event: notification\n",
        "id: event-0\n",
        "data: Event 0\n\n",
    ]);
```

`TestResponse` buffers the complete response body. Use a finite iterable in feature tests so the request can finish.
