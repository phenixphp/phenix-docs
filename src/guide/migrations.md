# Database migrations

Migrations add versioning to database changes over time. The migration system implemented in Phenix is based on [Phinx](https://phinx.org/), and it is no coincidence, Phinx offers simplicity and maintainability. Migrations are stored in the `database/migrations` folder and extend the `Phenix\Database\Migration` class.

## Writing migrations

To create a migration, you can run the following Phenix command:

```
php phenix make:migration CreateUserTable
```
The name of the migration must be created with the camel case style, the class will be created with the name in camel case style but the file will be created with a name composed of two parts, the date and time and the name of the migration in snake case style, example, `20231006144210_create_users_table`.

- Version (time): 20231006144210
- File name: create_users_table
- Class name: CreateUserTable

```php
<?php

declare(strict_types=1);

use Phenix\Database\Migration;

class CreateUsersTable extends Migration
{
    public function up(): void
    {
        // ..
    }

    public function down(): void
    {
        // ..
    }
}
```

The `up` method is used to create and modify tables, add indexes and other operations, while the `down` method should reverse the operations performed by the up method.

### Running migrations

To run the migrations use the `migrate` command:

```
php phenix migrate
```

### Rolling back migrations

The rollback command reverts the last migration, or optionally up to a specific version:

```
php phenix migrate:rollback
```

To roll back to a specific version you can use the `-t` option:

php phenix migrate:rollback -t 20231006144210

## Creating tables

```php
public function up(): void
{
    $table = $this->table("users");
    $table->addColumn('name', 'string', ['limit' => 100]);
    $table->addColumn('email', 'string', ['limit' => 100]);
    $table->create();
}
```
