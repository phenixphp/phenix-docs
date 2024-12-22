# Database Migrations

Migrations add versioning to database changes over time. The migration system implemented in Phenix is based on [Phinx](https://phinx.org/), offering simplicity and maintainability. Migrations are stored in the `database/migrations` folder and extend the `Phenix\Database\Migration` class.

## Writing Migrations

To create a migration, run the following Phenix command:

```
php phenix make:migration CreateUserTable
```

The name of the migration must be in camel case style. The class will be created with the name in camel case style, but the file will be created with a name composed of two parts: the date and time, and the name of the migration in snake case style. For example, `20231006144210_create_users_table`.

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

The `up` method is used to create and modify tables, add indexes, and perform other operations, while the `down` method should reverse the operations performed by the `up` method.

### Running Migrations

To run the migrations, use the `migrate` command:

```
php phenix migrate
```

### Rolling Back Migrations

The rollback command reverts the last migration, or optionally up to a specific version:

```
php phenix migrate:rollback
```

To roll back to a specific version, use the `-t` option:

```
php phenix migrate:rollback -t 20231006144210
```

## Tables

The `table` method prepares the table to be created. The first argument is the name of the table, and the second argument is an associative array of options.

```php
public function up(): void
{
    $table = $this->table("users");
    $table->addColumn('name', 'string', ['limit' => 100]);
    $table->addColumn('email', 'string', ['limit' => 100]);
    $table->create();
}
```

> **Important**: The `id` column is not defined because it is automatically created as the primary key. To specify a different primary key, use the `primary_key` option.

### Table Options

| Option      | Values                          |
|-------------|---------------------------------|
| primary_key | `array`, `string`, `false`      |
| engine      | Defaults to `InnoDB`            |
| collation   | Defaults to `utf8mb4_unicode_ci`|
| signed      | Defaults to `false`             |

### Checking if Table Exists

The `hasTable` method verifies the existence of a table in the database.

```php
public function up(): void
{
    if (! $this->hasTable('users')) {
        // code
    }
}
```

### Dropping Tables

To drop a table, use the `drop` method and invoke the `save` method.

```php
$this->table('users')->drop()->save();
```

### Renaming Tables

To rename tables, use the `rename` method and invoke the `update` method to apply the change.

```php
$this->table('users')
    ->rename('legacy_users')
    ->update();
```

## Columns

The `addColumn` method adds columns to the table being created, specifying the data type and additional configuration options.

```php
public function up(): void
{
    $table = $this->table("users");
    $table->addColumn('name', 'string', ['limit' => 100]);
    $table->create();
}
```

### Column Types

Supported data types for columns:

- binary
- boolean
- char
- date
- datetime
- decimal
- float
- double
- smallinteger
- integer
- biginteger
- string
- text
- time
- timestamp
- uuid

The MySQL adapter also supports `enum`, `set`, `blob`, `tinyblob`, `mediumblob`, `longblob`, `bit`, and `json` column types (`json` in MySQL 5.7 and above). When providing a limit value and using `binary`, `varbinary`, or `blob` and its subtypes, the retained column type will be based on the required length (see [Limit Option and MySQL](#limit-option-and-mysql) for details).

The Postgres adapter supports `interval`, `json`, `jsonb`, `uuid`, `cidr`, `inet`, and `macaddr` column types (PostgreSQL 9.3 and above).

#### Column Options

For any column type:

| Option  | Description                                                                                                                                                                         |
|---------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| limit   | Set maximum length for strings, also hints column types in adapters (see note below)                                                                                                |
| length  | Alias for `limit`                                                                                                                                                                   |
| default | Set default value or action                                                                                                                                                         |
| null    | Allow `NULL` values, defaults to false if `identity` option is set to true, else defaults to true                                                                                   |
| after   | Specify the column that a new column should be placed after, or use `\Phinx\Db\Adapter\MysqlAdapter::FIRST` to place the column at the start of the table *(only applies to MySQL)* |
| comment | Set a text comment on the column                                                                                                                                                    |

For `decimal` columns:

| Option    | Description                                                       |
|-----------|-------------------------------------------------------------------|
| precision | Combine with `scale` to set decimal accuracy                      |
| scale     | Combine with `precision` to set decimal accuracy                  |
| signed    | Enable or disable the `unsigned` option *(only applies to MySQL)* |

For `enum` and `set` columns:

| Option | Description                                         |
|--------|-----------------------------------------------------|
| values | Can be a comma-separated list or an array of values |

For `smallinteger`, `integer`, and `biginteger` columns:

| Option   | Description                                                       |
|----------|-------------------------------------------------------------------|
| identity | Enable or disable automatic incrementing                          |
| signed   | Enable or disable the `unsigned` option *(only applies to MySQL)* |

For Postgres, when using `identity`, it will utilize the `serial` type appropriate for the integer size, so that `smallinteger` will give you `smallserial`, `integer` gives `serial`, and `biginteger` gives `bigserial`.

For `timestamp` columns:

| Option   | Description                                                                                                    |
|----------|----------------------------------------------------------------------------------------------------------------|
| default  | Set default value (use with `CURRENT_TIMESTAMP`)                                                               |
| update   | Set an action to be triggered when the row is updated (use with `CURRENT_TIMESTAMP`) *(only applies to MySQL)* |
| timezone | Enable or disable the `with time zone` option for `time` and `timestamp` columns *(only applies to Postgres)*  |

For `boolean` columns:

| Option | Description                                                       |
|--------|-------------------------------------------------------------------|
| signed | Enable or disable the `unsigned` option *(only applies to MySQL)* |

For `string` and `text` columns:

| Option    | Description                                                                  |
|-----------|------------------------------------------------------------------------------|
| collation | Set collation that differs from table defaults *(only applies to MySQL)*     |
| encoding  | Set character set that differs from table defaults *(only applies to MySQL)* |

For foreign key definitions:

| Option     | Description                                           |
|------------|-------------------------------------------------------|
| update     | Set an action to be triggered when the row is updated |
| delete     | Set an action to be triggered when the row is deleted |
| constraint | Set a name to be used by the foreign key constraint   |

### Checking if Column Exists

```php
$column = $table->hasColumn('username');

if ($column) {
    // code
}
```

### Renaming a Column

```php
$this->table('users')
    ->renameColumn('nickname', 'username')
    ->save();
```

### Adding Column After Another

```php
$table = $this->table('users');
$table->addColumn('city', 'string', ['after' => 'email']);
$table->update();
```

### Dropping a Column

```php
$table = $this->table('users');
$table->removeColumn('nickname')->save();
```

## Indexes

Indexes are used to improve the performance of database queries by speeding up data retrieval. They serve as data structures that provide fast access to specific rows within database tables. By creating an index on one or more columns, the database can quickly locate the desired data without having to scan the entire table, resulting in significant query optimization.

```php
$table = $this->table("users");
$table->addColumn('name', 'string', ['limit' => 100]);
$table->addColumn('email', 'string', ['limit' => 100]);
$table->addIndex(['email']);
$table->create();
```

More about indexes: [Indexes in Depth](https://book.cakephp.org/phinx/0/en/migrations.html#working-with-indexes).

## Foreign Keys

To add foreign keys, use the `addForeignKey` method. The first argument is the name of the foreign key, the second argument is the name of the related table, the third argument is the column that refers to the foreign key, and the fourth argument is the configuration options.

```php
$table = $this->table("posts");
$table->addColumn('title', 'string', ['limit' => 100]);
$table->addForeignKey('user_id', 'users', 'id', ['delete'=> 'SET_NULL', 'update'=> 'NO_ACTION']);
$table->create();
```

More about foreign keys: [Foreign Keys in Depth](https://book.cakephp.org/phinx/0/en/migrations.html#working-with-foreign-keys).