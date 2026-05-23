# HTTP Client

## Table of Contents

- [Introduction](#introduction)
- [Making Requests](#making-requests)
  - [Query Parameters](#query-parameters)
  - [Request Bodies](#request-bodies)
  - [Form Requests and File Uploads](#form-requests-and-file-uploads)
- [Headers and Authentication](#headers-and-authentication)
- [Responses](#responses)
  - [Status Helpers](#status-helpers)
  - [Error Handling](#error-handling)
- [Streaming Responses](#streaming-responses)
- [Concurrent Requests](#concurrent-requests)
- [Retries, Logging, and TLS](#retries-logging-and-tls)
- [Testing](#testing)
  - [Request Log](#request-log)

## Introduction

Phenix provides an HTTP client through the `Phenix\Facades\Http` facade. It is a small wrapper around `Amp\Http\Client` that keeps request code concise while preserving access to Amp features when you need streaming, event listeners, custom clients, or TLS configuration.

The facade resolves `Phenix\Http\Client\HttpClient` from the application container:

```php
use Phenix\Facades\Http;

$response = Http::get('https://api.example.com/users');
```

You may also type-hint `Phenix\Http\Client\HttpClient` directly when a class needs an injectable client.

## Making Requests

The client supports the common HTTP methods:

```php
use Phenix\Facades\Http;

$users = Http::get('https://api.example.com/users');
$status = Http::head('https://api.example.com/status');

$created = Http::post('https://api.example.com/users', [
    'name' => 'Ada Lovelace',
]);

$updated = Http::put('https://api.example.com/users/1', [
    'name' => 'Grace Hopper',
]);

$patched = Http::patch('https://api.example.com/users/1', [
    'active' => true,
]);

$deleted = Http::delete('https://api.example.com/users/1', [
    'force' => true,
]);
```

All shortcut methods return `Phenix\Http\Client\Response`, except streamed requests documented later.

### Query Parameters

`get()` and `head()` accept query parameters as the second argument:

```php
use Phenix\Facades\Http;

$response = Http::get('https://api.example.com/users', [
    'page' => 1,
    'role' => 'admin',
]);
```

The request is sent to `https://api.example.com/users?page=1&role=admin`.

### Request Bodies

Write methods accept `array`, `Phenix\Contracts\Arrayable`, `string`, or `Amp\Http\Client\Form` bodies:

```php
use Phenix\Facades\Http;

Http::post('https://api.example.com/users', [
    'name' => 'Ada',
    'email' => 'ada@example.com',
]);

Http::patch('https://api.example.com/users/1', '{"active":true}');
```

Arrays and `Arrayable` objects are JSON-encoded before being sent. Phenix automatically sets `Content-Type: application/json` when the request does not already have a content type:

```php
use Phenix\Facades\Http;

$response = Http::post('https://api.example.com/users', [
    'name' => 'Ada',
]);
```

If you set `Content-Type` explicitly, Phenix preserves your value:

```php
use Phenix\Facades\Http;

$response = Http::withHeaders([
    'Content-Type' => 'application/vnd.api+json',
])->post('https://api.example.com/users', [
    'name' => 'Ada',
]);
```

### Form Requests and File Uploads

Use `Amp\Http\Client\Form` for URL-encoded forms and multipart uploads. When the form only contains fields, Amp sends it as `application/x-www-form-urlencoded`:

```php
use Amp\Http\Client\Form;
use Phenix\Facades\Http;

$form = new Form();
$form->addField('title', 'Post title');
$form->addField('content', 'Post content');

$response = Http::post('https://api.example.com/posts', $form);
```

Attach files with `addFile()`. Adding a file makes Amp send the form as `multipart/form-data`:

```php
use Amp\Http\Client\Form;
use Phenix\Facades\Http;

$form = new Form();
$form->addField('description', 'Upload file');
$form->addFile('file', __DIR__ . '/report.pdf');

$response = Http::post('https://api.example.com/files', $form);
```

## Headers and Authentication

Add headers with `withHeaders()`. Calls are fluent, and later headers are merged into the existing request headers:

```php
use Phenix\Facades\Http;

$response = Http::withHeaders([
    'Accept' => 'application/json',
    'X-Trace-Id' => 'trace-1',
])->get('https://api.example.com/users');
```

Authentication helpers configure the `Authorization` header:

```php
use Phenix\Facades\Http;

Http::withBasicAuth('phenix', 'secret')
    ->get('https://api.example.com/basic');

Http::withToken('token-value')
    ->get('https://api.example.com/me');

Http::withToken('token-value', 'Token')
    ->get('https://api.example.com/me');
```

## Responses

`Phenix\Http\Client\Response` buffers the response body when it is created and exposes helpers for reading data:

```php
use Phenix\Facades\Http;

$response = Http::get('https://api.example.com/users/1');

$raw = $response->body();
$data = $response->json();
$name = $response->json('user.name', 'Guest');
$object = $response->object();
$tags = $response->collect('tags');
$status = $response->status();
$contentType = $response->header('content-type');
$headers = $response->headers();
```

`json()` accepts an optional key using dot notation, a default value, and JSON decode flags:

```php
$name = $response->json('user.name', 'Unknown');
```

Use `getClientResponse()` when you need the underlying `Amp\Http\Client\Response`.

### Status Helpers

Use the generic state helpers for status classes:

```php
$response->successful();
$response->redirect();
$response->failed();
$response->clientError();
$response->serverError();
```

The response also includes helpers for common status codes:

- `ok()`
- `created()`
- `accepted()`
- `noContent()`
- `movedPermanently()`
- `found()`
- `badRequest()`
- `unauthorized()`
- `paymentRequired()`
- `forbidden()`
- `notFound()`
- `requestTimeout()`
- `conflict()`
- `unprocessableEntity()`
- `tooManyRequests()`

### Error Handling

Use `onError()` to run a callback only for client or server errors:

```php
use Phenix\Facades\Log;
use Phenix\Http\Client\Response;

$response->onError(function (Response $response): void {
    Log::error('Remote request failed', [
        'status' => $response->status(),
        'body' => $response->body(),
    ]);
});
```

Use `throw()` to raise `Phenix\Http\Client\Exceptions\RequestException` for failed responses:

```php
use Phenix\Http\Client\Exceptions\RequestException;

try {
    Http::get('https://api.example.com/users/1')->throw();
} catch (RequestException $exception) {
    $response = $exception->response();
}
```

`throwIf()` accepts a boolean or closure:

```php
$response->throwIf(
    fn (Response $response): bool => $response->serverError()
);
```

## Streaming Responses

Use `stream()` when you need to read a response body incrementally instead of buffering it into a normal `Response`.

Without a callback, `stream()` returns `Phenix\Http\Client\StreamResponse`:

```php
use Phenix\Facades\Http;

$stream = Http::stream('https://api.example.com/download');

while (($chunk = $stream->read()) !== null) {
    // Process the chunk.
}
```

With a callback, `stream()` returns the callback result:

```php
use Phenix\Http\Client\StreamResponse;

$bytes = Http::stream(
    'https://api.example.com/download',
    function (StreamResponse $response): int {
        return $response->save(base_path('storage/downloads/report.pdf'));
    }
);
```

Iterate chunks with `each()`:

```php
use Phenix\Http\Client\StreamResponse;

Http::stream('https://api.example.com/export', function (StreamResponse $response): void {
    $response->each(function (string $chunk, int $totalBytesRead): void {
        // Process the chunk and cumulative byte count.
    });
});
```

You can also configure query parameters, body size limits, transfer timeouts, method, and body data:

```php
use Phenix\Facades\Http;
use Phenix\Http\Constants\HttpMethod;

$response = Http::stream(
    'https://api.example.com/export',
    queryParameters: ['token' => 'abc'],
    bodySizeLimit: 128 * 1024 * 1024,
    transferTimeout: 120,
    method: HttpMethod::POST,
    data: ['format' => 'csv'],
);
```

`StreamResponse` exposes `status()`, `successful()`, `redirect()`, `failed()`, `clientError()`, `serverError()`, `header()`, `headers()`, and `ok()`.

## Concurrent Requests

Use `pool()` to execute multiple requests concurrently:

```php
use Phenix\Facades\Http;
use Phenix\Http\Client\Pool;

$responses = Http::pool(fn (Pool $pool): array => [
    'users' => $pool->get('https://api.example.com/users'),
    'posts' => $pool->get('https://api.example.com/posts'),
]);

$users = $responses['users']->json();
$posts = $responses['posts']->json();
```

The returned array preserves the keys from the request array and each item is a `Phenix\Http\Client\Response`.

Limit concurrency with the second argument:

```php
$responses = Http::pool(fn (Pool $pool): array => [
    $pool->get('https://api.example.com/1'),
    $pool->get('https://api.example.com/2'),
    $pool->get('https://api.example.com/3'),
    $pool->get('https://api.example.com/4'),
], concurrency: 2);
```

The pool supports `get`, `head`, `post`, `put`, `patch`, and `delete`.

## Retries, Logging, and TLS

Use `retry()` for connection/request failures raised by Amp as `Amp\Http\Client\HttpException`. This is not a status-code retry helper:

```php
use Amp\Http\Client\HttpException;
use Amp\Http\Client\Request;
use Phenix\Facades\Http;

$response = Http::retry(
    times: 3,
    sleepMilliseconds: 100,
    when: function (HttpException $exception, Request $request, int $attempt): bool {
        return true;
    }
)->get('https://api.example.com/users');
```

The delay may also be a closure:

```php
Http::retry(
    3,
    fn (int $attempt): int => $attempt * 100
)->get('https://api.example.com/users');
```

Write an HTTP Archive log with `log()`:

```php
use Phenix\Facades\Http;

Http::log(base_path('storage/logs/http.har'))
    ->get('https://api.example.com/users');
```

Register custom Amp event listeners with `listen()`. The listener class must implement `Amp\Http\Client\EventListener`:

```php
use App\Support\HttpClientTelemetryListener;
use Phenix\Facades\Http;

Http::listen(new HttpClientTelemetryListener())
    ->get('https://api.example.com/users');
```

Configure TLS with an Amp `ClientTlsContext`:

```php
use Amp\Socket\ClientTlsContext;
use Phenix\Facades\Http;

$tls = (new ClientTlsContext('api.example.com'))
    ->withCaFile('/path/to/ca.pem');

Http::withTlsContext($tls)
    ->get('https://api.example.com/users');
```

For certificate-based TLS, use `withCertificate()`:

```php
use Phenix\Facades\Http;

Http::withCertificate(
    certificate: '/path/to/client-cert.pem',
    key: '/path/to/client-key.pem',
    ca: '/path/to/ca.pem',
    passphrase: 'secret',
    peerName: 'api.example.com',
)->get('https://api.example.com/users');
```

Advanced integrations may replace the underlying Amp client with `withClient()`.

## Testing

Use `Http::fake()` to intercept all HTTP client requests in non-production environments:

```php
use Amp\Http\Client\Request;
use Phenix\Facades\Http;

Http::fake(fn (Request $request): array => [
    'uri' => (string) $request->getUri(),
]);

$response = Http::get('https://api.example.com/users');

$response->json('uri'); // https://api.example.com/users
```

Fake arrays are returned as JSON responses with a `Content-Type: application/json` header. Fake strings are returned as plain response bodies:

```php
Http::fake(fn (): string => 'ok');

Http::get('https://api.example.com/status')->body(); // ok
```

Use `fakeWhen()` when only some requests should be intercepted. Conditional fakes are checked before the global fake response:

```php
use Amp\Http\Client\Request;
use Phenix\Facades\Http;

Http::fake(fn (): string => 'fallback');

Http::fakeWhen(
    fn (Request $request): bool => str_contains((string) $request->getUri(), '/users'),
    fn (): array => ['resource' => 'users'],
);

Http::get('https://api.example.com/users')->json('resource'); // users
Http::get('https://api.example.com/posts')->body(); // fallback
```

Fakes also apply to streamed requests:

```php
use Amp\Http\Client\Request;
use Phenix\Facades\Http;
use Phenix\Http\Client\StreamResponse;

Http::fake(fn (Request $request): string => 'fake stream: ' . $request->getMethod());

$response = Http::stream('https://api.example.com/download');

if ($response instanceof StreamResponse) {
    $response->read(); // fake stream: GET
}
```

`fake()` and `fakeWhen()` callbacks may return strings, arrays, `Amp\Http\Client\Response`, `Phenix\Http\Client\Response`, or `Phenix\Http\Client\StreamResponse`.

### Request Log

While faking, Phenix records matching requests in a shared HTTP client test logger:

```php
use Phenix\Facades\Http;

Http::fake(fn (): array => ['ok' => true]);

Http::get('https://api.example.com/users');

$requests = Http::getRequestLog();
$uri = (string) $requests->first()->getUri();
```

Use `resetRequestLog()` to clear only the recorded requests:

```php
Http::resetRequestLog();
```

Use `resetFaking()` to clear global fakes, conditional fakes, and the request log:

```php
Http::resetFaking();
```

For Mockery-style expectations, use `Http::expect()`:

```php
use Amp\Http\Client\Request;
use Amp\Http\Client\Response as AmpResponse;
use Phenix\Facades\Http;
use Phenix\Http\Client\Response;

$response = new Response(new AmpResponse(
    '1.1',
    200,
    null,
    [],
    'mocked',
    new Request('https://api.example.com/users'),
));

Http::expect('get')
    ->once()
    ->with('https://api.example.com/users')
    ->andReturn($response);

Http::get('https://api.example.com/users')->body(); // mocked
```
