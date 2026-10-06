# Server

## Table of Contents

- [Overview](#overview)
- [App Mode](#app-mode)
- [Proxied Mode and Trusted Proxies](#proxied-mode-and-trusted-proxies)
- [Server Runtime Mode](#server-runtime-mode)
- [Running in Single Process](#running-in-single-process)
- [Running in Cluster Mode](#running-in-cluster-mode)
- [Protocol and TLS Detection](#protocol-and-tls-detection)
- [Configuration Reference](#configuration-reference)
- [Notes and Current Behaviors](#notes-and-current-behaviors)

## Overview

Phenix runtime behavior is controlled by two independent configuration dimensions:

- **App Mode** (`direct` or `proxied`): controls how client connection metadata is resolved.
- **Server runtime mode** (`single` or `cluster`): controls process model and worker execution.

The public application URL is independent from the socket exposed by the
server. `APP_URL` is the canonical URL used to generate links and cookie
domains. `APP_HOST` and `APP_PORT` select the local listening address and do
not alter the canonical URL.

These are configured in `config/app.php`:

```php
'app_mode' => env('APP_MODE', static fn (): string => 'direct'),
'trusted_proxies' => env('APP_TRUSTED_PROXIES', static fn (): array => []),
'server_mode' => env('APP_SERVER_MODE', static fn (): string => 'single'),
'url' => env('APP_URL', static fn (): string => 'http://127.0.0.1:1337'),
'host' => env('APP_HOST', static fn (): string => '127.0.0.1'),
'port' => env('APP_PORT', static fn (): int => 1337),
```

For CORS configuration, see [CORS (`HandleCors`)](middlewares.md#cors-handlecors) in the Middlewares guide.

## App Mode

`app.app_mode` supports:

- `direct` (`AppMode::DIRECT`): server is exposed directly to clients.
- `proxied` (`AppMode::PROXIED`): server is behind a reverse proxy/load balancer and trusts forwarding headers from configured proxies.

Use `direct` when the Phenix process receives traffic directly.
Use `proxied` when requests come through Nginx, HAProxy, ALB, or similar infrastructure.

## Proxied Mode and Trusted Proxies

When `app_mode` is `proxied`, `app.trusted_proxies` must be a non-empty array of trusted IPs or CIDRs.

If `trusted_proxies` is empty, server boot fails with a `RuntimeError`:

```txt
Trusted proxies must be an array of IP addresses or CIDRs.
```

Example configuration:

```php
'app_mode' => 'proxied',
'trusted_proxies' => ['127.0.0.1/32', '10.0.0.0/8'],
```

Security guidance: trust only known proxy IP ranges. Do not use broad or unknown ranges.

## Server Runtime Mode

`app.server_mode` supports:

- `single` (`ServerMode::SINGLE`): one server process.
- `cluster` (`ServerMode::CLUSTER`): multiple workers via `amphp/cluster`.

In cluster mode, the app uses cluster termination flow (`Cluster::awaitTermination()`).  
In non-cluster mode, the app uses signal trapping (`SIGHUP`, `SIGINT`, `SIGQUIT`, `SIGTERM`) for graceful stop.

## Running in Single Process

Default behavior:

```bash
php public/index.php
```

## Running in Cluster Mode

To run with worker processes:

```ini
APP_SERVER_MODE=cluster
```

Then, execute cluster:

```bash
vendor/bin/cluster public/index.php
```

Optional worker count:

```bash
vendor/bin/cluster -w 4 public/index.php
```

You can inspect additional options with:

```bash
vendor/bin/cluster --help
```

## Protocol and TLS Detection

The protocol of the local listener is detected using `app.cert_path`:

- `Protocol::HTTPS` is used when `app.cert_path` contains a certificate path.
- Otherwise, the local listener uses HTTP, even when the public `APP_URL` is
  HTTPS because a trusted reverse proxy terminates TLS.

TLS example:

```php
'url' => 'https://example.com',
'host' => '0.0.0.0',
'port' => 1337,
'cert_path' => base_path('certs/server.pem'),
```

## Configuration Reference

| Key | Type | Values / Meaning |
| --- | --- | --- |
| `app.app_mode` | `string` | `direct` \| `proxied` |
| `app.trusted_proxies` | `array<string>` | Trusted proxy IPs/CIDRs (required when `proxied`) |
| `app.server_mode` | `string` | `single` \| `cluster` |
| `app.url` | `string` | Canonical public URL, including a non-standard public port when needed |
| `app.host` | `string` | Local interface where the HTTP server listens; it is not used to generate URLs |
| `app.port` | `int` | Local port where the HTTP server listens; it is not appended to `app.url` |
| `app.cert_path` | `string \| null` | TLS certificate path used for HTTPS |

## Notes and Current Behaviors

- Invalid `app_mode` values fall back to `direct`.
- Invalid `server_mode` values fall back to `single`.
- Trusted proxies validation is applied in both single and cluster servers when `app_mode=proxied`.
- Cluster mode and app mode are independent. You can run `cluster + direct` or `cluster + proxied`.
- `APP_URL`, `APP_HOST`, and `APP_PORT` are independent. For example, an
  application can publish `https://api.example.com` while listening internally
  on `0.0.0.0:1337`.
