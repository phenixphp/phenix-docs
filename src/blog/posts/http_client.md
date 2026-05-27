---
title: "HTTP Client added"
description: "Version 0.9.2 of the framework and version 0.7.0 of the application skeleton, which include an HTTP client, have been released."
date: "2026-05-27"
author: "PhenixPHP"
tags: ["framework", "php"]
blogPost: true
published: true
---

The Phenix HTTP client is now available through the `Phenix\Facades\Http` facade. It provides a concise way to call external APIs while keeping the response helpers, JSON handling, authentication, and error handling close to the framework style.

For most integrations, the first thing you need is CRUD: read a resource, create it, replace it, partially update it, and delete it. The client exposes one method for each operation, so the code maps naturally to the remote API contract.

## Reading resources with GET

Use `get()` to retrieve a list or a single resource. Query parameters can be passed as the second argument:

```php
use Phenix\Facades\Http;

$users = Http::get('https://api.example.com/users', [
    'page' => 1,
    'role' => 'admin',
]);

$user = Http::get('https://api.example.com/users/1');
```

Every shortcut method returns a `Phenix\Http\Client\Response`, so you can read the decoded JSON immediately:

```php
$items = $users->json('data', []);
$name = $user->json('name', 'Guest');
```

## Creating resources with POST

Use `post()` when the remote API creates a new resource. Arrays are JSON-encoded automatically, and Phenix sets `Content-Type: application/json` when you do not provide one:

```php
use Phenix\Facades\Http;

$response = Http::post('https://api.example.com/users', [
    'name' => 'Ada Lovelace',
    'email' => 'ada@example.com',
]);

if ($response->created()) {
    $id = $response->json('id');
}
```

When an endpoint requires authentication, chain the request configuration before the CRUD method:

```php
$response = Http::withToken('api-token')
    ->post('https://api.example.com/users', [
        'name' => 'Grace Hopper',
        'email' => 'grace@example.com',
    ]);
```

## Replacing resources with PUT

Use `put()` when you want to send the full representation of a resource. This is useful for APIs where the update payload replaces the current remote state:

```php
use Phenix\Facades\Http;

$response = Http::put('https://api.example.com/users/1', [
    'name' => 'Grace Hopper',
    'email' => 'grace@example.com',
    'active' => true,
]);

$response->throw();
```

Calling `throw()` keeps the happy path clear and raises a request exception when the API returns a client or server error.

## Updating part of a resource with PATCH

Use `patch()` for partial updates. Send only the attributes that changed:

```php
use Phenix\Facades\Http;

$response = Http::patch('https://api.example.com/users/1', [
    'active' => false,
]);

if ($response->successful()) {
    $active = $response->json('active');
}
```

This keeps small state changes explicit, which is especially useful in dashboards, background jobs, and integrations that synchronize remote records.

## Deleting resources with DELETE

Use `delete()` to remove a resource. If the API accepts options such as `force`, pass them as the second argument:

```php
use Phenix\Facades\Http;

$response = Http::delete('https://api.example.com/users/1', [
    'force' => true,
]);

if ($response->noContent() || $response->successful()) {
    // The resource was removed.
}
```

For production integrations, combine CRUD calls with `onError()` or `throw()` so failed remote operations are handled intentionally:

```php
use Phenix\Facades\Log;
use Phenix\Facades\Http;
use Phenix\Http\Client\Response;

Http::delete('https://api.example.com/users/1')
    ->onError(function (Response $response): void {
        Log::error('Could not delete remote user', [
            'status' => $response->status(),
            'body' => $response->body(),
        ]);
    });
```

The full HTTP client guide covers headers, authentication, forms, streaming responses, concurrent requests, retries, logging, TLS, and testing. The CRUD methods are the core path for everyday API work, and they are intentionally small enough to stay readable inside controllers, services, tasks, and queue handlers.
