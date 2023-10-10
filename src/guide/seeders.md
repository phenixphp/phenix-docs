# Database seeders

Phenix seeders are classes that enable developers to populate database tables with predefined or sample data. They are particularly useful for initializing databases with test data during development or for seeding default data into tables upon application installation. This feature helps maintain a consistent database state, simplifies testing, and streamlines the process of setting up database environments for various application scenarios. The seeders are stored in the `database/seeders` folder.

## Writing seeders

To create a seeder, you can use the following command:

```
php phenix make:seeder UsersSeeder
```

A seeder class only has one `run` method, which is called when the `seed:run` command is executed.

```php
<?php

declare(strict_types=1);

use Phenix\Database\Seed;

class UsersSeeder extends Seed
{
    public function run(): void
    {
        // ..
    }
}
```

## Running seeders

To seed your database you can use the Phenix `seed:run` command:

```
php phenix seed:run
```

You can indicate a specific seeder to be executed using the `--seed` option, short for `-s`:

```
php phenix seed:run -s UsersSeeder

php phenix seed:run --seeder=UsersSeeder
```

### Table method

The `table` method receives the name of the table to be seeded as an argument, then the `insert` method receives a collection of records and finally the `saveData` method so that the data is saved.

```php
public function run(): void
{
    $users = $this->table("users");

    $users->insert([
        [
            'name'=> 'Rasmus Ledford',
            'email'=> 'rasmus.ledford@php.net',
        ],
        [
            'name'=> 'Nikita Popov',
            'email'=> 'nikita.popov@php.net',
        ],
    ])->saveData();
}
```

## Faking data

To facilitate the generation of fake data, you can use [Faker](https://fakerphp.github.io/) in the seeders:

```php
public function run(): void
{
    $users = $this->table("users");

    $users->insert([
        [
            'name'=> $this->faker->name,
            'email'=> $this->faker->freeEmail,
        ],
    ])->saveData();
}
```