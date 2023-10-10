# Controllers

Routes can receive an anonymous function or callback as a request handler, but you can group handlers into classes, which constitute controllers. The controllers are stored in the `app\Http\Controllers` folder.

## Writing controllers

To create a controller, you can use the following command:

```
php phenix make:controller UserController
```

This command will create a controller with no methods.

```php
<?php

declare(strict_types=1);

namespace App\Http\Controllers;

use Amp\Http\Server\Request;
use Amp\Http\Server\Response;
use Amp\Http\Status;
use Phenix\Http\Controller;

class UserController extends Controller
{
    // ..
}
```

### API Controllers

Phenix allows you to generate controllers with predefined API methods with the `--api` option, short form `-a`:

```
php phenix make:controller UserController -a
```

```php
<?php

declare(strict_types=1);

namespace App\Http\Controllers;

use Amp\Http\Server\Request;
use Amp\Http\Server\Response;
use Amp\Http\HttpStatus;
use Phenix\Http\Controller;

class UserController extends Controller
{
    public function index(): Response
    {
        return response()->plain('Hello, world!' . PHP_EOL);
    }

    public function store(Request $request): Response
    {
        return response()->json([], HttpStatus::CREATED);
    }

    public function show(Request $request): Response
    {
        return response()->json([], HttpStatus::OK);
    }

    public function update(Request $request): Response
    {
        return response()->json([], HttpStatus::OK);
    }

    public function delete(Request $request): Response
    {
        return response()->json([], HttpStatus::OK);
    }
}
```

## Routes

Now we can define routes, it is important to maintain good consistency between the defined methods and the routes:

```php
<?php

declare(strict_types=1);

use Phenix\Facades\Route;
use App\Http\Controllers\UserController;

Route::get('/users', [UserController::class, 'index']);

Route::post('/users', [UserController::class, 'store']);

Route::get('/users/{user}', [UserController::class, 'show']);

Route::patch('/users/{user}', [UserController::class, 'update']);

Route::delete('/users/{user}', [UserController::class, 'delete']);
```

## Responses

The default design of Phenix includes JSON type responses and in plain text, binary responses will be added very soon, the `Phenix\Http\Response` class is the component responsible for facilitating server responses and is a wrapper of the `Amp\Http\Server\Response` class. The global helper `response` is a function that allows you to create instances of the `Phenix\Http\Response` class in an elegant way.

### Plain responses

The `plain` method returns a response with a `Content-type` header equal to `text/plain`, this method accepts two arguments, the first a string and a second argument that corresponds to the HTTP status code.

```php
return response()->plain('Hello, world!' . PHP_EOL);
```

Response with custom HTTP status code:

```php
use Amp\Http\HttpStatus;

return response()->plain('Hello, world!' . PHP_EOL, HttpStatus::OK);
```

### JSON responses

The `json` method returns a response with a `Content-type` header equal to `application/json`, this method accepts two arguments, the first an array or an object that implements the `Phenix\Contracts\Arrayable` contract, and like `plain`, a second argument that corresponds to the HTTP status code.

```php
return response()->json(['message' => 'Hello, world!']);
```

Response with object that implements the `Phenix\Contracts\Arrayable` contract:

```php
use Phenix\Data\Collection;

$users = new Collection('array');
$users->add(['name' => 'John Doe']);

return response()->json($users);
```
