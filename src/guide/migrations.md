# Database Migrations

## Table of Contents

- [Writing Migrations](#writing-migrations)
    - [Running Migrations](#running-migrations)
    - [Rolling Back Migrations](#rolling-back-migrations)
- [Tables](#tables)
    - [Creating and Updating Tables](#creating-and-updating-tables)
    - [Table Options](#table-options)
    - [Checking if Table Exists](#checking-if-table-exists)
    - [Dropping Tables](#dropping-tables)
    - [Renaming Tables](#renaming-tables)
- [Columns](#columns)
    - [Fluent Column Syntax](#fluent-column-syntax)
    - [Convenience Helpers](#convenience-helpers)
    - [Column Types](#column-types)
    - [Column Modifiers](#column-modifiers)
    - [Checking if Column Exists](#checking-if-column-exists)
    - [Renaming a Column](#renaming-a-column)
    - [Adding Column After Another](#adding-column-after-another)
    - [Dropping a Column](#dropping-a-column)
- [Indexes](#indexes)
- [Foreign Keys](#foreign-keys)
- [Compatibility Note](#compatibility-note)

Migrations add versioning to database changes over time. The migration system implemented in Phenix is based on [Phinx](https://phinx.org/), and migrations extend `Phenix\Database\Migration`.

In Phenix, `Migration::table()` returns `Phenix\Database\Migrations\Table`, which includes fluent builders for columns and foreign keys.

## Writing Migrations

To create a migration, run:

```bash
php phenix make:migration CreateUserTable
```

The migration class extends `Phenix\Database\Migration`:

```php
<?php

declare(strict_types=1);

use Phenix\Database\Migration;

class CreateUsersTable extends Migration
{
    public function up(): void
    {
        // ...
    }

    public function down(): void
    {
        // ...
    }
}
```

Use `up()` to apply changes and `down()` to revert them.

### Running Migrations

```bash
php phenix migrate
```

### Rolling Back Migrations

```bash
php phenix migrate:rollback
```

Roll back to a specific version:

```bash
php phenix migrate:rollback -t 20231006144210
```

## Tables

### Creating and Updating Tables

Use `table()` to get a fluent `Table` instance. Define columns and then call `create()`, `update()`, or `save()`.

```php
public function up(): void
{
    $table = $this->table('users');

    $table->id();
    $table->string('name', 100);
    $table->string('email', 150)->unique();
    $table->timestamps();

    $table->create();
}
```

> **Important**: Explicit `create()`, `update()`, or `save()` is recommended for clarity.

### Table Options

The second argument of `table($name, $options)` is an associative options array.

| Option      | Values                     |
|-------------|----------------------------|
| primary_key | `array`, `string`, `false` |
| engine      | e.g. `InnoDB` (MySQL)      |
| collation   | e.g. `utf8mb4_unicode_ci`  |
| signed      | `true`, `false`            |

Example with custom primary key:

```php
$table = $this->table('personal_access_tokens', ['id' => false, 'primary_key' => 'id']);
$table->uuid('id');
$table->create();
```

### Checking if Table Exists

```php
public function up(): void
{
    if (! $this->hasTable('users')) {
        $table = $this->table('users');
        $table->string('name', 100);
        $table->create();
    }
}
```

### Dropping Tables

```php
public function down(): void
{
    $this->table('users')->drop()->save();
}
```

### Renaming Tables

```php
$this->table('users')
    ->rename('legacy_users')
    ->update();
```

## Columns

### Fluent Column Syntax

Phenix exposes fluent methods directly on `Table`:

```php
$table = $this->table('users');

$table->string('name', 100)->comment('User name');
$table->integer('age')->default(0);
$table->boolean('is_active')->default(true);

$table->create();
```

### Convenience Helpers

- `id(string $name = 'id')`: unsigned big integer with identity.
- `timestamps(bool $timezone = false)`: adds `created_at` and `updated_at` timestamp columns.

```php
$table = $this->table('posts');

$table->id();
$table->string('title');
$table->timestamps();

$table->create();
```

### Column Types

#### Text and character

- `string($name, int $limit = 255)`
- `text($name, ?int $limit = null)`
- `char($name, int $limit = 255)`
- `uuid($name)`
- `ulid($name)`

```php
$table->string('title', 150);
$table->text('content')->nullable();
$table->char('country_code', 2);
$table->uuid('external_id');
$table->ulid('public_id');
```

#### Numeric

- `integer($name, ?int $limit = null, bool $identity = false)`
- `bigInteger($name, bool $identity = false)`
- `smallInteger($name, bool $identity = false)`
- `unsignedInteger($name, ?int $limit = null, bool $identity = false)`
- `unsignedBigInteger($name, bool $identity = false)`
- `unsignedSmallInteger($name, bool $identity = false)`
- `decimal($name, int $precision = 10, int $scale = 2)`
- `unsignedDecimal($name, int $precision = 10, int $scale = 2)`
- `float($name)`
- `unsignedFloat($name)`
- `double($name, bool $signed = true)`

```php
$table->unsignedBigInteger('user_id');
$table->decimal('price', 10, 2)->default(0.00);
$table->double('ratio')->default(1.0);
```

#### Date and time

- `date($name)`
- `dateTime($name)`
- `time($name, bool $timezone = false)`
- `timestamp($name, bool $timezone = false)`
- `interval($name)` (PostgreSQL)

```php
$table->date('published_on');
$table->dateTime('published_at')->nullable();
$table->timestamp('created_at')->currentTimestamp();
$table->timestamp('updated_at')->nullable()->onUpdateCurrentTimestamp();
```

#### Special and structured

- `boolean($name)`
- `json($name)`
- `jsonb($name)` (PostgreSQL)
- `enum($name, array $values)`
- `set($name, array $values)`

```php
$table->boolean('is_published')->default(false);
$table->json('metadata')->nullable();
$table->enum('status', ['draft', 'published'])->default('draft');
```

#### Binary and network

- `binary($name, ?int $limit = null)`
- `blob($name, ?int $limit = null)`
- `bit($name, int $limit = 1)`
- `inet($name)` (PostgreSQL)
- `cidr($name)` (PostgreSQL)
- `macaddr($name)` (PostgreSQL)

```php
$table->blob('payload')->nullable();
$table->bit('flags', 8)->default(0);
$table->inet('ip_address')->nullable();
```

### Column Modifiers

Common modifiers available in fluent builders:

- `nullable()`
- `comment(string $comment)`
- `default(...)` (typed by column)
- `limit(int $limit)` / `length(int $length)`
- `after(string $column)`
- `first()`
- `unique()`

Additional modifiers by column category:

- Numeric sign and identity: `signed()`, `unsigned()`, `identity()`
- Decimal precision: `precision(int)`, `scale(int)`
- Timestamps: `currentTimestamp()`, `onUpdateCurrentTimestamp()`, `update(string)`
- Timezone-related: `timezone(bool)` or `withTimezone(bool)` depending on type
- Enum/set values: `values(array $values)`
- Foreign key builder options: see [Foreign Keys](#foreign-keys)

```php
$table->string('email')->unique();
$table->string('nickname')->nullable()->after('email');
$table->unsignedInteger('visits')->default(0);
$table->timestamp('updated_at')->onUpdateCurrentTimestamp();
```

Adapter notes:

- `first()` is meaningful for MySQL column positioning.
- `deferrable()` in foreign keys is PostgreSQL-only.
- `enum`/`set` use `string` fallback in SQLite.

### Checking if Column Exists

```php
$table = $this->table('users');

if ($table->hasColumn('username')) {
    // ...
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
$table->string('city', 100)->after('email');
$table->update();
```

### Dropping a Column

```php
$this->table('users')
    ->removeColumn('nickname')
    ->save();
```

## Indexes

Use `addIndex()` for explicit indexes:

```php
$table = $this->table('users');

$table->string('email', 150);
$table->unsignedInteger('tenant_id');

$table->addIndex(['email'], ['unique' => true]);
$table->addIndex(['tenant_id', 'email'], ['name' => 'idx_users_tenant_email']);

$table->create();
```

You can also create a unique single-column index with `->unique()`:

```php
$table->string('username')->unique();
```

## Foreign Keys

Phenix supports both direct and fluent APIs.

Direct API:

```php
use Phenix\Database\Constants\ColumnAction;

$table = $this->table('posts');

$table->unsignedBigInteger('user_id');
$table->foreignKey('user_id', 'users', 'id', [
    'delete' => ColumnAction::CASCADE->value,
    'update' => ColumnAction::NO_ACTION->value,
]);

$table->create();
```

Fluent API:

```php
use Phenix\Database\Constants\ColumnAction;

$table = $this->table('posts');

$table->unsignedBigInteger('author_id');
$table->foreign('author_id')
    ->references('id')
    ->on('users')
    ->onDelete(ColumnAction::SET_NULL)
    ->onUpdate(ColumnAction::RESTRICT)
    ->constraint('fk_posts_author_id');

$table->create();
```

Composite keys are supported in fluent style:

```php
$table->foreign(['user_id', 'role_id'])
    ->references(['user_id', 'role_id'])
    ->on('user_roles');
```

PostgreSQL deferrable example:

```php
$table->foreign('user_id')
    ->references('id')
    ->on('users')
    ->deferrable('IMMEDIATE');
```

## Compatibility Note

`addColumn(...)` from Phinx is still available when you need low-level control, but Phenix documentation recommends fluent migration builders as the default style.
