# Getting started

The best way to learn is by practicing, let's create a basic CRUD using the query builder:

## Create project

This guide assumes that you are using [Visual Studio](https://code.visualstudio.com/) Code as your text editor and Ubuntu as your operating system. If you are a Windows user, it is recommended to use Ubuntu with WSL.

```
composer create-project phenixphp/phenix phenix

// Go to root path
cd phenix

// Open VS Code
code .
```

Edit the database configuration variables to establish a connection in the **.env** file, the default database connection is **mysql**.

```
DB_CONNECTION=mysql
DB_DATABASE=phenix
DB_USERNAME=root
DB_PASSWORD=secret
```

## Create migration
Open a new terminal using the shortcut **Ctrl + \`**, and run a Phenix command.

```
php phenix make:migration CreateUsersTable
```

The command will create a migration on the following path:

```
database/migrations/20230930111521_create_users_table.php
```

Copy and paste the user table structure, it should look like this:

```php
<?php

declare(strict_types=1);

use Phenix\Database\Migration;

class CreateUsersTable extends Migration
{
    public function up(): void
    {
        $table = $this->table("users");
        $table->addColumn('name', 'string', ['limit' => 100]);
        $table->addColumn('email', 'string', ['limit' => 100]);
        $table->create();
    }

    public function down(): void
    {
        $this->table('users')->drop()->save();
    }
}
```

Run the migrations with the following command:

```
php phenix migrate
```

Once the migrations have been run, you will see output like the following:

```
using migration paths
 - /home/obarbosa/php/phenix/database/migrations
using seed paths
using environment default
using database phenix
ordering by creation time

 == 20230930111521 CreateUsersTable: migrating
 == 20230930111521 CreateUsersTable: migrated 0.0141s

All Done. Took 0.0381s
```

## Create user seeder

We need some users created in the database. The command to create the seeder is the following:

```
php phenix make:seeder UsersSeeder
```

Copy the seeder code, it should look like this:

```php
<?php

declare(strict_types=1);

use Phenix\Database\Seed;

class UsersSeeder extends Seed
{
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
}
```

Run the seeder to insert the data:

```
php phenix seed:run
```

When the data has been inserted, you will see a result like the following:

```
using migration paths
 - /home/obarbosa/php/phenix/database/migrations
using seed paths
 - /home/obarbosa/php/phenix/database/seeds
warning no environment specified, defaulting to: default
using database phenix

 == UsersSeeder: seeding
 == UsersSeeder: seeded 0.0234s

All Done. Took 0.0240s
```

## Create controller

Now let's create the user controller to create the CRUD:

```
php phenix make:controller UserController -a
```

The controller will have following content:

```php
<?php

declare(strict_types=1);

namespace App\Http\Controllers;

use Amp\Http\Server\Request;
use Amp\Http\Server\Response;
use Amp\Http\HttpStatus;
use Phenix\Http\Controller;

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

### The index method

This method allows us to obtain all the users created in the database, at this point we have two options: the query brings all the data, or the most optimal and common, paginate the records.  The first step will be to register the user index route in the `routes/api.php` file:

```php
use App\Http\Controllers\UserController;

// ...

Route::get('/users', [UserController::class, 'index']);
```

If you see any similarity with Laravel routes, it's not a coincidence, the elegant syntax inspires us all.

Now let's add code to the index method, the code should look like this:

```php
public function index(Request $request): Response
{
    $users = DB::table('users')->paginate($request->getUri());

    return response()->json($users);
}
```

The first thing to mention is that we inject the **request** into the index method, so the paginator has access to the URL variables to establish which page will be queried and if there are query parameters they will be loaded to the URLs that are generated in the response. To get all the data in the users table just use the `get` method instead `paginate` method.

Open the terminal using the shortcut **Ctrl + Shift + \`**, and run the server.

```
php public/index.php
```

At this point, you can use a client like **Postman** or **Thunder** integrated as a VS Code extension, and send a request to the URL `http://127.0.0.1:1337/users`, the server response should look like the following:

```json
{
    "data": {
        "path": "http://127.0.0.1:1337/users",
        "current_page": 1,
        "last_page": 1,
        "per_page": 15,
        "total": 2,
        "first_page_url": "http://127.0.0.1:1337/users?page=1",
        "last_page_url": "http://127.0.0.1:1337/users?page=1",
        "prev_page_url": null,
        "next_page_url": null,
        "from": 1,
        "to": 2,
        "data": [
            {
                "id": 1,
                "name": "Rasmus Ledford",
                "email": "rasmus.ledford@php.net"
            },
            {
                "id": 2,
                "name": "Nikita Popov",
                "email": "nikita.popov@php.net"
            }
        ],
        "links": [
            {
                "url": "http://127.0.0.1:1337/users?page=1",
                "label": 1
            }
        ]
    }
}
```

### The store method

The store method will allow us to add new users, let's write the code. Corresponding route:

```php
Route::post('/users', [UserController::class, 'store']);
```

Because we are using the query builder, first the insertion is executed and then a query to obtain the inserted record, in later versions the last inserted ID will be obtained, additionally with the use of models this process is totally transparent, the code will be very simple and powerful.

```php
public function store(Request $request): Response
{
    $data = json_decode($request->getBody()->read(), true);

    DB::table('users')->insert($data);

    $user = DB::table('users')
        ->whereEqual('email', $data['email'])
        ->first();

    return response()->json($user, HttpStatus::CREATED);
}
```

Because the routes are loaded at server startup time, it is necessary to restart the server. Press `Ctrl + C` and run the server again:

```shell
php public/index.php
```

Again use your favorite client and send the necessary data to create a user, the response will contain the data of the new record:

```json
{
    "data": {
        "id": 3,
        "name": "John Doe",
        "email": "john.doe@email.com"
    }
}
```

> **Note** <br>
> Hot reloading feature will be added very soon.

### The show method

This method will help us when we want to consult a record by its identifier:

```php
Route::get('/users/{user}', [UserController::class, 'show']);
```

**Remember** that every time we make changes to our code, we must restart the server.

```php
public function show(Request $request): Response
{
    $userId = $this->getAttr($request, 'user');

    $user = DB::table('users')
        ->whereEqual('id', $userId)
        ->first();

    return response()->json($user, HttpStatus::OK);
}
```

The JSON response:

```json
{
    "data": {
        "id": 3,
        "name": "John Doe",
        "email": "john.doe@email.com"
    }
}
```

### The update method

Now let's update the existing records:

```php
Route::patch('/users/{user}', [UserController::class, 'update']);
```

We will only update the **name** for practical purposes.

```php
public function update(Request $request): Response
{
    $userId = $this->getAttr($request, 'user');
    $data = json_decode($request->getBody()->read(), true);

    DB::table('users')
        ->whereEqual('id', $userId)
        ->update(['name' => $data['name']]);

    $user = DB::table('users')
        ->whereEqual('id', $userId)
        ->first();

    return response()->json($user, HttpStatus::OK);
}
```
The client will respond to us with updated data:

```json
{
    "data": {
        "id": 3,
        "name": "John Edison Doe",
        "email": "john.doe@email.com"
    }
}
```

### The delete method

Finally, the method to delete records from the database:

```php
Route::delete('/users/{user}', [UserController::class, 'delete']);
```

The response will be a simple message:

```php
public function delete(Request $request): Response
{
    $userId = $this->getAttr($request, 'user');

    DB::table('users')
        ->whereEqual('id', $userId)
        ->delete();

    return response()->json(['message' => 'Ok'], HttpStatus::OK);
}
```

We have completed this short quick start guide to show fundamental concepts of the framework: routes and controllers, requests, run server. In the following sections, concepts about the architecture of the framework and its characteristics will be deepened.

> **Important** <br>
> If you liked Phenix, and you have seen the potential and the great opportunity we have in the PHP community, I invite you to give it a star on [GitHub](https://github.com/phenixphp/phenix) and contribute to the development of this powerful framework.