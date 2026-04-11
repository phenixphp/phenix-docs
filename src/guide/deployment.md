# Deployment

## Table of Contents

- [Overview](#overview)
- [Production Checklist](#production-checklist)
- [Required Environment Configuration](#required-environment-configuration)
- [Redis Recommendation](#redis-recommendation)
- [Logging Recommendation](#logging-recommendation)
- [Choosing the Server Topology](#choosing-the-server-topology)
- [Deploying on a Server](#deploying-on-a-server)
- [Managing the Server with systemd](#managing-the-server-with-systemd)
- [Deploying with Docker](#deploying-with-docker)
- [Running Background Processes](#running-background-processes)
- [Post-Deployment Tasks](#post-deployment-tasks)
- [Verification Checklist](#verification-checklist)
- [Common Pitfalls](#common-pitfalls)
- [Related Guides](#related-guides)

## Overview

This guide focuses on production-style deployment for Phenix applications. It does not describe the local development workflow.

For production, use the main server entrypoint:

```bash
php public/index.php
```

If you need multiple workers, use cluster mode:

```bash
vendor/bin/cluster public/index.php
```

The `php ./server` command is intended for development and hot reloading. It starts the file watcher and should not be the recommended production entrypoint.

Phenix deployment is controlled by two independent dimensions documented in [Server](./server.md):

- `APP_MODE`: how client metadata is resolved (`direct` or `proxied`)
- `APP_SERVER_MODE`: how the HTTP server process runs (`single` or `cluster`)

These settings are independent. You can run:

- `direct + single`
- `direct + cluster`
- `proxied + single`
- `proxied + cluster`

## Production Checklist

- Set `APP_ENV=production`
- Set `APP_DEBUG=false`
- Set `APP_DEBUG_LEVEL=200` or higher
- Configure `APP_URL`, `APP_PORT`, `APP_MODE`, and `APP_SERVER_MODE`
- Set a valid `APP_KEY`
- Configure database access with `DB_*`
- Configure Redis access with `REDIS_*`
- Prefer Redis for sessions, cache, rate limiting, and queues
- Run `php phenix migrate` when the release includes schema changes
- Run `php phenix view:cache` when the application serves views
- Start the HTTP server with `php public/index.php` or `vendor/bin/cluster public/index.php`
- Start queue workers when queued tasks are used
- Start `php phenix schedule:work` when cron schedules are used

## Required Environment Configuration

At minimum, a production deployment should define the following settings:

```dotenv
APP_ENV=production
APP_DEBUG=false
APP_DEBUG_LEVEL=200
APP_URL=https://example.com
APP_PORT=1337
APP_MODE=proxied
APP_SERVER_MODE=single
APP_KEY=base64:your-generated-key

DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=phenix
DB_USERNAME=phenix
DB_PASSWORD=secret

REDIS_SCHEME=redis
REDIS_HOST=127.0.0.1
REDIS_PORT=6379
REDIS_USERNAME=
REDIS_PASSWORD=
REDIS_DB=0

CACHE_STORE=redis
CACHE_REDIS_CONNECTION=default

RATE_LIMIT_STORE=redis
RATE_LIMIT_REDIS_CONNECTION=default

SESSION_DRIVER=redis
SESSION_CONNECTION=default

QUEUE_DRIVER=redis
REDIS_QUEUE_CONNECTION=default
REDIS_QUEUE=default
```

Notes:

- `APP_MODE=direct` means Phenix receives client traffic directly.
- `APP_MODE=proxied` means traffic arrives through a reverse proxy or load balancer.
- When `APP_MODE=proxied`, `APP_TRUSTED_PROXIES` must resolve to a non-empty array of trusted IPs or CIDRs. Trust only known proxy ranges.
- `APP_TRUSTED_PROXIES` should never be left empty in proxied mode and should not use overly broad ranges.
- `APP_KEY` is required by the crypto services. See [Cryptography](./crypto.md).
- `APP_DEBUG_LEVEL=200` writes `info` and higher logs. Use `300` or `400` for quieter production logging.
- Use the Redis connection override variables only when you need a non-default Redis connection for a subsystem.

## Redis Recommendation

Redis is the recommended production default for the Phenix features that depend on shared state.

- Sessions: `SESSION_DRIVER=redis` keeps session data available across workers and instances.
- Cache: `CACHE_STORE=redis` centralizes cached data instead of keeping it only in memory or on one filesystem.
- Rate limiting: `RATE_LIMIT_STORE=redis` keeps limiter counters consistent across multiple workers or nodes.
- Queues: `QUEUE_DRIVER=redis` provides a shared queue backend for background work.

Redis is not mandatory, but it is the most practical production baseline when the application runs with multiple workers, multiple containers, or multiple hosts.

## Logging Recommendation

Production deployments should disable debug responses and choose a log level that captures operational events without writing local diagnostic noise.

Use this baseline:

```dotenv
APP_DEBUG=false
APP_DEBUG_LEVEL=200
```

`APP_DEBUG_LEVEL=200` records `info`, `notice`, `warning`, `error`, and higher severity messages. For high-volume applications, use `300` to keep warnings and errors, or `400` to keep only errors and higher severity messages.

For containers and managed platforms that collect stdout, prefer:

```dotenv
LOG_CHANNEL=stream
```

For server deployments that write local files, use `LOG_CHANNEL=file` only when log rotation, permissions, and disk usage are managed by the host.

## Choosing the Server Topology

Use this matrix as a quick deployment reference:

| Topology | When to use it | Notes |
| --- | --- | --- |
| `direct + single` | One Phenix process is exposed directly to clients | Small deployments or internal services |
| `direct + cluster` | Multiple Phenix workers are exposed directly to clients | Useful when you want cluster workers without a reverse proxy |
| `proxied + single` | A reverse proxy forwards traffic to one Phenix process | Common when Nginx, HAProxy, or ALB sits in front |
| `proxied + cluster` | A reverse proxy forwards traffic to a clustered Phenix server | Suitable for higher concurrency with trusted forwarding headers |

Operational guidance:

- Choose `direct` only when the Phenix socket is the public entrypoint.
- Choose `proxied` only when the request passes through trusted proxy infrastructure.
- Choose `single` when one server process is enough.
- Choose `cluster` when you want multiple workers through `amphp/cluster`.

## Deploying on a Server

Typical bare-server deployment flow:

1. Install the runtime requirements for the application and ensure Composer is available.
2. Copy the project to the target host.
3. Install dependencies for production:

```bash
composer install --no-dev --optimize-autoloader
```

4. Configure the `.env` file with production values.
5. Ensure `APP_KEY` is present before serving requests.
6. Run database migrations when the release requires them:

```bash
php phenix migrate
```

7. If the application serves views, precompile them:

```bash
php phenix view:cache
```

8. Start the HTTP server.

Single-process mode:

```bash
php public/index.php
```

Cluster mode:

```bash
vendor/bin/cluster public/index.php
```

If you use `APP_MODE=proxied`, make sure `APP_TRUSTED_PROXIES` is configured before boot. Phenix validates trusted proxies in proxied mode and will fail to boot if the list is empty.

## Managing the Server with systemd

On Linux servers that use systemd, you can manage the long-running Phenix HTTP process with a service unit. This is recommended for bare-server deployments because Phenix runs as a persistent CLI server process and should be restarted automatically after a host reboot or process failure.

This section does not apply to Docker containers or managed platforms that already provide process supervision. It also should not use `php ./server`, because that command is intended for local development and hot reloading.

Create a service unit for the HTTP server:

```bash
sudoedit /etc/systemd/system/phenix.service
```

Single-process example:

```ini
[Unit]
Description=Phenix HTTP server
After=network.target

[Service]
WorkingDirectory=/var/www/phenix
EnvironmentFile=/var/www/phenix/.env
ExecStart=/usr/bin/php /var/www/phenix/public/index.php
User=phenix
Restart=always
RestartSec=5
LimitNOFILE=100000

[Install]
WantedBy=multi-user.target
```

Cluster mode uses the cluster binary instead. Make sure `APP_SERVER_MODE=cluster` is set in the environment:

```ini
ExecStart=/var/www/phenix/vendor/bin/cluster /var/www/phenix/public/index.php
```

Adjust `/var/www/phenix`, `/usr/bin/php`, and the `phenix` system user for your host. `LimitNOFILE=100000` is optional, but useful for high-concurrency servers that may keep many network connections open.

After creating or changing the unit, reload systemd and start the service:

```bash
sudo systemctl daemon-reload
sudo systemctl enable phenix.service
sudo systemctl start phenix.service
sudo systemctl status phenix.service
```

Restart the service after deployments that change runtime code:

```bash
sudo systemctl restart phenix.service
```

Queue workers and the scheduler should use separate service units from the HTTP server. For example, `/etc/systemd/system/phenix-queue.service` can use:

```ini
[Unit]
Description=Phenix queue worker
After=network.target

[Service]
WorkingDirectory=/var/www/phenix
EnvironmentFile=/var/www/phenix/.env
ExecStart=/usr/bin/php /var/www/phenix/phenix queue:work
User=phenix
Restart=always
RestartSec=5

[Install]
WantedBy=multi-user.target
```

The scheduler can use the same structure in `/etc/systemd/system/phenix-schedule.service` with:

```ini
ExecStart=/usr/bin/php /var/www/phenix/phenix schedule:work
```

## Deploying with Docker

Phenix ships a production Docker target in `docker/Dockerfile`.

Build the production image:

```bash
docker build --target production -t phenix:prod .
```

Important runtime behavior:

- The production image sets `APP_ENV=production`.
- The production entrypoint is `docker/entrypoint.sh`.
- In production, that entrypoint starts `php public/index.php --host=0.0.0.0 --port="${APP_PORT:-1337}"`.
- The production image does not use `php ./server`.

Expected external services for a typical container deployment:

- database server configured through `DB_*`
- Redis configured through `REDIS_*`
- mail provider configured through `MAIL_*` when the application sends mail

Container recommendations:

- Run the HTTP server container separately from queue workers.
- Run the scheduler separately from the HTTP server container.
- Mount or persist only what your deployment needs; application state for sessions, cache, and queues should prefer Redis instead of local container storage.

## Running Background Processes

If your application uses queues, run queue workers as managed background processes:

```bash
php phenix queue:work
```

If your queued workload uses a named queue, run the worker with the appropriate queue options documented in [Queue](./queues.md).

If your application uses cron schedules, run the schedule worker:

```bash
php phenix schedule:work
```

Keep these processes separate from the main HTTP server process. In Docker-based deployments, run them as separate containers or dedicated managed processes.

## Post-Deployment Tasks

After each release, review the following tasks:

- run `php phenix migrate` when schema changes are included
- run `php phenix view:cache` when the application renders views
- restart the HTTP server if the new release updates runtime code
- restart queue workers if queued task code changed
- restart `schedule:work` if schedule definitions changed
- when using systemd, run `sudo systemctl restart phenix.service` after runtime code changes

## Verification Checklist

- The application boots successfully with `APP_ENV=production`
- `APP_DEBUG` is disabled
- `APP_DEBUG_LEVEL` is set to `200` or higher
- `APP_MODE` matches the real network topology
- `APP_SERVER_MODE` matches the process model you started
- `APP_TRUSTED_PROXIES` is configured when `APP_MODE=proxied`
- Database connectivity works with the configured `DB_*` values
- Redis connectivity works with the configured `REDIS_*` values
- `APP_KEY` is present and valid
- Queue workers are running when `QUEUE_DRIVER` is used
- `schedule:work` is running when cron schedules are defined
- Views are precompiled when production view caching is part of the release
- If systemd manages the process, `sudo systemctl status phenix.service` reports it as active

## Common Pitfalls

- Using `php ./server` in production. That command is for development and hot reloading.
- Setting `APP_MODE=proxied` without configuring `APP_TRUSTED_PROXIES`.
- Trusting overly broad proxy ranges instead of known proxy IPs or CIDRs.
- Using local or file-backed state in multi-instance deployments where Redis would be more appropriate.
- Running background workers inside the same lifecycle as the main HTTP process instead of managing them separately.
- Forgetting to run `php phenix migrate` when the release includes database changes.
- Forgetting to run `php phenix view:cache` for applications that render views in production.

## Related Guides

- [Server](./server.md)
- [Sessions](./sessions.md)
- [Caching](./caching.md)
- [Logging](./logging.md)
- [Queue](./queues.md)
- [Scheduling](./scheduling.md)
- [Views](./views.md)
- [Cryptography](./crypto.md)
