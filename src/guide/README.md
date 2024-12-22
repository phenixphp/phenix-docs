# Introduction

I have a dream: high-performance, highly scalable, and very fast applications written in PHP; and since there are now fibers in the core of PHP, I feel that the time is right for this dream to come true.

Phenix is a web framework built on pure PHP, without external extensions, based on the [Amphp](https://amphp.org/) ecosystem, which provides non-blocking operations, asynchronism, and parallel code execution natively. It runs in the PHP SAPI CLI and on its own server; it is simply powerful.

Phenix does not try to compete with other frameworks like Laravel. Laravel is powerful and has a different approach. On the contrary, Phenix is inspired by the simplicity and elegance of Laravel; the philosophy of a beautiful syntax is maintained.

The goal of Phenix is to be a tool for the development of modern and high-concurrency web applications.

## Use cases

Since Phenix has its own web server framework, you can use it to build web services like:

- RESTful API services
- Game servers
- IoT
- Chat systems
- Headless CMS platforms
- Microservices
- Real-time web services

If you wanted to compare it with other frameworks, then think about ExpressJS.

## Performance

One of the most interesting aspects when trying to get to know a new framework is performance, which is why I present a performance test made with Apache Bench version 2.3; for this test, XDebug was disabled:

```
ab -n100000 -c50 -k http://127.0.0.1:1337/

Concurrency Level:      50
Time taken for tests:   14.008 seconds
Complete requests:      100000
Failed requests:        0
Keep-Alive requests:    0
Total transferred:      11500000 bytes
HTML transferred:       1400000 bytes
Requests per second:    7138.61 [#/sec] (mean)
Time per request:       7.004 [ms] (mean)
Time per request:       0.140 [ms] (mean, across all concurrent requests)
Transfer rate:          801.70 [Kbytes/sec] received
```

## The framework name

The name Phenix comes from the union between PHP and Phoenix (PHP + Phoenix = Phenix). Basically, I try to highlight that PHP will never die; it simply resurfaces better and better again and again. Each time it is reborn, it is much better than its previous version.

## Development status

Phenix is in active development, **not production ready**. I hope to release the first stable version very soon.

## Project objective

All basic features built constitute a minimum viable product (MVP), with the objective to obtain the PHP community's support and continue with the framework development. The opportunity offered by the Amphp ecosystem has a lot of potential: asynchronous code, parallelism, and concurrency in PHP.

Let's create amazing applications with the full potential of PHP.