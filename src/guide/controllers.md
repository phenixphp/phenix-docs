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