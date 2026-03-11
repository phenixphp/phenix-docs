# Middlewares

## Table of Contents

- [Introduction](#introduction)
- [Execution order](#execution-order)
- [Creating middleware](#creating-middleware)
- [Registering global middlewares](#registering-global-middlewares)
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
