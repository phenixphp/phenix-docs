# Middlewares

## Table of Contents

- [Introduction](#introduction)
- [Execution order](#execution-order)
- [Creating middleware](#creating-middleware)
- [Registering global middlewares](#registering-global-middlewares)
    - [CORS](#cors-handlecors)
- [Registering router middlewares](#registering-router-middlewares)
- [Applying middlewares to routes and groups](#applying-middlewares-to-routes-and-groups)
- [Choosing the right scope](#choosing-the-right-scope)

## Introduction

Middleware lets you intercept the request/response flow to validate input, authorize access, add headers, or stop the request early.

In Phenix, middleware can be attached at three scopes:

- **Global**: applies to any incoming request to the server.
- **Router**: applies to all registered routes.
- **Route/Group**: applies only to selected routes.

## Execution order

For a matched route, middleware is executed in this order:

1. **Global middleware stack** (`app.middlewares.global`)
2. **Router middleware stack** (`app.middlewares.router`)
3. **Route/group middleware stack** (`->middleware(...)`, `Route::middleware(...)->group(...)`)
4. **Route handler** (closure/controller action)

Global middleware is wrapped around the router, so it runs before the router takes action.

> **Note**
> The framework also appends a session middleware to the global stack.

## Creating middleware

Generate middleware with:

```sh
php phenix make:middleware EnsureJson
```

By default, Phenix creates the file in `app/Http/Middleware`.

Generated contract:

```php
<?php

declare(strict_types=1);

namespace App\Http\Middleware;

use Amp\Http\Server\Middleware;
use Amp\Http\Server\Request;
use Amp\Http\Server\RequestHandler;
use Amp\Http\Server\Response;

class EnsureJson implements Middleware
{
    public function handleRequest(Request $request, RequestHandler $next): Response
    {
        return $next->handleRequest($request);
    }
}
```

## Registering global middlewares

Global middlewares are configured in `config/app.php` under `app.middlewares.global`.

```php
'middlewares' => [
    'global' => [
        \Phenix\Http\Middlewares\HandleCors::class,
        \Phenix\Cache\RateLimit\Middlewares\RateLimiter::class,
    ],
    'router' => [
        \Phenix\Http\Middlewares\ResponseHeaders::class,
    ],
],
```

Use global middleware for concerns that must run before routing and for every request received by the server.

For `RateLimiter` configuration and behavior, see [Rate Limiting](caching.md#rate-limiting) in the Caching guide.

### CORS (`HandleCors`)

`HandleCors` is a global middleware by default, so CORS is evaluated before route handling.

Default global registration:

```php
'middlewares' => [
    'global' => [
        \Phenix\Http\Middlewares\HandleCors::class,
        // ...
    ],
],
```

CORS behavior is configured in `config/cors.php`:

```php
return [
    'origins' => ['*'],
    'allowed_methods' => ['GET', 'POST', 'PUT', 'PATCH', 'OPTIONS', 'DELETE'],
    'max_age' => 8600,
    'allowed_headers' => ['X-Request-Headers', 'Content-Type', 'Authorization', 'X-Requested-With'],
    'exposable_headers' => [],
    'allow_credentials' => false,
];
```

`origins` can also be provided through the `CORS_ORIGIN` environment variable.

Field reference:

- `origins`: allowed origins.
- `allowed_methods`: allowed HTTP methods.
- `allowed_headers`: allowed request headers.
- `exposable_headers`: response headers exposed to browsers.
- `max_age`: preflight cache time (seconds).
- `allow_credentials`: whether credentials are allowed.

Example for a local frontend:

```php
return [
    'origins' => ['http://localhost:5173'],
    'allowed_methods' => ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    'allowed_headers' => ['Content-Type', 'Authorization'],
    'exposable_headers' => [],
    'max_age' => 3600,
    'allow_credentials' => true,
];
```

When credentials are enabled, avoid using wildcard origins (`*`).

> **Note**
> Preflight `OPTIONS` requests are handled by the CORS middleware before your route logic runs.

## Registering router middlewares

Router middlewares are configured in `config/app.php` under `app.middlewares.router`.

```php
'middlewares' => [
    'global' => [
        // ...
    ],
    'router' => [
        \Phenix\Http\Middlewares\ResponseHeaders::class,
    ],
],
```

Use router middleware when the concern should apply to all routes, without attaching middleware per route.

## Applying middlewares to routes and groups

Attach middleware to a specific route:

```php
Route::get('/users/{user}', function () {
    return response()->plain('User details');
})->middleware([
    SanitizeRequest::class,
    CheckUserIsAdmin::class,
]);
```

You can also pass a middleware instance:

```php
Route::get('/limited', fn () => response()->plain('Ok'))
    ->middleware(RateLimiter::perMinute(2));
```

Attach middleware to a route group:

```php
use Phenix\Routing\Route;

Route::middleware(Authenticated::class)
    ->prefix('admin')
    ->group(function (Route $route) {
        $route->get('/dashboard', fn () => response()->plain('Dashboard'));
        $route->get('/users', fn () => response()->plain('Users'));
    });
```

For route grouping and route middleware examples in context, see the [Routing guide](routing.md#route-middlewares).

## Choosing the right scope

| Scope | Applies to | Typical use cases |
| --- | --- | --- |
| Global (`app.middlewares.global`) | Any incoming request | CORS, very early request shaping, server-wide policies |
| Router (`app.middlewares.router`) | All routes | Shared response headers, route-wide conventions |
| Route/Group (`->middleware(...)`) | Selected endpoints only | Auth, role checks, endpoint-specific throttling |
