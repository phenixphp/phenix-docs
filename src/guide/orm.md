# Ashes ORM

## Table of Contents

- [Introduction](#introduction)
- [Generating Models Classes](#generating-models-classes)
- [Model conventions](#model-conventions)
    - [Defining Table](#defining-table)
    - [Model Properties](#model-properties)
    - [Relationships](#relationships)
- [Retrieving Models](#retrieving-models)
    - [Single Model](#single-model)
    - [Collections](#collections)
    - [Pagination](#pagination)
- [Saving Models](#saving-models)
- [Updating Models](#updating-models)
- [Deleting Models](#deleting-models)

## Introduction

Phenix uses the Data Mapper pattern for the modeling layer, allowing a clear separation between business logic and data access logic. Models use class properties with PHP attributes to map table columns in the database to model properties, attributes also allow you to define relationships.

## Generating Models Classes

Phenix provides a command to generate models with additional options to create controller, migration, model query builder and model collection. To create a model, you can use the following command:

```sh
php phenix make:model User
```

#### Command Options

Create model with controller:

```sh
php phenix make:model User --controller
php phenix make:model User -c
```

Create model with migration:

```sh
php phenix make:model User --migration
php phenix make:model User -m
```

Create with custom collection:

```sh
php phenix make:model User --collection
php phenix make:model User -cn
```

Create with custom query builder:

```sh
php phenix make:model User --query
php phenix make:model User -qb
```

Create with controller, migration, query builder and model collection:

```sh
php phenix make:model User --all
php phenix make:model User -a
```

Database models extend from `Phenix\Database\Models\DatabaseModel`:

```php
<?php

declare(strict_types=1);

namespace App\Models;

use Phenix\Database\Models\DatabaseModel;

class User extends DatabaseModel
{
    public static function table(): string
    {
        //
    }
}

```

## Model conventions

### Define table

When a model is created, the first thing to do is to define the database table.

```php
public static function table(): string
{
    return 'users';
}

```

### Model Properties

Model properties are defined using PHP attributes. Here are the available attributes:

#### Available Attributes

**`Id`**: Defines a property as the primary key of the model.
```php
use Phenix\Database\Models\Attributes\Id;

#[Id]
public int $id;
```

**`Column`**: Defines a property as a column in the database.
```php
use Phenix\Database\Models\Attributes\Column;

#[Column]
public string $name;
```

**`DateTime`**: Defines a property as a date/time column.
```php
use Phenix\Database\Models\Attributes\DateTime;

#[DateTime(name: 'created_at', autoInit: true)]
public Date $createdAt;
```

**`ForeignKey`**: Defines a property as a foreign key.
```php
use Phenix\Database\Models\Attributes\ForeignKey;

#[ForeignKey(name: 'user_id')]
public int $userId;
```

### Relationships

Relationships between models are defined using specific attributes:

**`BelongsTo`**: Defines a one-to-many relationship where the model belongs to another model.
```php
use Phenix\Database\Models\Attributes\BelongsTo;
use Phenix\Database\Models\Attributes\ForeignKey;

#[ForeignKey(name: 'user_id')]
public int $userId;

#[BelongsTo(foreignProperty: 'userId')]
public User $user;
```

The name of the model property that was assigned as the foreign key is passed as a parameter to the `BelongsTo` attribute, in turn, the foreign key maps to the foreign key column name in the database to the `ForeignKey` attribute.

**`HasMany`**: Defines a one-to-many relationship where the model has many of another model.
```php
use Phenix\Database\Models\Attributes\HasMany;

#[HasMany(model: Product::class, foreignKey: 'user_id')]
public Collection $products;
```

**`BelongsToMany`**: Defines a many-to-many relationship.
```php
use Phenix\Database\Models\Attributes\BelongsToMany;

#[BelongsToMany(
    table: 'invoice_product',
    foreignKey: 'product_id',
    relatedModel: Invoice::class,
    relatedForeignKey: 'invoice_id'
)]
public Collection $invoices;
```

#### Property-Column Mapping

When the column name in the database and the property name in the model are different, you can assign a column name to be used in the mapping:

```php
use Phenix\Database\Models\Attributes\Id;
use Phenix\Database\Models\Attributes\Column;

#[Id(name: 'idKey')] // Column name in DB
public int $id;

#[Column(name: 'customerName')] // Column name in DB
public string $name;
```

This is what a model looks like with its properties defined:

```php
<?php

declare(strict_types=1);

namespace App\Models;

use Phenix\Database\Models\Attributes\Column;
use Phenix\Database\Models\Attributes\DateTime;
use Phenix\Database\Models\Attributes\HasMany;
use Phenix\Database\Models\Attributes\Id;
use Phenix\Database\Models\Collection;
use Phenix\Database\Models\DatabaseModel;
use Phenix\Util\Date;

class User extends DatabaseModel
{
    #[Id]
    public int $id;

    #[Column]
    public string $name;

    #[Column]
    public string $email;

    #[DateTime(name: 'created_at', autoInit: true)]
    public Date $createdAt;

    #[DateTime(name: 'updated_at')]
    public Date|null $updatedAt = null;

    #[HasMany(model: Product::class, foreignKey: 'user_id')]
    public Collection $products;

    #[HasMany(model: Comment::class, foreignKey: 'user_id', chaperone: true)]
    public Collection $comments;

    public static function table(): string
    {
        return 'users';
    }
}

```

## Retrieving Models

The model query builder allows executing queries and mapping the results into models. If the query retrieves multiple records, they are added to a collection.

### Single model
To query a single model, you can use the `first` method on the query builder. This method retrieves the first record that matches the query criteria and maps it to a model instance. For example, to get a user with a specific ID, you can use the `whereEqual` method to specify the condition and then call `first` to get the user model. More information can be found in the [query builder](/guide/query_builder.html) section.

```php
$user = User::query()->whereEqual('id', 1)->first();

echo $user->name;
```

Phenix ORM also provides a shorthand syntax for querying models. Instead of using the query builder, you can use the `find` method directly on the model class to retrieve a single record by its primary key. This method accepts the primary key value and an optional array of columns to select:

```php
$user = User::find(1, ['id', 'name']);

echo $user->name;
```

This approach simplifies the code and makes it more readable when you need to fetch a single model by its primary key.

### Collections

When a query retrieves multiple records, they are automatically mapped into a collection, which provides an array-like interface with additional methods for filtering, sorting, and manipulating the data. Collections make it easy to work with groups of models, allowing you to iterate over them, apply transformations, and perform bulk operations efficiently.

```php
$users = User::query()->selectAllColumns()->get();

foreach ($users as $user) {
    echo $user->name;
}
```

### Pagination

The `paginate` method is used to retrieve a paginated set of results from the database. It simplifies the process of fetching and displaying paginated data, making it easier to handle large datasets by breaking them into manageable chunks.

```php
<?php

declare(strict_types=1);

namespace App\Http\Controllers;

use App\Models\User;
use Phenix\Http\Request;
use Phenix\Http\Response;
use Phenix\Http\Controller;

class UserController extends Controller
{
    public function index(Request $request): Response
    {
        $users = User::query()
            ->selectAllColumns()
            ->paginate($request->getUri());

        return response()->json($users);
    }
}
```

#### Paginate Signature

```php
use League\Uri\Http;
use Phenix\Database\Paginator;

public function paginate(Http $uri, int $defaultPage = 1, int $defaultPerPage = 15): Paginator
```

- **`Http $uri`**: An instance of the `Http` class from the `League\Uri` package, representing the current URI. This is used to extract query parameters for pagination.
- **`int $defaultPage`**: The default page number to use if no page parameter is present in the URI. Defaults to `1`.
- **`int $defaultPerPage`**: The default number of items per page if no per_page parameter is present in the URI. Defaults to `15`.

## Saving Models

The `save` method is used to persist a model instance to the database. This method handles both the creation of new records and the updating of existing records.

```php
$user = new User();
$user->name = 'John Doe';
$user->email = 'john@example.com';
$user->save();
```

The `create` method in a static method used to create a new model instance with the given attributes. This method simplifies the process of instantiating a model, setting its properties, and saving it to the database in a single step.

```php
$user = User::create([
    'name' => 'John Doe',
    'email' => 'john@example.com',
    'created_at' => Date::now(),
]);
```
## Updating Models

To update an existing model, first retrieve the model, make the necessary changes, and then call the `save` method:

```php
$user = User::find(1);
$user->email = 'newemail@example.com';
$user->save();
```

## Deleting Models

To delete a model from the database, call the `delete` method:

```php
$user = User::find(1);
$user->delete();
```