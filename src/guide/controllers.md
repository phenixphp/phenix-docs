# Controllers

## Table of Contents

- [Writing controllers](#writing-controllers)
    - [API Controllers](#api-controllers)
- [Request in controller actions](#request-in-controller-actions)
- [Form Requests in controllers](#form-requests-in-controllers)
    - [Creating a Form Request](#creating-a-form-request)
    - [Using Form Request in a controller](#using-form-request-in-a-controller)
    - [Streamed FormRequest](#streamed-formrequest)
- [Routes](#routes)
- [Responses](#responses)
    - [Plain responses](#plain-responses)
    - [JSON responses](#json-responses)
    - [Server-Sent Events](#server-sent-events)

Routes can receive an anonymous function or callback as a request handler, but you can group handlers into classes, which constitute controllers. The controllers are stored in the `app\Http\Controllers` folder.

Controller actions receive `Phenix\Http\Request`, which is a wrapper around `Amp\Http\Server\Request`.

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

use Phenix\Http\Constants\HttpStatus;
use Phenix\Http\Controller;
use Phenix\Http\Request;
use Phenix\Http\Response;

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

use Phenix\Http\Constants\HttpStatus;
use Phenix\Http\Controller;
use Phenix\Http\Request;
use Phenix\Http\Response;

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

## Request in controller actions

The request wrapper provides helpers for route attributes, query parameters, and body parsing:

```php
<?php

declare(strict_types=1);

namespace App\Http\Controllers;

use Phenix\Http\Controller;
use Phenix\Http\Request;
use Phenix\Http\Response;

class UserController extends Controller
{
    public function show(Request $request): Response
    {
        $userId = $request->route()->integer('user');
        $include = $request->query('include', '');
        $name = $request->body('name');

        return response()->json([
            'id' => $userId,
            'include' => $include,
            'name' => $name,
        ]);
    }
}
```

Route parameters are available through `$request->route(...)`.

## Form Requests in controllers

Form Requests extend `Phenix\Http\FormRequest` and let you keep validation rules in a dedicated class.

### Creating a Form Request

Use the `make:request` command:

```sh
php phenix make:request StoreUserRequest
```

Generated class:

```php
<?php

declare(strict_types=1);

namespace App\Http\Requests;

use Phenix\Http\FormRequest;

class StoreUserRequest extends FormRequest
{
    protected function rules(): array
    {
        return [];
    }
}
```

For a complete validation workflow, see the [Validation guide](validation.md#form-request-validation).

Example with a validation rule:

```php
<?php

declare(strict_types=1);

namespace App\Http\Requests;

use Phenix\Http\FormRequest;
use Phenix\Validation\Types\Str;

class StoreUserRequest extends FormRequest
{
    protected function rules(): array
    {
        return [
            'name' => Str::required()->max(10),
        ];
    }
}
```

### Using Form Request in a controller

```php
<?php

declare(strict_types=1);

namespace App\Http\Controllers;

use App\Http\Requests\StoreUserRequest;
use Phenix\Http\Constants\HttpStatus;
use Phenix\Http\Controller;
use Phenix\Http\Response;

class UserController extends Controller
{
    public function store(StoreUserRequest $request): Response
    {
        $data = $request->validated();

        return response()->json($data, HttpStatus::CREATED);
    }
}
```

When the first parameter of the action is a class that extends `FormRequest`, Phenix resolves and validates it automatically before running the action:

- If validation fails, the framework responds with JSON and `422 Unprocessable Entity`.
- If validation passes, the action executes and you can access `$request->validated()`.

`FormRequest` also exposes:

- `rules(): array`
- `isValid(): bool`
- `errors(): array`
- `validated(): array`

### Streamed FormRequest

For large multipart payloads or file uploads, you can use streamed parsing mode:

```php
<?php

declare(strict_types=1);

namespace App\Http\Requests;

use Phenix\Http\Constants\RequestMode;
use Phenix\Http\FormRequest;

class UploadUserAvatarRequest extends FormRequest
{
    protected function rules(): array
    {
        return [
            // ...
        ];
    }

    protected function mode(): RequestMode
    {
        return RequestMode::STREAMED;
    }
}
```

## Routes

Now we can define routes. It is important to maintain good consistency between the defined methods and the routes:

```php
<?php

declare(strict_types=1);

use App\Http\Controllers\UserController;
use Phenix\Facades\Route;

Route::get('/users', [UserController::class, 'index'])
    ->name('users.index');

Route::post('/users', [UserController::class, 'store'])
    ->name('users.store');

Route::get('/users/{user}', [UserController::class, 'show'])
    ->name('users.show');

Route::patch('/users/{user}', [UserController::class, 'update'])
    ->name('users.update');

Route::delete('/users/{user}', [UserController::class, 'delete'])
    ->name('users.delete');
```

For advanced route features such as groups, middleware, and signatures, see the [Routing guide](routing.md).

## Responses

The default design of Phenix includes JSON type responses and plain text responses. Binary responses will be added very soon. The `Phenix\Http\Response` class is the component responsible for facilitating server responses and is a wrapper of the `Amp\Http\Server\Response` class. The global helper `response` is a function that allows you to create instances of the `Phenix\Http\Response` class in an elegant way.

### Plain responses

The `plain` method returns a response with a `Content-type` header equal to `text/plain`. This method accepts two arguments, the first a string and a second argument that corresponds to the HTTP status code.

```php
return response()->plain('Hello, world!' . PHP_EOL);
```

Response with custom HTTP status code:

```php
use Phenix\Http\Constants\HttpStatus;

return response()->plain('Hello, world!' . PHP_EOL, HttpStatus::OK);
```

### JSON responses

The `json` method returns a response with a `Content-type` header equal to `application/json`. This method accepts two arguments, the first an array or an object that implements the `Phenix\Contracts\Arrayable` contract, and like `plain`, a second argument that corresponds to the HTTP status code.

```php
return response()->json(['message' => 'Hello, world!']);
```

Response with an object that implements the `Phenix\Contracts\Arrayable` contract:

```php
use Phenix\Data\Collection;

$users = new Collection('array');
$users->add(['name' => 'John Doe']);

return response()->json($users);
```

### Server-Sent Events

Server-Sent Events (SSE) let a controller keep an HTTP response open and send a sequence of events to the browser. Browsers consume this response with the native `EventSource` API.

Use `eventStream` when the server needs to push one-way updates to the client, such as notifications, job progress, logs, or streaming LLM tokens. The method accepts a closure or an iterable of events.

```php
<?php

declare(strict_types=1);

namespace App\Http\Controllers;

use Phenix\Http\Controller;
use Phenix\Http\Response;
use Phenix\Http\ServerSentEvent;

class NotificationController extends Controller
{
    public function stream(): Response
    {
        return response()->eventStream(function (): iterable {
            for ($index = 0; $index < 3; $index++) {
                yield new ServerSentEvent(
                    data: "Notification {$index}",
                    event: 'notification',
                    id: "notification-{$index}",
                );
            }
        });
    }
}
```

The response uses `text/event-stream; charset=utf-8` and each event is serialized as an SSE frame:

```text
event: notification
id: notification-0
data: Notification 0

```

In the browser, create an `EventSource` for the route and listen for the event name emitted by the server:

```html
<ol id="notifications"></ol>

<script>
  const notifications = document.getElementById('notifications');
  const stream = new EventSource('/notifications/stream');

  stream.addEventListener('notification', (event) => {
    const item = document.createElement('li');
    item.textContent = event.data;
    notifications.appendChild(item);
  });

  stream.onerror = () => {
    console.log('The browser will retry the SSE connection automatically.');
  };
</script>
```

#### Proxying an upstream stream

A controller can also bridge an upstream streaming HTTP response to a browser SSE response. For example, Phenix can call LLM server with `Http::stream()`, read chunks from that upstream response, and publish each chunk as an SSE event.

```php
<?php

declare(strict_types=1);

namespace App\Http\Controllers;

use Phenix\Facades\Http;
use Phenix\Http\Constants\HttpMethod;
use Phenix\Http\Controller;
use Phenix\Http\Response;
use Phenix\Http\ServerSentEvent;

class ChatController extends Controller
{
    public function stream(): Response
    {
        return response()->eventStream(function (): iterable {
            $upstream = Http::withHeaders([
                'Content-Type' => 'application/json',
            ])->stream(
                url: 'http://localhost:11434/api/chat',
                method: HttpMethod::POST,
                data: [
                    'model' => 'llama3',
                    'stream' => true,
                    'messages' => [
                        ['role' => 'user', 'content' => 'Explain SSE briefly'],
                    ],
                ],
            );

            while (($chunk = $upstream->read()) !== null) {
                yield new ServerSentEvent(
                    data: $chunk,
                    event: 'llm-token',
                );
            }

            yield new ServerSentEvent(
                data: '{}',
                event: 'done',
            );
        });
    }
}
```

The HTTP client stream and the browser SSE stream are separate connections:

- `Http::stream()` reads data from the upstream service into Phenix.
- `response()->eventStream()` writes SSE frames from Phenix to the browser.

If the upstream service emits JSON lines, parse complete lines before yielding SSE events. Network chunks can split a JSON object in the middle.

#### Resuming with Last-Event-ID

When an SSE event includes an `id`, browsers remember the last received id. If the connection drops, `EventSource` can reconnect with a `Last-Event-ID` header. Your controller can read that header and resume from the next event if your application can reconstruct the stream.

```php
<?php

declare(strict_types=1);

namespace App\Http\Controllers;

use Phenix\Http\Controller;
use Phenix\Http\Request;
use Phenix\Http\Response;
use Phenix\Http\ServerSentEvent;

class ActivityController extends Controller
{
    public function stream(Request $request): Response
    {
        $lastEventId = $request->getHeader('Last-Event-ID');
        $start = $lastEventId === null
            ? 0
            : ((int) str_replace('activity-', '', $lastEventId)) + 1;

        return response()->eventStream(function () use ($start): iterable {
            for ($index = $start; $index < 100; $index++) {
                yield new ServerSentEvent(
                    data: "Activity {$index}",
                    event: 'activity',
                    id: "activity-{$index}",
                );
            }
        });
    }
}
```
