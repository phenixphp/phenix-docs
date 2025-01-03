# Query Builder

## Table of Contents

- [Running Queries](#running-queries)
- [Select Queries](#select-queries)
    - [Query Single Row](#query-single-row)
    - [Pagination](#pagination)
    - [Select Statements](#select-statements)
    - [Functions in Select Statement](#functions-in-select-statement)
        - [Case Function](#case-function)
    - [Select from Subquery](#select-from-subquery)
    - [Select Subquery as Column](#select-subquery-as-column)
    - [Column Alias](#column-alias)
- [Count Records](#count-records)
- [Exists Clause](#exists-clause)
- [Where Clauses](#where-clauses)
    - [In and Not In](#in-and-not-in)
    - [Null and Not Null](#null-and-not-null)
    - [Boolean Columns](#boolean-columns)
    - [Between Ranges](#between-ranges)
    - [Where Exists](#where-exists)
    - [Where Dates](#where-dates)
        - [Months](#months)
        - [Years](#years)
    - [Where Rows](#where-rows)
- [Limit Query](#limit-query)
- [Ordering Rows](#ordering-rows)
- [Grouping Columns](#grouping-columns)
- [Joins](#joins)
- [Having Clause](#having-clause)
- [Insert Statement](#insert-statement)
- [Update Records](#update-records)
- [Delete Records](#delete-records)

A query builder is a programming interface or library that allows developers to build and manipulate database queries using a fluent and programmatic syntax rather than writing raw SQL statements. It provides a more intuitive and structured way to construct database queries in a language-specific manner, making it easier to work with databases in applications.

## Running Queries

Phenix provides a facade called `Phenix\Facades\DB`, which offers utility methods for constructing database queries.

```php
<?php

declare(strict_types=1);

namespace App\Http\Controllers;

use Amp\Http\Server\Response;
use Phenix\Facades\DB;
use Phenix\Http\Controller;

class UserController extends Controller
{
    public function index(): Response
    {
        $users = DB::table('users')->get();

        return response()->json($users);
    }
}
```

The `get` method returns a `Phenix\Data\Collection` instance containing a list of associative arrays.

## Select Queries

### Query Single Row

You can retrieve a specific record from the database using the `first` method, which will return an associative array if a match is found.

```php
use Phenix\Facades\DB;

$user = DB::table('users')->whereEqual('email', 'john.doe@email.com')->first();

echo $user['name'] . PHP_EOL;
```

### Pagination

Database pagination allows web applications to split a large dataset into smaller, more manageable chunks or pages for display to users. It enables efficient navigation through a potentially extensive set of database records. Instead of loading all records at once, pagination retrieves and displays a portion of the data, typically a fixed number of records per page.

```php
use Amp\Http\Server\Request;
use Amp\Http\Server\Response;
use Phenix\Facades\DB;

public function index(Request $request): Response
{
    $users = DB::table('users')->paginate($request->getUri());

    return response()->json($users);
}
```

The `paginate` method receives a `League\Uri\Http` instance of the `Amp\Http\Server\Request` class, which contains the query strings and the path of the URL. The pagination structure is as follows:

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

### Select Statements

By default, queries are generated using the asterisk (*) placeholder. You can specify the columns to select using the `select` method:

```php
use Phenix\Facades\DB;

$users = DB::table('users')->select(['id', 'name', 'email'])->get();

foreach ($users as $user) {
    echo $user['name'] . PHP_EOL;
}
```

### Functions in Select Statement

You can use SQL functions in the `select` method:

```php
use Phenix\Database\Functions;

$product = DB::select([Functions::avg('price')->as('average_price')])
    ->from('products')
    ->first();

echo $product['average_price'] . PHP_EOL;
```

The available methods of the `Phenix\Database\Functions` class are: `avg`, `sum`, `min`, `max`, `count`, `date`, `month`, `year`, `case`.

#### Case Function

Case is an important utility for obtaining values under conditions:

```php
use Phenix\Database\Functions;

$case = Functions::case()
    ->whenGreaterThan('price', 100, 'expensive')
    ->defaultResult('cheap')
    ->as('type');

$products = DB::select([
        'id',
        'description',
        $case,
    ])
    ->from('products')
    ->get();
```

### Select from Subquery

You can select fields from a subquery:

```php
use Phenix\Database\Subquery;

$users = DB::select(['id', 'name', 'email'])
    ->from(function (Subquery $subquery) {
        $subquery->from('users')
            ->select(['id', 'name', 'email'])
            ->whereEqual('verified_at', date('Y-m-d'));
    })->get();
```

### Select Subquery as Column

You can create a subquery and select it as a column in the main query:

```php
use Phenix\Database\Subquery;

$user = DB::select([
        'id',
        'name',
        Subquery::make()->select(['name'])
            ->from('countries')
            ->whereColumn('users.country_id', 'countries.id')
            ->as('country_name')
            ->limit(1),
    ])
    ->from('users')
    ->get();
```

### Column Alias

You can assign aliases to selected columns:

```php
use Phenix\Database\Alias;

$users = DB::select([
        'id',
        Alias::of('name')->as('full_name'),
    ])
    ->from('users')
    ->get();
```

## Count Records

The `count` method allows you to count the records in a table. You can apply clauses to adjust the row count or indicate a column to count.

```php
$count = DB::from('products')->count();

$count = DB::from('products')->whereGreaterThan('price', 100)->count();
```

## Exists Clause

To check the existence of a record in the database, you can use the `exists` and `doesntExist` methods:

```php
$exists = DB::from('products')->whereEqual('id', 1)->exists();

$doesntExist = DB::from('products')->whereEqual('id', 1)->doesntExist();
```

## Where Clauses

The where clauses are used to filter the results of a query. They allow you to specify conditions that the results must meet in order to be returned.

```php
$users = DB::from('users')->whereDistinct('id', 1)->get();
```

Simple comparison methods are: `whereEqual`, `whereDistinct`, `whereGreaterThan`, `whereGreaterThanOrEqual`, `whereLessThan`, `whereLessThanOrEqual`.

`ANY`, `ALL`, and `SOME` clause methods: `whereAnyEqual`, `whereAnyDistinct`, `whereAnyGreaterThan`, `whereAnyGreaterThanOrEqual`, `whereAnyLessThan`, `whereAnyLessThanOrEqual`, `whereAllEqual`, `whereAllDistinct`, `whereAllGreaterThan`, `whereAllGreaterThanOrEqual`, `whereAllLessThan`, `whereAllLessThanOrEqual`, `whereSomeEqual`, `whereSomeDistinct`, `whereSomeGreaterThan`, `whereSomeGreaterThanOrEqual`, `whereSomeLessThan`, `whereSomeLessThanOrEqual`.

You can chain conditions with the `OR` operator:

```php
$users = DB::from('users')
    ->whereDistinct('id', 1)
    ->orWhereEqual('role', 'contributor')
    ->get();
```

Methods corresponding to the `OR` operator: `orWhereEqual`, `orWhereDistinct`, `orWhereGreaterThan`, `orWhereGreaterThanOrEqual`, `orWhereLessThan`, `orWhereLessThanOrEqual`.

### In and Not In

You can add a clause that matches a set of values:

```php
$users = DB::table('users')->whereIn('id', [1, 2, 3])->get();

$users = DB::table('users')->whereNotIn('id', [1, 2, 3])->get();
```

These methods also accept a subquery instead of a set of values.

```php
use Phenix\Database\Subquery;

$users = DB::table('users')
    ->whereIn('id', function (Subquery $query) {
        $query->select(['id'])
            ->from('users')
            ->whereGreaterThanOrEqual('created_at', date('Y-m-d'));
    })->get();
```

Methods corresponding to the `OR` operator: `orWhereIn`, `orWhereNotIn`.

### Null and Not Null

You can query records when columns are null or non-null:

```php
$users = DB::table('users')->whereNull('verified_at')->get();

$users = DB::table('users')->whereNotNull('verified_at')->get();
```

Methods corresponding to the `OR` operator: `orWhereNull`, `orWhereNotNull`.

### Boolean Columns

You can query records by true or false columns:

```php
$users = DB::table('users')->whereTrue('enabled')->get();

$users = DB::table('users')->whereFalse('enabled')->get();
```

Methods corresponding to the `OR` operator: `orWhereTrue`, `orWhereFalse`.

### Between Ranges

You can query records between value ranges:

```php
$users = DB::table('users')
    ->whereBetween('age', [20, 30])
    ->get();

$users = DB::table('users')
    ->whereNotBetween('age', [20, 30])
    ->get();
```

Methods corresponding to the `OR` operator: `orWhereBetween`, `orWhereNotBetween`.

### Where Exists

You can query records by adding an existence clause with a subquery using the `whereExists` and `whereNotExists` methods.

```php
$users = DB::table('users')
    ->whereExists(function (Subquery $query) {
        $query->table('user_role')
            ->whereEqual('user_id', 1)
            ->whereEqual('role_id', 9)
            ->limit(1);
    })
    ->get();
```

Methods corresponding to the `OR` operator: `orWhereExists`, `orWhereNotExists`.

### Where Dates

You can query records by dates, and date and time. The available methods are: `whereDateEqual`, `whereDateGreaterThan`, `whereDateGreaterThanOrEqual`, `whereDateLessThan`, `whereDateLessThanOrEqual`.

```php
$users = DB::table('users')
    ->whereDateEqual('created_at', date('Y-m-d'))
    ->get();
```

Methods corresponding to the `OR` operator: `orWhereDateEqual`, `orWhereDateGreaterThan`, `orWhereDateGreaterThanOrEqual`, `orWhereDateLessThan`, `orWhereDateLessThanOrEqual`.

#### Months

Methods available to work with months:

`whereMonthEqual`, `whereMonthGreaterThan`, `whereMonthGreaterThanOrEqual`, `whereMonthLessThan`, `whereMonthLessThanOrEqual`, `orWhereMonthEqual`, `orWhereMonthGreaterThan`, `orWhereMonthGreaterThanOrEqual`, `orWhereMonthLessThan`, `orWhereMonthLessThanOrEqual`.

#### Years

Methods available to work with years:

`whereYearEqual`, `whereYearGreaterThan`, `whereYearGreaterThanOrEqual`, `whereYearLessThan`, `whereYearLessThanOrEqual`, `orWhereYearEqual`, `orWhereYearGreaterThan`, `orWhereYearGreaterThanOrEqual`, `orWhereYearLessThan`, `orWhereYearLessThanOrEqual`.

### Where Rows

You can query records by comparing table columns using some of the following methods: `whereRowEqual`, `whereRowDistinct`, `whereRowGreaterThan`, `whereRowGreaterThanOrEqual`, `whereRowLessThan`, `whereRowLessThanOrEqual`, `whereRowIn`, `whereRowNotIn`.

```php
$users = DB::table('employees')
    ->whereRowEqual(['manager_id', 'department_id'], function (Subquery $subquery) {
        $subquery->select(['id', 'department_id'])
            ->from('managers')
            ->whereEqual('location_id', 1);
    })
    ->select(['name'])
    ->get();
```

## Limit Query

You can generate queries to limit the number of rows to obtain.

```php
$users = DB::table('users')
    ->whereEqual('id', 1)
    ->limit(1)
    ->get();
```

## Ordering Rows

You can order the result of the query using the `orderBy` method. The first argument is the column by which the sorting will be done, and the second argument indicates the direction using the `Phenix\Database\Constants\Order` enumeration.

```php
use Phenix\Database\Constants\Order;

$users = DB::table('users')
    ->orderBy('id', Order::DESC)
    ->get();
```

## Grouping Columns

The `groupBy` method allows grouping rows in a table based on the values in one or more columns. It is often used with aggregate functions such as `COUNT`, `SUM`, `AVG`, `MAX`, and `MIN` to summarize the data in each group. This method accepts arguments of type `string`, `array`, or `Phenix\Database\Functions`.

```php
use Phenix\Database\Join;

$users = DB::select([
        'location_id',
        'category_id',
        'categories.description',
    ])
    ->from('products')
    ->leftJoin('categories', function (Join $join) {
        $join->onEqual('products.category_id', 'categories.id');
    })
    ->groupBy('category_id')
    ->orderBy('id')
    ->get();
```

## Joins

Join clauses are used to combine rows from two or more tables based on a common field between them. Joins are one of the most powerful features and can be used to create complex queries that would not be possible otherwise. Supported join methods are: `innerJoin`, `leftJoin`, `leftOuterJoin`, `rightJoin`, `rightOuterJoin`, `crossJoin`.

```php
use Phenix\Database\Join;

$users = DB::select([
        'products.id',
        'products.description',
        'categories.description',
    ])
    ->from('products')
    ->innerJoin('categories', function (Join $join) {
        $join->onEqual('products.category_id', 'categories.id');
    })
    ->get();
```

The `Phenix\Database\Join` class has methods like `onEqual`, `orOnEqual`, `onDistinct`, `orOnDistinct` in addition to the **where** methods seen previously.

Joins can also be constructed using a short syntax with the following methods: `innerJoinOnEqual`, `leftJoinOnEqual`, `rightJoinOnEqual`.

```php
use Phenix\Database\Join;

$users = DB::select([
        'products.id',
        'products.description',
        'categories.description',
    ])
    ->from('products')
    ->innerJoinOnEqual('categories', 'products.category_id', 'categories.id')
    ->get();
```

## Having Clause

The `HAVING` clause is used to filter rows in the result set of a query that has been grouped using the `GROUP BY` clause. While the `WHERE` clause filters individual rows before they are grouped, the `HAVING` clause filters the grouped rows based on specified conditions. It is typically used in conjunction with aggregate functions like `SUM`, `COUNT`, `AVG`, etc., to filter and retrieve summary data that meets specific criteria. The `HAVING` clause allows you to apply conditions to the grouped data, helping to refine query results and perform operations on aggregated values, making it a valuable tool for data analysis and reporting.

```php
use Phenix\Database\Functions;
use Phenix\Database\Having;
use Phenix\Database\Join;

$users = DB::select([
        Functions::count('products.id')->as('identifiers'),
        'products.category_id',
        'categories.description',
    ])
    ->from('products')
    ->leftJoin('categories', function (Join $join) {
        $join->onEqual('products.category_id', 'categories.id');
    })
    ->groupBy('products.category_id')
    ->having(function (Having $having): void {
        $having->whereGreaterThan('identifiers', 5)
            ->whereGreaterThan('products.category_id', 10);
    })
    ->get();
```

The `Phenix\Database\Having` class extends from `Phenix\Database\Clause`, therefore it has all the **where** methods seen previously.

## Insert Statement

The `insert` method allows you to create new records in the database. You can insert one or many records.

```php
DB::table('users')
    ->insert([
        'name' => 'John Doe',
        'email' => 'john.doe@email.com',
    ]);

DB::table('users')
    ->insert([
        [
            'name' => 'John Doe',
            'email' => 'john.doe@email.com',
        ],
        [
            'name' => 'Tony Stark',
            'email' => 'tony.stark@email.com',
        ],
    ]);
```

The following methods will be implemented soon: `insertOrIgnore`, `upsert`, `insertFrom`.

## Update Records

To update existing records in the database, you can use the `update` method.

```php
DB::table('users')
    ->whereEqual('id', 1)
    ->update(['name' => 'John Edison Doe']);
```

## Delete Records

Finally, to delete records from the database, you can use the `delete` method. Remember to add clauses when deleting records.

```php
DB::table('users')->whereEqual('id', 1)->delete();
```