# Helpers

## Table of Contents

- [Introduction](#introduction)
- [base_path](#base_path)
- [response](#response)
- [env](#env)
- [config](#config)
- [route](#route)
- [url](#url)
- [value](#value)
- [report](#report)
- [e](#e)
- [trans](#trans)
- [trans_choice](#trans_choice)
- [class_uses_recursive](#class_uses_recursive)
- [Notes](#notes)

## Introduction

Phenix ships global helper functions. These helpers provide shortcuts for common framework operations such as paths, config, URL generation, translation, logging, and value resolution.

## base_path

Signature:

```php
base_path(string $path = ''): string
```

Returns the absolute application base path. Any mixed slash style in the input is normalized.

```php
$root = base_path();
$configPath = base_path('config/app.php');
```

## response

Signature:

```php
response(): \Phenix\Http\Response
```

Creates a new response instance.

```php
return response()->json(['ok' => true]);
```

## env

Signature:

```php
env(string $key, Closure|null $default = null): array|string|float|int|bool|null
```

Reads values from `$_ENV`.

- Converts `'true'` to `true`
- Converts `'false'` to `false`
- Returns other values as-is
- Evaluates the default closure only when needed

```php
$debug = env('APP_DEBUG', static fn (): bool => false);
$name = env('APP_NAME', static fn (): string => 'Phenix');
```

## config

Signature:

```php
config(string $key, mixed $default = null): mixed
```

Shortcut for `Config::get(...)`.

```php
$locale = config('app.locale', 'en');
```

## route

Signature:

```php
route(BackedEnum|string $name, array $parameters = [], bool $absolute = true): string
```

Generates a URL from a named route.

```php
$url = route('users.show', ['user' => 10]);
```

## url

Signature:

```php
url(string $path, array $parameters = [], bool $secure = false): string
```

Generates a URL from a path.

```php
$relative = url('/dashboard');
$secure = url('/dashboard', [], true);
```

## value

Signature:

```php
value(mixed $value, ...$args): mixed
```

Returns the value directly, or executes it if it is a closure.

```php
$plain = value(10); // 10
$computed = value(fn (int $x): int => $x * 2, 5); // 10
```

## report

Signature:

```php
report(Throwable $e): void
```

Logs exception information using `Log::error(...)`, including message, file, line, and trace.

```php
try {
    // ...
} catch (Throwable $e) {
    report($e);
}
```

## e

Signature:

```php
e(Stringable|string|null $value, bool $doubleEncode = true): string
```

Escapes a value for HTML output with UTF-8 and safe entity flags.

```php
echo e('<script>alert(1)</script>');
```

## trans

Signature:

```php
trans(string $key, array $replace = []): array|string
```

Retrieves a translation line using dot keys.

```php
echo trans('users.greeting');
echo trans('users.welcome', ['name' => 'John']);
```

For full translation system details, see [Translation](/guide/translation).

## trans_choice

Signature:

```php
trans_choice(string $key, int $number, array $replace = []): string
```

Retrieves a pluralized translation line based on the given count.

```php
echo trans_choice('users.items', 1);
echo trans_choice('users.items', 5);
```

For advanced pluralization and locale control, see [Translation](/guide/translation).

## class_uses_recursive

Signature:

```php
class_uses_recursive(object|string $class): array
```

Returns all traits used by a class, including traits used by parent classes and nested traits.

```php
$traits = class_uses_recursive(App\Models\User::class);
```

## Notes

- Helpers are conditionally declared (`function_exists`) to avoid redeclaration conflicts.
- `env()` checks the resolved value with a truthy check before returning it. Empty strings and `'0'` may fall back to the default.
