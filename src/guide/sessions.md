# Sessions

## Table of Contents

- [Introduction](#introduction)
- [Configuration](#configuration)
    - [Session Driver](#session-driver)
    - [Cookie Options](#cookie-options)
    - [Environment Variables](#environment-variables)
- [Using Session in Controllers](#using-session-in-controllers)
- [Session API in `Phenix\Http\Session`](#session-api-in-phenixhttpsession)
    - [Quick methods](#quick-methods)
    - [Advanced lock/transaction methods](#advanced-locktransaction-methods)
- [Using Session in Middlewares](#using-session-in-middlewares)
- [How Session Integration Works in Phenix](#how-session-integration-works-in-phenix)
- [Notes and Current Behaviors](#notes-and-current-behaviors)

## Introduction

Phenix session support is built on top of [`amphp/http-server-session`](https://amphp.org/http-server-session).

Supported session drivers are:

- `local`
- `redis`

Sessions in this guide are HTTP sessions for per-client state. They are not an authentication system by themselves.

## Configuration

Session configuration lives in `config/session.php`.

```php
return [
    'driver' => env('SESSION_DRIVER', static fn (): string => 'local'),
    'lifetime' => env('SESSION_LIFETIME', static fn (): int => 120),
    'connection' => env('SESSION_CONNECTION', static fn () => 'default'),
    'cookie_name' => env('SESSION_COOKIE_NAME', ...),
    'path' => '/',
    'domain' => env('SESSION_DOMAIN'),
    'secure' => env('SESSION_SECURE_COOKIE'),
    'http_only' => true,
    'same_site' => 'Lax',
];
```

### Session Driver

- `local`: in-memory storage (`LocalSessionStorage`)
- `redis`: Redis-backed storage (`RedisSessionStorage`)

When `driver=redis`, Phenix uses `session.connection` and resolves it against `config/database.php` under `database.redis.connections`.

### Cookie Options

Cookie attributes are built from session config and host:

- `domain`: `session.domain` (or current app host if null)
- `expiry`: current time + `session.lifetime` minutes
- `same_site`: `Lax`, `Strict`, or `None`
- `path`: `session.path`
- `http_only`: enabled when `session.http_only=true`
- `secure`: enabled when `session.secure=true`
- cookie name: `session.cookie_name`

### Environment Variables

- `SESSION_DRIVER` (`local` or `redis`)
- `SESSION_LIFETIME` (minutes)
- `SESSION_CONNECTION` (Redis connection name)
- `SESSION_COOKIE_NAME`
- `SESSION_DOMAIN`
- `SESSION_SECURE_COOKIE`

For Redis connection details, configure `REDIS_*` variables in `config/database.php`.

## Using Session in Controllers

Controller actions receive `Phenix\Http\Request`, which exposes:

- `$request->session()` to get the `Phenix\Http\Session` object
- `$request->session('key', $default)` to read a value directly

Example:

```php
<?php

declare(strict_types=1);

namespace App\Http\Controllers;

use Phenix\Http\Controller;
use Phenix\Http\Request;
use Phenix\Http\Response;

class ProfileController extends Controller
{
    public function updateLocale(Request $request): Response
    {
        $session = $request->session();

        $session->put('locale', 'es');

        return response()->json([
            'locale' => $request->session('locale', 'en'),
        ]);
    }
}
```

## Session API in `Phenix\Http\Session`

`Phenix\Http\Session` wraps Amp's session object and exposes convenient methods.

### Quick methods

- `get(string $name, mixed $default = null): mixed`
- `set(string $name, mixed $value): void`
- `put(string $name, mixed $value): void` (locks + sets + commits)
- `has(string $name): bool`
- `delete(string $name): void`
- `clear(): void`
- `refresh(): void` (regenerates session ID)
- `getId(): ?string`
- `getData(): array`
- `isRead(): bool`
- `isLocked(): bool`
- `isEmpty(): bool`

### Advanced lock/transaction methods

- `lock(): void`
- `commit(): void`
- `rollback(): void`
- `unlock(): void`
- `unlockAll(): void`

Use these when you need explicit control over write/rollback flow.

## Using Session in Middlewares

When you are inside an Amp middleware (`Amp\Http\Server\Middleware`), use the session exactly as documented by `amphp/http-server-session`: read it from request attributes.

```php
<?php

declare(strict_types=1);

namespace App\Http\Middleware;

use Amp\Http\Server\Middleware;
use Amp\Http\Server\Request;
use Amp\Http\Server\RequestHandler;
use Amp\Http\Server\Response;
use Amp\Http\Server\Session\Session;

class TrackVisits implements Middleware
{
    public function handleRequest(Request $request, RequestHandler $next): Response
    {
        /** @var Session $session */
        $session = $request->getAttribute(Session::class);

        $session->lock();
        $session->set('visits', ((int) $session->get('visits')) + 1);
        $session->commit();

        return $next->handleRequest($request);
    }
}
```

In other words:

- In controllers, use `Phenix\Http\Request::session()`.
- In Amp middlewares, use `Amp\Http\Server\Request::getAttribute(Session::class)`.

## How Session Integration Works in Phenix

At runtime, Phenix wires sessions in this flow:

1. `Phenix\App` appends a session middleware globally (`SessionMiddlewareFactory::make(...)`).
2. `Phenix\Session\SessionMiddlewareFactory` creates an Amp `SessionMiddleware` using:
   - `LocalSessionStorage` for `session.driver=local`
   - `RedisSessionStorage` for `session.driver=redis`
3. The middleware injects `Amp\Http\Server\Session\Session` into request attributes.
4. `Phenix\Http\Request` detects that attribute and wraps it into `Phenix\Http\Session`.
5. In controllers, you access it via `$request->session()`.

Because this middleware is appended by the framework, you do not need to manually register it in `config/app.php`.

## Notes and Current Behaviors

- Session middleware is automatically appended to the global middleware stack by the framework.
- `request->session()` depends on that middleware; in normal app flow it is available.
- Session cookie is sent/read by Amp session middleware.
- Session state management is independent from Phenix authentication modules.
