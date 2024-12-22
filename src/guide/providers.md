# Service providers

Service providers play a crucial role in managing and organizing application services within the IoC (Inversion of Control) container. Service providers act as bridges between the application and the container, helping to register and bind various services, dependencies, and configurations. When a service provider is registered in Phenix, it instructs the container on how to resolve and provide instances of classes or services, making it easier to manage and inject dependencies throughout the application. When Phenix bootstraps the application, it will loop through all the registered service providers and add them to the container.

## Writing providers

To create a service provider, you can run the following Phenix command:

```
php phenix make:provider SlackServiceProvider
```

In the `register` method, you can bind services to the container. This means that you are telling the container to create an instance of the service and store it. The `provides` method allows the container to know ahead of time what a service provider provides, allowing for lazy loading. Finally, the `boot` method tells the container the services that should be preloaded when the application starts.

```php
<?php

declare(strict_types=1);

namespace App\Providers;

use Phenix\Providers\ServiceProvider;

class SlackServiceProvider extends ServiceProvider
{
    public function provides(string $id): bool
    {
        $this->provided = [
            // put the registered service keys here
        ];

        return $this->isProvided($id);
    }

    public function register(): void
    {
        // ..
    }

    public function boot(): void
    {
        // ..
    }
}
```

Open the `config/app.php` file, you will see a `providers` array. These are all of the service provider classes that will be loaded for your application. You need to register your service provider in this configuration.

```php
'providers' => [
    // Framework providers
    Phenix\Providers\CommandsServiceProvider::class,
    Phenix\Providers\RouteServiceProvider::class,
    Phenix\Providers\DatabaseServiceProvider::class,
    Phenix\Providers\FilesystemServiceProvider::class,

    // Application providers
    App\Providers\SlackServiceProvider::class,
],
```

## Register services

To register services that will be added to the container, you must register the service identifier in the `provides` method and then bind the classes in the `register` method.

```php
public function provides(string $id): bool
{
    $this->provided = [
        ServiceContract::class,
    ];

    return $this->isProvided($id);
}

public function register(): void
{
    $this->bind(ServiceContract::class, Service::class);
}
```

The `bind` method accepts two arguments. The first argument is the service identifier, and the second argument can be the namespace of the concrete class or an anonymous function that will resolve the service. The identifier can be any text string. If the second argument is not passed to the method, an attempt will be made to resolve the identifier.

## Booting services

In the `boot` method, we add the services that will be loaded early when starting the application. It is not necessary to use the `provides` method.

```php
public function boot(): void
{
    $this->bind(Service::class);
}
```

## Shared objects

All definitions that are only resolved once and return the same instance each time they are resolved are called **shared objects**.

```php
public function provides(string $id): bool
{
    $this->provided = [
        Service::class,
    ];

    return $this->isProvided($id);
}

public function register(): void
{
    $this->bind(Service::class)->setShared(true);
}
```

## Service alias

You can assign aliases to services registered in the container. If the alias is not registered in the `provides` method, it will be ignored by the container.

```php
use League\Container\Argument\ResolvableArgument;

public function provides(string $id): bool
{
    $this->provided = [
        'alias',
        Service::class,
    ];

    return $this->isProvided($id);
}

public function register(): void
{
    $this->bind('alias', new ResolvableArgument(Service::class));
    $this->bind(Service::class);
}
```

## Resolve from container

The `make` method allows obtaining objects from the container in a simple way.

```php
use Phenix\App;

$service = App::make(Service::class);

// Using alias
$alias = App::make('alias');

var_dump($alias instanceof Service); // true
```

More documentation on The PHP League [container](https://container.thephpleague.com/).


