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

```
php phenix migrate:rollback -t 20231006144210
```

## Tables

The `table` method allows the preparation of the table to be created, the first argument is the name of the table, the second argument is the options available in an associative array structure.

```php
public function up(): void
{
    $table = $this->table("users");
    $table->addColumn('name', 'string', ['limit' => 100]);
    $table->addColumn('email', 'string', ['limit' => 100]);
    $table->create();
}
```

> **Important**: The `id` column was not defined because it is automatically created as the primary key, you can indicate a specific primary key you can use the `primary_key` option to assign it.

### Table options

| Option      | Values                          |
|-------------|---------------------------------|
| primary_key | `array`, `string`, `false`      |
| engine      | Defaults to `InnoDB`            |
| collation   | Defaults to `utf8mb4_unicode_ci`|
| signed      | Defaults to `false`             |

### Checking if exists

The `hasTable` method allows you to verify the existence of a table in the database.

```php
public function up(): void
{
    if (! $this->hasTable('users')) {
        // code
    }
}
```

### Dropping tables

To drop a table we can use the `drop` method, for the operation to be executed we must invoke the `save` method.

```php
$this->table('users')->drop()->save();
```

### Rename tables

To rename tables we can use the `rename` method and invoke the `update` method so that the change takes effect.

```php
$this->table('users')
    ->rename('legacy_users')
    ->update();
```

## Columns

The `addColumn` method allows adding columns to the table to be created, the data type and additionally configuration options.


```php
public function up(): void
{
    $table = $this->table("users");
    $table->addColumn('name', 'string', ['limit' => 100]);
    $table->create();
}
```

### Column types

These are the supported data types for columns:

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

In addition, the MySQL adapter supports `enum`, `set`, `blob`,
`tinyblob`, `mediumblob`, `longblob`, `bit` and `json` column types
(`json` in MySQL 5.7 and above). When providing a limit value and using
`binary`, `varbinary` or `blob` and its subtypes, the retained column
type will be based on required length (see [Limit Option and
MySQL](#limit-option-and-mysql) for details);

In addition, the Postgres adapter supports `interval`, `json`, `jsonb`,
`uuid`, `cidr`, `inet` and `macaddr` column types (PostgreSQL 9.3 and
above).

#### Column options

For any column type:

| Option  | Description                                                                                                                                                                         |
|---------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| limit   | set maximum length for strings, also hints column types in adapters (see note below)                                                                                                |
| length  | alias for `limit`                                                                                                                                                                   |
| default | set default value or action                                                                                                                                                         |
| null    | allow `NULL` values, defaults to false if <span class="title-ref">identity</span> option is set to true, else defaults to true                                                      |
| after   | specify the column that a new column should be placed after, or use `\Phinx\Db\Adapter\MysqlAdapter::FIRST` to place the column at the start of the table *(only applies to MySQL)* |
| comment | set a text comment on the column                                                                                                                                                    |

For `decimal` columns:

| Option    | Description                                                       |
|-----------|-------------------------------------------------------------------|
| precision | combine with `scale` set to set decimal accuracy                  |
| scale     | combine with `precision` to set decimal accuracy                  |
| signed    | enable or disable the `unsigned` option *(only applies to MySQL)* |

For `enum` and `set` columns:

| Option | Description                                         |
|--------|-----------------------------------------------------|
| values | Can be a comma separated list or an array of values |

For `smallinteger`, `integer` and `biginteger` columns:

| Option   | Description                                                       |
|----------|-------------------------------------------------------------------|
| identity | enable or disable automatic incrementing                          |
| signed   | enable or disable the `unsigned` option *(only applies to MySQL)* |

For Postgres, when using `identity`, it will utilize the `serial` type
appropriate for the integer size, so that `smallinteger` will give you
`smallserial`, `integer` gives `serial`, and `biginteger` gives
`bigserial`.

For `timestamp` columns:

| Option   | Description                                                                                                    |
|----------|----------------------------------------------------------------------------------------------------------------|
| default  | set default value (use with `CURRENT_TIMESTAMP`)                                                               |
| update   | set an action to be triggered when the row is updated (use with `CURRENT_TIMESTAMP`) *(only applies to MySQL)* |
| timezone | enable or disable the `with time zone` option for `time` and `timestamp` columns *(only applies to Postgres)*  |

For `boolean` columns:

| Option | Description                                                       |
|--------|-------------------------------------------------------------------|
| signed | enable or disable the `unsigned` option *(only applies to MySQL)* |

For `string` and `text` columns:

| Option    | Description                                                                  |
|-----------|------------------------------------------------------------------------------|
| collation | set collation that differs from table defaults *(only applies to MySQL)*     |
| encoding  | set character set that differs from table defaults *(only applies to MySQL)* |

For foreign key definitions:

| Option     | Description                                           |
|------------|-------------------------------------------------------|
| update     | set an action to be triggered when the row is updated |
| delete     | set an action to be triggered when the row is deleted |
| constraint | set a name to be used by foreign key constraint       |

### Checking if column exists

```php
$column = $table->hasColumn('username');

if ($column) {
    // code
}
```

### Renaming a column

```php
$this->table('users')
    ->renameColumn('nickname', 'username')
    ->save();
```

### Adding column after another

```php
$table = $this->table('users');
$table->addColumn('city', 'string', ['after' => 'email']);
$table->update();
```

### Dropping a column

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

More about indexes: [Indexes in deep](https://book.cakephp.org/phinx/0/en/migrations.html#working-with-indexes).

## Foreign keys

To add foreign keys we can use the `addForeignKey` method, the first argument is the name of the foreign key, the second argument is the name of the related table, and the third argument is the column that refers to the foreign key, the fourth argument is the configuration options.

```php
$table = $this->table("posts");
$table->addColumn('title', 'string', ['limit' => 100]);
$table->addForeignKey('user_id', 'users', 'id', ['delete'=> 'SET_NULL', 'update'=> 'NO_ACTION'])
$table->create();
```

More about foreign keys: [Foreign keys in deep](https://book.cakephp.org/phinx/0/en/migrations.html#working-with-foreign-keys).