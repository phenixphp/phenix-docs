# Routing

## Table of Contents

- [Available methods](#available-methods)
- [Request object](#request-object)
- [Route parameters](#route-parameters)
    - [Multiple route parameters](#multiple-route-parameters)
    - [Patterns in route parameters](#patterns-in-route-parameters)
- [Named routes](#named-routes)
- [Signed routes](#signed-routes)
    - [Generating signed URLs](#generating-signed-urls)
    - [Temporary signed URLs](#temporary-signed-urls)
    - [Protecting routes with ValidateSignature](#protecting-routes-with-validatesignature)
    - [Ignoring query parameters during validation](#ignoring-query-parameters-during-validation)
- [Route list command](#route-list-command)
- [Route groups](#route-groups)
- [Route middlewares](#route-middlewares)

Phenix routes are based on the [amphp/http-server-router](https://amphp.org/http-server-router) package, providing a simple and elegant syntax through a facade:

```php
use Phenix\Facades\Route;

Route::get('/greetings', function () {
    return response()->plain('Hello, world!');
});
```

You can define your routes in the `routes/api.php` file. The routes are loaded through the `RouteServiceProvider` service provider. In the configuration file `config/app.php`, you can see the provider being referenced.

## Available methods

The currently supported HTTP verbs are:

```php
Route::get($uri, $callback);
Route::post($uri, $callback);
Route::put($uri, $callback);
Route::patch($uri, $callback);
Route::delete($uri, $callback);
```

## Request object

The server router automatically injects the request into the callback that is invoked by each route:

```php
use Phenix\Facades\Route;
use Amp\Http\Server\Request;

Route::get('/users', function (Request $request) {
    // ..
});
```

## Route parameters

You can pass parameters in routes, such as IDs of records in the database. The parameters are not injected into the callback but are contained in the `Request` object. The [amphp/http-server-router](https://amphp.org/http-server-router) package is based on the [nikic/FastRoute](https://github.com/nikic/FastRoute) package:

```php
Route::get('/users/{user}', function (Request $request) {
    $userId = $request->route()->integer('user');

    // code
});
```

### Multiple route parameters

```php
Route::get('/invoices/{invoice}/payments/{payment}', function (Request $request) {
    $invoiceId = $request->route()->integer('invoice');
    $paymentId = $request->route()->integer('payment');

    // code
});
```

### Patterns in route parameters

```php
Route::get('/users/{user:[0-9]+}', function (Request $request) {
    // ..
});

Route::get('/users/{user:\d+}', function (Request $request) {
    // ..
});
```

## Named routes

Route names will allow Phenix to generate URLs easily. You can assign each route a name:

```php
Route::get('/users', function (Request $request) {
    // ..
})->name('users.index');

Route::get('/users/{user}', function (Request $request) {
    // ..
})->name('users.show');
```

URL generation is available through:

- `route(...)` helper for named routes
- `url(...)` helper for path-based URLs
- `Phenix\Facades\Url` facade for advanced URL features (including signed URLs)

## Signed routes

Signed routes let you generate tamper-resistant URLs using an HMAC signature based on application key encryption.

Phenix supports:

- permanent signed URLs
- temporary signed URLs with expiration
- request signature validation

### Generating signed URLs

Use `Url::signedRoute(...)` to generate a signed URL:

```php
use Phenix\Facades\Url;

$url = Url::signedRoute('unsubscribe', ['user' => 42]);
```

Signature:

```php
Url::signedRoute(
    BackedEnum|string $name,
    array $parameters = [],
    DateTimeInterface|DateInterval|int|null $expiration = null,
    bool $absolute = true
): string
```

### Temporary signed URLs

Use `Url::temporarySignedRoute(...)` for expiring links.

```php
use DateInterval;
use DateTimeImmutable;
use Phenix\Facades\Url;

// Expires in 5 minutes
$url1 = Url::temporarySignedRoute('downloads.show', 300, ['file' => 'report.pdf']);

// Expires in 1 hour
$url2 = Url::temporarySignedRoute('downloads.show', new DateInterval('PT1H'), ['file' => 'report.pdf']);

// Expires at an exact timestamp
$url3 = Url::temporarySignedRoute('downloads.show', new DateTimeImmutable('+30 minutes'), ['file' => 'report.pdf']);
```

Signature:

```php
Url::temporarySignedRoute(
    BackedEnum|string $name,
    DateTimeInterface|DateInterval|int $expiration,
    array $parameters = [],
    bool $absolute = true
): string
```

### Protecting routes with ValidateSignature

Use `ValidateSignature` middleware to require a valid signature:

```php
use Phenix\Facades\Route;
use Phenix\Routing\Middlewares\ValidateSignature;

Route::get('/signed/{user}', fn () => response()->plain('Ok'))
    ->name('signed.show')
    ->middleware(ValidateSignature::class);
```

If the signature is invalid or missing, the middleware returns `403` with:

- `Invalid signature.`

If the signature exists but is expired, it returns `403` with:

- `Signature has expired.`

You can also validate manually via the URL facade:

```php
use Amp\Http\Server\Request;
use Phenix\Facades\Url;

function isValid(Request $request): bool
{
    return Url::hasValidSignature($request);
}
```

Additional API:

```php
Url::signatureHasNotExpired(Request $request): bool
```

### Ignoring query parameters during validation

When validating signatures, you can ignore extra tracking query params:

```php
use Amp\Http\Server\Request;
use Phenix\Facades\Url;

$isValid = Url::hasValidSignature($request, ignoreQuery: ['tracking', 'utm_source']);
```

You can also provide a closure:

```php
$ignore = fn (): array => ['fbclid', 'utm_source'];

$isValid = Url::hasValidSignature($request, ignoreQuery: $ignore);
```

Ignored parameters are excluded when reconstructing the URL used for signature comparison.

## Route list command

Phenix includes a built-in console command to inspect all registered routes:

```sh
php phenix route:list
```

By default, the command renders a table with the columns:

- `Method`
- `Path`
- `Name`
- `Middleware`
- `Params`

### Filtering routes

You can filter the route list using command options:

```sh
php phenix route:list --name=users
php phenix route:list --method=GET
php phenix route:list --path=/admin
```

- `--name`: filters by route name (partial match).
- `--method`: filters by HTTP method.
- `--path`: filters by path (partial match).

You can combine filters:

```sh
php phenix route:list --method=GET --name=users --path=/admin
```

### JSON output

Use `--json` to export routes in JSON format:

```sh
php phenix route:list --json
```

This is useful for tooling, scripting, or custom route inspection workflows.

## Route groups

Route groups allow sharing middlewares, assigning route prefixes, and route name prefixes. You can create nested route groups and share their properties in the hierarchy in which the routes are defined.

```php
use Phenix\Http\Middlewares\AcceptJsonResponses;

Route::middleware(AcceptJsonResponses::class)
    ->name('admin')
    ->prefix('admin')
    ->group(function (Route $route) {
        $route->get('users', fn () => response()->plain('User index'))
            ->name('users.index');

        $route->get('users/{user}', fn () => response()->plain('User details'))
            ->name('users.show');

        $route->name('accounting')
            ->prefix('accounting')
            ->group(function (Route $route) {
                $route->get('invoices', fn () => response()->plain('Invoice index'))
                    ->name('invoices.index');

                $route->prefix('payments')
                    ->name('payments')
                    ->group(function (Route $route) {
                        $route->get('pending', fn () => response()->plain('Payments index'))
                            ->name('pending.index');
                    });
            });
    });
```

## Route middlewares

Route middlewares are the most specific middleware layer. Use them when behavior should run only for selected endpoints.

Scope model:

- **Global** (`app.middlewares.global`): runs before the router handles the request and applies to any incoming request.
- **Router** (`app.middlewares.router`): applies to all routes.
- **Route/Group** (`->middleware(...)`, `Route::middleware(...)->group(...)`): applies only to selected routes.

For middleware execution order and registration details in `config/app.php`, see the [Middlewares guide](middlewares.md).

```php
Route::get('/users/{user}', function (Request $request) {
    // ..
})->middleware([
    SanitizeRequest::class,
    CheckUserIsAdmin::class,
]);

Route::middleware(Authenticated::class)
    ->group(function (Route $route) {
        $route->get('/profile', fn () => response()->plain('Profile'));
    });
```
