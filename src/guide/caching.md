# Caching

## Table of Contents

- [Introduction](#introduction)
- [Configuration](#configuration)
- [Cache API](#cache-api)
- [Working with Stores](#working-with-stores)
    - [Default Store](#default-store)
    - [Selecting a Store Explicitly](#selecting-a-store-explicitly)
    - [Local Store](#local-store)
    - [File Store](#file-store)
    - [Redis Store](#redis-store)
- [Cache Command](#cache-command)
- [Rate Limiting](#rate-limiting)
    - [Global Middleware Behavior](#global-middleware-behavior)
    - [Custom Route Limiters](#custom-route-limiters)
    - [Rate Limit Response and Headers](#rate-limit-response-and-headers)
- [Notes and Current Behaviors](#notes-and-current-behaviors)

## Introduction

Phenix provides a cache system through `Phenix\Cache\CacheManager` and the `Cache` facade, with support for:

- local in-memory store
- file store
- redis store

The cache module also includes rate limiting through `Phenix\Cache\RateLimit`, used by the built-in `RateLimiter` middleware.

## Configuration

Cache configuration lives in `config/cache.php`.

```php
return [
    'default' => env('CACHE_STORE', static fn (): string => 'local'),
    'stores' => [
        'local' => [
            'size_limit' => 1024,
            'gc_interval' => 5,
        ],
        'file' => [
            'path' => base_path('storage/framework/cache'),
        ],
        'redis' => [
            'connection' => env('CACHE_REDIS_CONNECTION', static fn (): string => 'default'),
        ],
    ],
    'prefix' => env('CACHE_PREFIX', static fn (): string => 'phenix_cache_'),
    'ttl' => env('CACHE_TTL', static fn (): int => 60),
    'rate_limit' => [
        'enabled' => env('RATE_LIMIT_ENABLED', static fn (): bool => true),
        'store' => env('RATE_LIMIT_STORE', static fn (): string => 'local'),
        'per_minute' => env('RATE_LIMIT_PER_MINUTE', static fn (): int => 60),
        'connection' => env('RATE_LIMIT_REDIS_CONNECTION', static fn (): string => 'default'),
    ],
];
```

Key environment variables:

- `CACHE_STORE`
- `CACHE_REDIS_CONNECTION`
- `CACHE_PREFIX`
- `CACHE_TTL`
- `RATE_LIMIT_ENABLED`
- `RATE_LIMIT_STORE`
- `RATE_LIMIT_PER_MINUTE`
- `RATE_LIMIT_REDIS_CONNECTION`

## Cache API

The main API is exposed by `Phenix\Facades\Cache`:

- `Cache::store(Store|null $storeName = null)`
- `Cache::get(string $key, Closure|null $callback = null)`
- `Cache::set(string $key, mixed $value, Date|null $ttl = null)`
- `Cache::forever(string $key, mixed $value)`
- `Cache::remember(string $key, Date $ttl, Closure $callback)`
- `Cache::rememberForever(string $key, Closure $callback)`
- `Cache::has(string $key)`
- `Cache::delete(string $key)`
- `Cache::clear()`

Basic usage:

```php
use Phenix\Facades\Cache;
use Phenix\Util\Date;

Cache::set('users.count', 10);

$count = Cache::get('users.count');

$value = Cache::get('stats.total', fn (): int => 42);

Cache::set('session.token', 'abc123', Date::now()->addMinutes(15));

$remembered = Cache::remember(
    'report.latest',
    Date::now()->addMinutes(5),
    fn (): array => ['ok' => true]
);
```

## Working with Stores

### Default Store

By default, `Cache::get`, `Cache::set`, and the other shortcut methods use the store configured in `cache.default`.

### Selecting a Store Explicitly

Use `Phenix\Cache\Constants\Store` to choose a specific store:

```php
use Phenix\Cache\Constants\Store;
use Phenix\Facades\Cache;

Cache::store(Store::LOCAL)->set('a', 1);
Cache::store(Store::FILE)->set('b', 2);
Cache::store(Store::REDIS)->set('c', 3);
```

### Local Store

The local store uses in-memory caching. It supports TTL, forever values, and callback-based misses.

```php
Cache::set('temp', 'value');
Cache::get('temp');
Cache::clear();
```

### File Store

The file store saves cache payloads in the configured directory (default `storage/framework/cache`) using `.cache` files.

It serializes values and stores expiration metadata. If a cache file is corrupted, retrieval falls back gracefully to `null` or the callback value.

```php
use Phenix\Cache\Constants\Store;
use Phenix\Facades\Cache;
use Phenix\Util\Date;

Cache::store(Store::FILE)->remember('settings', Date::now()->addMinutes(10), fn (): array => []);
```

### Redis Store

The redis store prefixes keys with `cache.prefix` and uses Redis TTL operations for expiring values.

`clear()` scans by prefix and deletes matching keys.

```php
use Phenix\Cache\Constants\Store;
use Phenix\Facades\Cache;

Cache::store(Store::REDIS)->set('feature.flag', 'on');
```

## Cache Command

To clear cached data in the default cache store:

```sh
php phenix cache:clear
```

Expected command output:

```txt
Cached data cleared successfully!
```

## Rate Limiting

Rate limiting is provided by `Phenix\Cache\RateLimit\Middlewares\RateLimiter`.

### Global Middleware Behavior

By default, the middleware is included in the global middleware stack in `config/app.php`.

Global limiter behavior is controlled with:

- `cache.rate_limit.enabled`
- `cache.rate_limit.per_minute`
- `cache.rate_limit.store` (`local` or `redis`)
- `cache.rate_limit.connection` (redis connection name)

If `cache.rate_limit.enabled` is `false`, global limits are skipped.

### Custom Route Limiters

You can apply per-route limits with:

```php
use Phenix\Cache\RateLimit\Middlewares\RateLimiter;
use Phenix\Facades\Route;

Route::get('/limited', fn () => response()->plain('Ok'))
    ->middleware(RateLimiter::perMinute(2));
```

Signature:

```php
RateLimiter::perMinute(int $maxAttempts, string $prefix = 'custom')
```

Custom route limits work independently, even when global rate limiting is disabled.

### Rate Limit Response and Headers

When the limit is exceeded, Phenix returns:

- status `429 Too Many Requests`
- header `retry-after`
- JSON body:

```json
{
  "error": "Too Many Requests",
  "message": "Rate limit exceeded. Please try again later.",
  "retry_after": 57
}
```

On successful requests, the middleware adds:

- `x-ratelimit-limit`
- `x-ratelimit-remaining`
- `x-ratelimit-reset`
- `x-ratelimit-reset-after`

## Notes and Current Behaviors

- The rate limiter uses a fixed 60-second window from the current implementation (`RateLimitConfig::ttl()` returns `60`).
- Limiter counters are keyed by a prefix plus a hashed client IP.
- Global rate limiting can be disabled via `cache.rate_limit.enabled`, but route-level `RateLimiter::perMinute(...)` still applies.
