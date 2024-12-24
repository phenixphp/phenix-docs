# Routing

## Table of Contents

- [Available methods](#available-methods)
- [Request object](#request-object)
- [Route parameters](#route-parameters)
    - [Multiple route parameters](#multiple-route-parameters)
    - [Patterns in route parameters](#patterns-in-route-parameters)
- [Named routes](#named-routes)
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
use Phenix\Http\Attributes;

Route::get('/users/{user}', function (Request $request) {
    $attributes = Attributes::fromRequest($request);

    $userId = $attributes->integer('user');

    // code
});
```

Multiple route parameters:

```php
Route::get('/invoices/{invoice}/payments/{payment}', function (Request $request) {
    $attributes = Attributes::fromRequest($request);

    $invoiceId = $attributes->integer('invoice');
    $paymentId = $attributes->integer('payment');

    // code
});
```

You can add patterns to route parameters:

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

> **Note**: The URL generation helper will be available soon.

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

Middleware allows you to alter the flow of a request, perform validations, and return responses, all using the chain of responsibility design pattern. You can assign one or many middlewares to your routes.

```php
Route::get('/users/{user}', function (Request $request) {
    // ..
})->middleware([
    SanitizeRequest::class,
    CheckUserIsAdmin::class,
]);
```

