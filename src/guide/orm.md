# Ashes ORM

## Table of Contents

- [Introduction](#introduction)
- [Generating Models Classes](#generating-models-classes)
- [Model conventions](#model-conventions)
    - [Defining Table](#defining-table)
    - [Defining Model Properties](#defining-model-properties)
    - [Defining Relationships](#defining-relationships)
- [Retrieving Models](#retrieving-models)
    - [Single Model](#get-single-model)
    - [Collections](#get-model-collection)
- [Saving Models](#saving-models)
    - [Save Model Example](#save-model-example)
- [Updating Models](#updating-models)
    - [Update Model Example](#update-model-example)
- [Deleting Models](#deleting-models)
    - [Delete Model Example](#delete-model-example)

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

### Defining Model Properties

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

### Defining Relationships

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

#[Id('idKey')]
public int $id;

#[Column('customerName')]
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

### Get single model
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

### Get model collection

```php
$users = User::query()->selectAllColumns()->get();

foreach ($users as $user) {
    echo $user->name;
}
```

You can paginate the results using the `paginate` method of the query builder.

## Saving Models

To save a model to the database, simply call the `save` method:

### Save Model Example

```php
$user = new User();
$user->name = 'John Doe';
$user->email = 'john@example.com';
$user->save();
```

## Updating Models

To update an existing model, first retrieve the model, make the necessary changes, and then call the `save` method:

### Update Model Example

```php
$user = User::find(1);
$user->email = 'newemail@example.com';
$user->save();
```

## Deleting Models

To delete a model from the database, call the `delete` method:

### Delete Model Example

```php
$user = User::find(1);
$user->delete();
```