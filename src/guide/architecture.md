# Architecture

## PHP-FPM

There are several ways to execute a PHP script, the most popular way at the moment is PHP-FPM (FastCGI Process Manager), PHP-FPM is a server API (SAPI) for PHP that is designed to handle the execution of PHP scripts in a highly efficient, FPM has a main process that is responsible for receiving requests through proxied connections, for example from Nginx o Apache with the Event Multi-Processing module, this main process creates and destroys worker processes dynamically, this mechanism allows serving the traffic of a website, each worker bootstraps the application code, then compiles it, executes it and returns the response. FPM works very well, as developers we don't have to worry about memory leaks, it's just that performance is sacrificed a little due to the bootstraping, compilation and execution process.

On the other hand, there are flavors of PHP that allow you to keep the code in memory, such as Swoole, RoadRunner and recently FrankenPHP; Laravel with its Octane package implements Swoole and RoadRunner. The strategy of these flavors is to reduce the loading process by keeping the code in memory, although at this point the specter of memory leaks appears.

### Server API

Server APIs (SAPI) are the types of interface between PHP and the server, SAPIs handle communication between web servers and PHP scripts; some historically known: CGI, Apache (mod_php), FastCGI (PHP-FPM), Embedded, CLI. Phenix is executed in the CLI (Command Line Interfaz) as a long-running process, let's see some advantages of this SAPI.

## CLI SAPI

Scripting languages like Python and JavaScript with Node run their servers in the CLI, if you're wondering why, it's simply that this offers many advantages:

- The interface was designed for command-line execution, making it suitable for scripting and automation tasks.
- Provides direct access to the PHP interpreter for running scripts without the need for a web server.
- Allows for easy debugging and script testing from the command line.
- Script code is kept in memory.
- PHP can now run your own production-ready server.

The Amphp ecosystem leverages the CLI and Fibers to enable asynchronous code writing, concurrent applications, and efficient resource usage. This approach allows to handle a large number of concurrent fibers without wasting CPU resources.

## PHP is weird

[Chris Fidao published a video](https://www.youtube.com/watch?v=ECuD_dGvxyY) in which he explains that the HTTP protocol is naturally stateless, he demonstrated how other languages maintain a state in consecutive requests, effectively PHP like the HTTP protocol remains stateless, but the Amphp server running in the CLI, it allows us to maintain a state like in other programming languages. Is this good or bad for PHP? Obviously good, PHP now has all the flavors and is at the forefront of the most modern languages.

```php
class CounterController extends Controller
{
    protected static int $counter = 0;

    public function index(): Response
    {
        self::$counter++;

        return response()->json([
            'counter' => self::$counter,
        ]);
    }
}
```

Send requests to this controller and watch the counter increment with each request received.

### Coroutine architecture

Amphp uses a fiber-based coroutine architecture to implement asynchronous programming in PHP. Fibers are a lightweight alternative to threads that allow you to write concurrent and parallel code without the overhead of context switching. Amphp uses a single event loop to manage all of the fibers in an application. The event loop is responsible for scheduling fibers, handling I/O events, and managing timers. When a fiber needs to be executed, it is added to the event loop's queue. The event loop then executes the fibers one at a time, in the order that they were added to the queue.

If a fiber needs to wait for something, such as a database query or a network response, it is suspended from the event loop. The event loop then continues executing other fibers until the suspended fiber is ready to resume. When a fiber is resumed, it is added to the end of the event loop's queue. This ensures that all fibers are given an equal amount of time to execute. Amphp also supports cooperative multitasking. This means that a fiber can yield control to another fiber without having to wait for the event loop to schedule it.

## Request lifecycle

The entry point for the application is the `public/index.php` file. In this file, the application is loaded from the `bootstrap/app.php` file, and the server is executed as a long-running process and it is kept in memory, and it won't be bootstrapped for each incoming request.

Within `public/index.php`, the Composer autoloader file is loaded to manage dependencies.

## Service providers

Service providers are responsible for loading different components into the framework such as databases, file system and routes. Phenix uses the [container](https://container.thephpleague.com/) created by PHP League, it is lightweight and powerful. You can look at the service providers that are loaded by default in `config/app.php` file. You can find more information in the [service providers](../guide/providers.md) section.

## Routes

The routes are loaded by the `Phenix\Providers\RouteServiceProvider` from the `routes/api.php` file, this is where you can define and organize your routes. You can find more information in the [routes](../guide/routing.md) section.


