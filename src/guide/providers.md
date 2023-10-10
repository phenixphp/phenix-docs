# Service providers

Service providers play a crucial role in managing and organizing application services within the IoC (Inversion of Control) container. Service providers act as bridges between the application and the container, helping to register and bind various services, dependencies, and configurations. When a service provider is registered in Phenix, it instructs the container on how to resolve and provide instances of classes or services, making it easier to manage and inject dependencies throughout the application. When Phenix bootstraps the application, it will loop through all the registered service providers and add them to the container.

If you open the `config/app.php` file, you will see a `providers` array. These are all of the service provider classes that will be loaded for your application. In a few days a command will be available to create custom service providers, in any case, below we will explain everything about service providers.

```php
<?php

declare(strict_types=1);

namespace App\Providers;

use Phenix\Providers\ServiceProvider;

class SlackServiceProvider extends ServiceProvider
{
    public function provides(): bool
    {
        // ..
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

In the `register` method, you can bind services to the container. This means that you are telling to the container to create an instance of the service and store it. The `provides` method allows the container to know ahead of time what a service provider provides, allowing for lazy loading. Finally, the `boot` method tells the container the services that should be preloaded when the application starts.

