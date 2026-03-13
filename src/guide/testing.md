# Testing

## Table of Contents

- [Test foundation](#test-foundation)
    - [Creating the project test case](#creating-the-project-test-case)
- [HTTP request helpers](#http-request-helpers)
    - [The `call` method](#the-call-method)
    - [Shortcut methods](#shortcut-methods)
    - [Sending form and multipart requests](#sending-form-and-multipart-requests)
- [Response assertions](#response-assertions)
    - [Status code assertions](#status-code-assertions)
    - [Body assertions](#body-assertions)
    - [Header assertions](#header-assertions)
    - [JSON assertions](#json-assertions)
- [Database testing utilities](#database-testing-utilities)
    - [Asserting database state](#asserting-database-state)
    - [Resetting the database](#resetting-the-database)
- [Events, queue, and mail fakes](#events-queue-and-mail-fakes)
    - [Event testing](#event-testing)
    - [Queue testing](#queue-testing)
    - [Mail testing](#mail-testing)
- [Other testing helpers](#other-testing-helpers)
    - [Faker](#faker)
    - [Console testing](#console-testing)
    - [Mocking with `Mock::of`](#mocking-with-mockof)

Phenix ships with a small but practical testing layer built around `Phenix\Testing\TestCase` and `Phenix\Testing\TestResponse`. These helpers are designed for feature tests, response assertions, database checks, console tests, and test doubles for framework subsystems such as events, queues, and mail.

## Test foundation

`Phenix\Testing\TestCase` extends `Amp\PHPUnit\AsyncTestCase`, so asynchronous tests still use the normal PHPUnit lifecycle.

During `setUp()`, the base class:

- boots the application through `AppBuilder`
- enables testing mode on the app
- runs `refreshDatabase()` automatically when the test uses `RefreshDatabase`
- clears compiled view cache

During `tearDown()`, it:

- resets event faking
- resets queue faking
- clears the mail sending log
- clears the file cache store when the default cache driver uses files
- stops the app proxy instance

If you need a dedicated environment file for tests, you can also override `getEnvFile()`.

### Creating the project test case

Create your project test case by extending `Phenix\Testing\TestCase`.

```php
<?php

declare(strict_types=1);

namespace Tests;

use Phenix\Testing\TestCase as BaseTestCase;

class TestCase extends BaseTestCase
{
    //
}
```

## HTTP request helpers

Feature tests can send real HTTP requests through the testing client exposed by `TestCase`. Start the app before calling `get()`, `post()`, or any of the other helpers.

```php
Route::get('/health', fn () => response()->plain('ok'));

$this->app->run();

$this->get('/health')
    ->assertOk()
    ->assertBodyContains('ok');
```

### The `call` method

Use `call()` when you need full control over the HTTP method:

```php
use Phenix\Http\Constants\HttpMethod;

$response = $this->call(
    HttpMethod::GET,
    '/users',
    parameters: ['page' => 2],
    headers: ['Accept' => 'application/json']
);
```

Signature:

```php
call(
    HttpMethod $method,
    string $path,
    array $parameters = [],
    Form|array|string|null $body = null,
    array $headers = []
): TestResponse
```

Behavior:

- `$parameters` are appended to the target URL
- `Form` bodies support form-urlencoded and multipart payloads
- array bodies are JSON-encoded before being sent
- the helper returns a `TestResponse`, so assertions can be chained

When sending an array body, set the `Content-Type` header yourself if your endpoint depends on it:

```php
$this->post(
    '/api/users',
    ['name' => 'John Doe', 'email' => 'john@example.com'],
    headers: ['Content-Type' => 'application/json']
)->assertCreated();
```

### Shortcut methods

`TestCase` provides shortcut methods for common verbs:

- `get(string $path, array $parameters = [], array $headers = [])`
- `post(string $path, Form|array|string|null $body = null, array $parameters = [], array $headers = [])`
- `put(string $path, Form|array|string|null $body = null, array $parameters = [], array $headers = [])`
- `patch(string $path, Form|array|string|null $body = null, array $parameters = [], array $headers = [])`
- `delete(string $path, array $parameters = [], array $headers = [])`
- `options(string $path, array|string|null $body = null, array $parameters = [], array $headers = [])`

Use `call()` when you need a verb/body combination that is not covered by the shortcuts.

### Sending form and multipart requests

The helpers accept `Amp\Http\Client\Form`, which is useful for classic forms and file uploads:

```php
use Amp\Http\Client\Form;

$body = new Form();
$body->addField('title', 'Post title');
$body->addField('content', 'Post content');

$this->post('/posts', $body)->assertOk();
```

For multipart uploads:

```php
use Amp\Http\Client\Form;

$body = new Form();
$body->addField('description', 'Upload file');
$body->addFile('file', '/../path/to/file.txt');

$this->post('/files', $body)
    ->assertOk()
    ->assertIsJson();
```

## Response assertions

Every HTTP helper returns `Phenix\Testing\TestResponse`. It wraps the Amp response object and exposes assertions grouped by concern.

### Status code assertions

Use `assertStatusCode()` for any `HttpStatus` value, or the convenience helpers for common cases:

- `assertStatusCode(HttpStatus $code)`
- `assertOk()`
- `assertCreated()`
- `assertNotFound()`
- `assertNotAcceptable()`
- `assertUnprocessableEntity()`
- `assertUnauthorized()`

```php
use Phenix\Http\Constants\HttpStatus;

$this->post('/api/users', [
    'name' => 'John Doe',
], headers: [
    'Content-Type' => 'application/json',
])->assertStatusCode(HttpStatus::CREATED);
```

### Body assertions

The response body is buffered when `TestResponse` is created.

- `getBody()`: returns the raw response body as a string
- `assertBodyContains(array|string $needles)`: asserts that one or more fragments exist in the body

```php
$response = $this->get('/users');

expect($response->getBody())->toContain('<body>');

$response->assertBodyContains([
    '<body>',
    'User index',
]);
```

### Header assertions

Header helpers are useful for exact header checks and content-type assertions:

- `getHeaders()`
- `getHeader(string $name)`
- `assertHeaders(array $needles)`
- `assertHeaderIsMissing(string $name)`
- `assertHeadersMissing(array $needles)`
- `assertIsJson()`
- `assertIsHtml()`
- `assertIsPlainText()`

`assertHeaders()` compares exact values, so include the full header value when needed.

```php
$this->get('/users')
    ->assertOk()
    ->assertHeaders([
        'Content-Type' => 'text/html; charset=utf-8',
    ])
    ->assertIsHtml()
    ->assertBodyContains('User index');
```

You can also assert that specific headers are intentionally absent:

```php
$this->get('/redirect')
    ->assertHeadersMissing([
        'Strict-Transport-Security',
        'Referrer-Policy',
    ]);
```

### JSON assertions

JSON responses can be inspected and asserted through:

- `getDecodedBody()`
- `assertJsonContains(array $data, ?string $path = null)`
- `assertJsonDoesNotContain(array $data, ?string $path = null)`
- `assertJsonFragment(array $fragment)`
- `assertJsonMissingFragment(array $fragment)`
- `assertJsonPath(string $path, mixed $expectedValue)`
- `assertJsonPathNotEquals(string $path, mixed $expectedValue)`
- `assertJsonStructure(array $structure)`
- `assertJsonCount(int $count, ?string $path = null)`

`assertJsonPath()` is the right choice for nested dot paths such as `user.profile.name`.

`assertJsonContains()` and `assertJsonCount()` also accept a `$path` argument for wrapped top-level keys such as `data`.

```php
$this->get('/api/data')
    ->assertOk()
    ->assertIsJson()
    ->assertJsonFragment(['name' => 'John Doe'])
    ->assertJsonPath('status', 'success')
    ->assertJsonPath('user.email', 'john@example.com')
    ->assertJsonStructure([
        'status',
        'code',
        'user' => ['id', 'name', 'email'],
    ])
    ->assertJsonPathNotEquals('status', 'error')
    ->assertJsonMissingFragment(['error' => 'Something went wrong']);
```

Wildcard structure assertions are supported with `*`:

```php
$this->get('/api/users')
    ->assertOk()
    ->assertJsonStructure([
        'users' => [
            '*' => ['id', 'name', 'email'],
        ],
        'meta' => ['total', 'page'],
    ]);
```

Counting wrapped collections:

```php
$this->get('/api/users')
    ->assertOk()
    ->assertJsonCount(2, 'users');
```

Asserting secure headers on a JSON response:

```php
$this->get('/secure')
    ->assertOk()
    ->assertIsJson()
    ->assertHeaders([
        'X-Frame-Options' => 'SAMEORIGIN',
        'X-Content-Type-Options' => 'nosniff',
        'Referrer-Policy' => 'no-referrer',
    ]);
```

## Database testing utilities

`Phenix\Testing\Concerns\InteractWithDatabase` adds helpers for asserting database state directly from your tests.

### Asserting database state

Available assertions:

- `assertDatabaseHas(string $table, Closure|array $criteria)`
- `assertDatabaseMissing(string $table, Closure|array $criteria)`
- `assertDatabaseCount(string $table, int $expected, Closure|array $criteria = [])`

Criteria can be expressed in two ways:

- an associative array of column/value pairs
- a closure that receives the query builder so you can add custom conditions

Special handling:

- `null` values are translated to `whereNull(...)`
- booleans are normalized to integer values before comparing

```php
$this->assertDatabaseHas('users', [
    'email' => 'john@example.com',
    'active' => true,
    'deleted_at' => null,
]);

$this->assertDatabaseCount('users', 2, function ($query): void {
    $query->whereEqual('active', 1);
});
```

These assertions pair well with feature tests:

```php
$this->app->run();

$this->post('/api/users', [
    'name' => 'John Doe',
    'email' => 'john@example.com',
], headers: [
    'Content-Type' => 'application/json',
])->assertCreated();

$this->assertDatabaseHas('users', [
    'email' => 'john@example.com',
]);
```

### Resetting the database

Use `Phenix\Testing\Concerns\RefreshDatabase` when you want migrations to run once and tables to be cleaned between tests.

Behavior:

- migrations run once per PHP process
- the database is truncated before each test after the initial migration run
- the `migrations` table is excluded from truncation
- MySQL, PostgreSQL, and SQLite are supported

```php
use Phenix\Testing\Concerns\RefreshDatabase;

class UserTest extends TestCase
{
    use RefreshDatabase;
}
```

You do not need to call `refreshDatabase()` manually when your test extends `Phenix\Testing\TestCase`. The base class detects the trait and runs it during `setUp()`.

## Events, queue, and mail fakes

Phenix exposes testing doubles for events, queue pushes, and outgoing mail. These helpers are meant for test environments. In production mode, the fake and log methods are no-ops.

### Event testing

Use the `Event` facade to fake, log, and assert dispatched events.

Available helpers:

- `Event::log()`
- `Event::fake()`
- `Event::fakeWhen(string $event, Closure $callback)`
- `Event::fakeTimes(string $event, int $times)`
- `Event::fakeOnce(string $event)`
- `Event::fakeOnly(string $event)`
- `Event::fakeExcept(string $event)`
- `Event::expect(string $event)`

Expectation methods on `TestEvent`:

- `toBeDispatched(?Closure $closure = null)`
- `toNotBeDispatched(?Closure $closure = null)`
- `toBeDispatchedTimes(int $times)`
- `toDispatchNothing()`

Use `log()` when you want to record events without preventing listeners from running. Use `fake()` when listeners should not execute.

```php
use Phenix\Facades\Event;

Event::fake();

// Code that emits the event...

Event::expect('user.registered')->toBeDispatched();
Event::expect('user.registered')->toBeDispatchedTimes(1);
Event::expect('other.event')->toNotBeDispatched();
```

Predicate closures for `toBeDispatched()` receive the matched event instance:

```php
Event::log();

// Code that emits "user.updated"

Event::expect('user.updated')->toBeDispatched(function ($event): bool {
    return $event !== null && $event->getPayload()['email'] === 'john@example.com';
});
```

### Queue testing

Queue assertions are exposed through the `Queue` facade.

Available helpers:

- `Queue::log()`
- `Queue::fake()`
- `Queue::fakeWhen(string $taskClass, Closure $callback)`
- `Queue::fakeTimes(string $taskClass, int $times)`
- `Queue::fakeOnce(string $taskClass)`
- `Queue::fakeOnly(string $taskClass)`
- `Queue::fakeExcept(string $taskClass)`
- `Queue::expect(string $taskClass)`

Expectation methods on `TestQueue`:

- `toBePushed(?Closure $closure = null)`
- `toNotBePushed(?Closure $closure = null)`
- `toBePushedTimes(int $times)`
- `toPushNothing()`

```php
use App\Tasks\SendWelcomeEmail;
use Phenix\Facades\Queue;

Queue::fake();

// Code that pushes the task...

Queue::expect(SendWelcomeEmail::class)->toBePushed();
Queue::expect(SendWelcomeEmail::class)->toBePushedTimes(1);
```

Predicate closures for `toBePushed()` receive the first matched task instance:

```php
Queue::fake();

// Code that pushes the task on the "emails" queue...

Queue::expect(SendWelcomeEmail::class)->toBePushed(function ($task): bool {
    return $task !== null && $task->getQueueName() === 'emails';
});
```

### Mail testing

Use `Mail::fake()` to send mail through the log transport and inspect what would have been sent.

Available helpers:

- `Mail::fake(MailerType|null $mailerType = null)`
- `Mail::expect(Mailable|string $mailable, MailerType|null $mailerType = null)`

Expectation methods on `TestMail`:

- `toBeSent(?Closure $closure = null)`
- `toNotBeSent(?Closure $closure = null)`
- `toBeSentTimes(int $times)`

```php
use App\Mail\WelcomeMail;
use Phenix\Facades\Mail;

Mail::fake();

// Code that sends the mailable...

Mail::expect(WelcomeMail::class)->toBeSent();
Mail::expect(WelcomeMail::class)->toBeSentTimes(1);
```

Predicate closures for `toBeSent()` receive the filtered collection of matching log records:

```php
use Phenix\Data\Collection;
use Phenix\Util\Arr;

Mail::expect(WelcomeMail::class)->toBeSent(function (Collection $matches): bool {
    return Arr::get($matches->first(), 'mailable') === WelcomeMail::class;
});
```

## Other testing helpers

### Faker

`Phenix\Testing\Concerns\WithFaker` exposes a lazily created Faker generator through `$this->faker()`.

In Pest:

```php
use Phenix\Testing\Concerns\WithFaker;

uses(WithFaker::class);

it('creates random data', function (): void {
    $email = $this->faker()->freeEmail();

    expect($email)->toContain('@');
});
```

In PHPUnit, add the trait to your test class.

### Console testing

`TestCase::phenix()` runs a registered console command and returns Symfony's `CommandTester`.

Signature:

```php
phenix(string $signature, array $arguments = [], array $inputs = []): CommandTester
```

Use `$inputs` for interactive commands.

```php
/** @var \Symfony\Component\Console\Tester\CommandTester $command */
$command = $this->phenix('view:clear');

$command->assertCommandIsSuccessful();

expect($command->getDisplay())->toContain('Compiled views cleared successfully!.');
```

### Mocking with `Mock::of`

`Phenix\Testing\Mock::of()` is a concise wrapper around Mockery that lets you define expectations with named closures and then swap the mock into the container.

```php
use Phenix\Filesystem\Contracts\File;
use Phenix\Testing\Mock;

$mock = Mock::of(File::class)->expect(
    exists: fn (string $path) => false,
    get: fn (string $path) => '',
    put: fn (string $path, string $content) => true,
    createDirectory: function (string $path): void {
        // ...
    },
);

$this->app->swap(File::class, $mock);
```

This is especially useful in console and service tests where you want a short, typed mock setup without building a full PHPUnit mock manually.
