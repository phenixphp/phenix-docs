# Validation

## Table of Contents

- [Introduction](#introduction)
- [In-line validation](#in-line-validation)
- [Form request validation](#form-request-validation)
    - [Creating a Form Request](#creating-a-form-request)
    - [Define validation rules](#define-validation-rules)
- [Available validation types](#available-validation-types)
    - [Str](#str)
    - [Arr](#arr)
    - [Collection](#collection)
    - [Dictionary](#dictionary)
    - [Boolean](#boolean)
    - [Date](#date)
    - [Email](#email)
    - [File](#file)
    - [Floating](#floating)
    - [Integer](#integer)
    - [Numeric](#numeric)
    - [Uid](#uid)
    - [Url](#url)

## Introduction

The PhenixPHP framework provides a robust validation feature that allows developers to validate data based on various data types. This feature ensures that the data being processed in your application meets the required criteria, enhancing the reliability and security of your application. The validation system in PhenixPHP is designed to be flexible and easy to use, supporting a wide range of data types and validation rules.

## In-line validation

To get started with validation in PhenixPHP, you need to create a route and a controller. In this example, we will create a route that handles a POST request to validate user input.

1. **Define the Route**:

```php
// routes/api.php

use App\Http\Controllers\UserController;
use Phenix\Facades\Route;

Route::post('/users', [UserController::class, 'store'])
    ->name('users.store');
```

2. **Create the Controller**:

```php
// app/Http/Controllers/UserController.php

namespace App\Http\Controllers;

use App\Models\User;
use Phenix\Constants\HttpStatus;
use Phenix\Http\Request;
use Phenix\Http\Response;
use Phenix\Validation\Validator;
use Phenix\Validation\Types\Str;
use Phenix\Validation\Types\Email;
use Phenix\Validation\Types\Date;
use Phenix\Util\Date as DateTime;

class UserController
{
    public function store(Request $request): Response
    {
        $validator = new Validator();

        $validator->setRules([
            'name' => Str::required()->min(3),
            'email' => Email::required(),
            'birthdate' => Date::required()->before(DateTime::now()),
        ]);

        $validator->setData($request->toArray());

        if ($validator->fails()) {
            return response()->json([
                'errors' => $validator->failing()
            ], HttpStatus::UNPROCESSABLE_ENTITY);
        }

        $user = User::create($validator->validated());

        return response()->json($user);
    }
}
```

In this example, we define a route that maps to the `store` method of the `UserController`. Inside the `store` method, we create a `Validator` instance, set the validation rules, and validate the incoming data. If the validation passes, we handle the valid data; otherwise, we return the validation errors.

## Form request validation

The `Form Request` class in the PhenixPHP framework provides a convenient way to define and automatically validate data for HTTP requests. By extending the `FormRequest` class, you can specify validation rules that will be applied to the incoming request data. This ensures that your application processes only valid data, enhancing its reliability and security.

### Creating a Form Request

To create a `Form Request` class, you can use the `make:request` command. This command generates a new `Form Request` class with the necessary structure.

```sh
php phenix make:request StoreUserRequest
```

This command will create a new `StoreUserRequest` class in the `app/Http/Requests` directory.

#### Example of generated Form Request

```php
// app/Http/Requests/StoreUserRequest.php

<?php

declare(strict_types=1);

namespace App\Http\Requests;

use Phenix\Http\FormRequest;
use Phenix\Validation\Types\Email;
use Phenix\Validation\Types\Str;

class StoreUserRequest extends FormRequest
{
    public function rules(): array
    {
        return [];
    }
}
```

### Define validation rules

In the `Form Request`, you define validation rules by implementing the `rules` method. This method should return an array of validation rules that will be applied to the incoming request data. In the `StoreUserRequest` class, we define validation rules for the `name` and `email` fields:

```php
<?php

declare(strict_types=1);

namespace App\Http\Requests;

use Phenix\Http\FormRequest;
use Phenix\Validation\Types\Email;
use Phenix\Validation\Types\Str;

class StoreUserRequest extends FormRequest
{
    public function rules(): array
    {
        return [
            'name' => Str::required()->max(10),
            'email' => Email::required(),
        ];
    }
}
```

In the controller, `Form Request` is used to handle and validate incoming HTTP requests. By using `Form Request`, you can encapsulate the validation logic within a dedicated class, making your controller methods cleaner and more focused on handling the business logic. This approach promotes better separation of concerns and reusability of validation rules. When a request is made, the `Form Request` class automatically validates the data according to the rules defined within it. If the validation fails, a response will be sent with a 422 status code and the validation errors. If the validation passes, the validated data can be accessed directly in the controller method, ensuring that only valid data is processed.

```php
public function store(StoreUserRequest $request): Response
{
    $user = new User();
    $user->name = $request->body('name');
    $user->email = $request->body('email');

    if ($user->save()) {
        return response()->json($user, HttpStatus::CREATED);
    }

    return response()->json([], HttpStatus::SERVICE_UNAVAILABLE);
}
```

## Available validation types

Below is a list of available validation data types and their functions:

- [Str](#str)
- [Arr](#arr)
- [Collection](#collection)
- [Dictionary](#dictionary)
- [Boolean](#boolean)
- [Date](#date)
- [Email](#email)
- [File](#file)
- [Floating](#floating)
- [Integer](#integer)
- [Numeric](#numeric)
- [Uid](#uid)
- [Url](#url)

### Str

The `Str` type extends `QueryableScalar`, which in turn extends `Scalar` and `Type`. Each method in the `Str` class represents a rule that can be applied to validate string data.

To use the `Str` class for validation, you can create an instance and apply the desired validation rules. Here is an example:

```php
use Phenix\Validation\Validator;
use Phenix\Validation\Types\Str;

$validator = new Validator();

$validator->setRules([
    'name' => Str::required()->min(3)->max(50),
]);

$validator->setData([
    'name' => 'John Doe',
]);

// Handle valid data
```

#### Str methods

- `required(): static`
- `optional(): static`
- `nullable(): static`
- `min(int $limit): self`
- `max(int $limit): self`
- `size(int $limit): self`
- `in(array $values): self`
- `notIn(array $values): self`
- `regex(string $pattern): self`
- `startsWith(string $prefix): self`
- `endsWith(string $suffix): self`
- `doesNotStartWith(string $prefix): self`
- `doesNotEndWith(string $suffix): self`
- `exists(string $table, string|null $column = null, Closure|null $query = null): self`
- `unique(string $table, string|null $column = null, Closure|null $query = null): self`

### Arr

The `Arr` type allows you to define and validate arrays with specific structures and rules.

```php
use Phenix\Validation\Validator;
use Phenix\Validation\Types\Arr;
use Phenix\Validation\Types\Str;
use Phenix\Validation\Types\Email;

$validator = new Validator();

$validator->setRules([
    'user' => Arr::required()->define([
        'name' => Str::required()->min(3),
        'email' => Email::required(),
    ]),
]);

$validator->setData([
    'user' => [
        'name' => 'John Doe',
        'email' => 'john@example.com',
    ],
]);

// Handle valid data
```

#### Arr methods

- `required(): static`
- `optional(): static`
- `nullable(): static`
- `define(array $definition)`
- `min(int $limit): self`
- `max(int $limit): self`
- `size(int $limit): self`

### Collection

The `Collection` type allows you to define and validate collections of items, ensuring that each item in the collection meets the specified criteria. This class extends `DefinableArrType`, inheriting its functionality and providing specific rules for collection validation.

```php
use Phenix\Validation\Validator;
use Phenix\Validation\Types\Collection;
use Phenix\Validation\Types\Str;
use Phenix\Validation\Types\Email;

$validator = new Validator();

$validator->setRules([
    'users' => Collection::required()->define([
        'name' => Str::required()->min(3),
        'email' => Email::required(),
    ]),
]);

$validator->setData([
    'users' => [
        ['name' => 'John Doe', 'email' => 'john@example.com'],
        ['name' => 'Jane Doe', 'email' => 'jane@example.com'],
    ],
]);

// Handle valid data
```

#### Collection methods

- `required(): static`
- `optional(): static`
- `nullable(): static`
- `define(array $definition): self`
- `min(int $limit): self`
- `max(int $limit): self`
- `size(int $limit): self`

### Dictionary

The `Dictionary` type allows you to define and validate dictionaries (associative arrays):

```php
use Phenix\Validation\Validator;
use Phenix\Validation\Types\Dictionary;
use Phenix\Validation\Types\Str;

$validator = new Validator();

$validator->setRules([
    'user' => Dictionary::required()->define([
        'name' => Str::required()->min(3),
        'email' => Str::required(),
    ]),
]);

$validator->setData([
    'user' => [
        'name' => 'John Doe',
        'email' => 'john@example.com',
    ],
]);

// Handle valid data
```

#### Dictionary methods

- `required(): static`
- `optional(): static`
- `nullable(): static`
- `define(array $definition): self`
- `min(int $limit): self`
- `max(int $limit): self`
- `size(int $limit): self`

### Boolean

The `Boolean` type allows you to validate boolean values, ensuring that the data being processed in your application is either `true` or `false`. This class extends `Scalar`, inheriting its functionality and providing a specific rule for boolean validation.

```php
use Phenix\Validation\Validator;
use Phenix\Validation\Types\Boolean;

$validator = new Validator();

$validator->setRules([
    'is_active' => Boolean::required(),
]);

$validator->setData([
    'is_active' => true,
]);

// Handle valid data
```

#### Boolean methods

- `required(): static`
- `optional(): static`
- `nullable(): static`

### Date

The `Date` type allows you to validate date values, ensuring that the data being processed in your application meets specific date-related criteria. This class extends `Str`, inheriting its functionality and providing additional rules for date validation.

```php
use Phenix\Validation\Validator;
use Phenix\Validation\Types\Date;
use Phenix\Utils\Date as DateTime;

$validator = new Validator();

$validator->setRules([
    'birthdate' => Date::required()->before(DateTime::now()),
]);

$validator->setData([
    'birthdate' => '2000-01-01',
]);

// Handle valid data
```

#### Date methods

- `required(): static`
- `optional(): static`
- `nullable(): static`
- `equal(DateTimeInterface|string $date): self`
- `after(DateTimeInterface|string $date): self`
- `afterOrEqual(DateTimeInterface|string $date): self`
- `before(DateTimeInterface|string $date): self`
- `beforeOrEqual(DateTimeInterface|string $date): self`
- `format(string $format): self`
- `exists(string $table, string|null $column = null, Closure|null $query = null): self`
- `unique(string $table, string|null $column = null, Closure|null $query = null): self`

### Email

The `Email` type allows you to validate email addresses. This class extends `Str`, inheriting its functionality and providing additional rules for email validation. Internally it uses the `egulias/EmailValidator` package to perform email validation.

```php
use Phenix\Validation\Validator;
use Phenix\Validation\Types\Email;

$validator = new Validator();

$validator->setRules([
    'email' => Email::required(),
]);

$validator->setData([
    'email' => 'john@example.com',
]);

// Handle valid data
```

In the previous example, default validations were applied, but you can add validations depending on the requirement, the available options are:

- filter: `Phenix\Validation\Validations\EmailValidation` (default)
- rfc: `RFCValidation` (default)
- strict: `NoRFCWarningsValidation`
- dns: `DNSCheckValidation`
- spoof: `SpoofCheckValidation`

```php
use Egulias\EmailValidator\Validation\DNSCheckValidation;

$validator->setRules([
    'email' => Email::required()->validations(new DNSCheckValidation()),
]);
```

#### Email methods

- `required(): static`
- `optional(): static`
- `nullable(): static`
- `validations(EmailValidation ...$emailValidations): self`
- `exists(string $table, string|null $column = null, Closure|null $query = null): self`
- `unique(string $table, string|null $column = null, Closure|null $query = null): self`

### File

The `File` type allows you to validate file uploads, ensuring that the files being processed in your application meet specific criteria such as size and MIME type.

```php
use Phenix\Validation\Validator;
use Phenix\Validation\Types\File;

$validator = new Validator();

$validator->setRules([
    'profile_picture' => File::required()->mimes(['image/png'])->max(2048),
]);

$validator->setData([
    'profile_picture' => new BufferedFile(
        'user.png',
        file_get_contents('/path/to/picture.png'),
        'image/png',
        [['Content-Type', 'image/png']]
    ),
]);

// Handle valid data
```

#### File methods

- `required(): static`
- `optional(): static`
- `nullable(): static`
- `min(float|int $limit): static`
- `max(float|int $limit): static`
- `size(float|int $limit): static`
- `mimes(array $types): static`

### Floating

The `Floating` type allows you to validate floating-point numbers.

```php
use Phenix\Validation\Validator;
use Phenix\Validation\Types\Floating;

$validator = new Validator();

$validator->setRules([
    'price' => Floating::required()->min(0.0)->max(100.0),
]);

$validator->setData([
    'price' => 49.99,
]);

// Handle valid data
```

#### Floating methods

- `required(): static`
- `optional(): static`
- `nullable(): static`
- `min(float $limit): self`
- `max(float $limit): self`
- `between(float $min, float $max): self`
- `in(array $values): self`
- `notIn(array $values): self`
- `digits(int $length): self`
- `decimals(int $length): self`
- `digitsBetween(int $min, int $max): self`
- `decimalsBetween(int $min, int $max): self`

### Integer

The `Integer` type allows you to validate integer values.

```php
use Phenix\Validation\Validator;
use Phenix\Validation\Types\Integer;

$validator = new Validator();

$validator->setRules([
    'age' => Integer::required()->min(18)->max(65),
]);

$validator->setData([
    'age' => 30,
]);

// Handle valid data
```

#### Integer methods

- `required(): static`
- `optional(): static`
- `nullable(): static`
- `min(int $limit): self`
- `max(int $limit): self`
- `between(int $min, int $max): self`
- `in(array $values): self`
- `notIn(array $values): self`
- `digits(int $length): self`
- `digitsBetween(int $min, int $max): self`
- `exists(string $table, string|null $column = null, Closure|null $query = null): self`
- `unique(string $table, string|null $column = null, Closure|null $query = null): self`

### Numeric

The `Numeric` type allows you to validate numeric values.

```php
use Phenix\Validation\Validator;
use Phenix\Validation\Types\Numeric;

$validator = new Validator();

$validator->setRules([
    'score' => Numeric::required()->digits(3),
]);

$validator->setData([
    'score' => 123,
]);

// Handle valid data
```

#### Numeric methods

- `required(): static`
- `optional(): static`
- `nullable(): static`
- `digits(int $value): self`
- `digitsBetween(int $min, int $max): self`
- `in(array $values): self`
- `notIn(array $values): self`
- `exists(string $table, string|null $column = null, Closure|null $query = null): self`
- `unique(string $table, string|null $column = null, Closure|null $query = null): self`

### Uid

The `Uid` type allows you to validate unique identifiers such as UUIDs and ULIDs. This class extends `Str`, inheriting its functionality and providing additional rules for UID validation.

```php
use Phenix\Validation\Validator;
use Phenix\Validation\Types\Uid;

$validator = new Validator();

$validator->setRules([
    'identifier' => Uid::required()->uuid(),
]);

$validator->setData([
    'identifier' => '550e8400-e29b-41d4-a716-446655440000',
]);

// Handle valid data
```

### Uid methods

- `required(): static`
- `optional(): static`
- `nullable(): static`
- `uuid(): self`
- `ulid(): self`
- `exists(string $table, string|null $column = null, Closure|null $query = null): self`
- `unique(string $table, string|null $column = null, Closure|null $query = null): self`

### Url

The `Url` type allows you to validate URL values. This class extends `Str`, inheriting its functionality and providing additional rules for URL validation.

```php
use Phenix\Validation\Validator;
use Phenix\Validation\Types\Url;

$validator = new Validator();

$validator->setRules([
    'website' => Url::required(),
]);

$validator->setData([
    'website' => 'http://php.net',
]);

// Handle valid data
```

### Url methods

- `required(): static`
- `optional(): static`
- `nullable(): static`
- `exists(string $table, string|null $column = null, Closure|null $query = null): self`
- `unique(string $table, string|null $column = null, Closure|null $query = null): self`


