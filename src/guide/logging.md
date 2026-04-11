# Logging

## Table of Contents

- [Overview](#overview)
- [Writing Logs](#writing-logs)
- [Channels](#channels)
- [Log Level](#log-level)
- [Environment Examples](#environment-examples)
- [Production Recommendations](#production-recommendations)

## Overview

Phenix uses Monolog for application logs and exposes a `Log` facade for writing PSR-3 log messages.

The default logging channel is configured with `LOG_CHANNEL`. The minimum level written by the logger is configured with `APP_DEBUG_LEVEL`.

## Writing Logs

Use the `Log` facade from application code:

```php
use Phenix\Facades\Log;

Log::debug('Loading profile {id}', ['id' => $userId]);
Log::info('User signed in', ['id' => $userId]);
Log::warning('External service responded slowly', ['service' => 'billing']);
Log::error('Payment failed', ['order_id' => $orderId]);
```

The context array is processed by Monolog, so placeholders in the message can be replaced by matching context values.

## Channels

Phenix ships two logging channels:

| Channel | Description |
| --- | --- |
| `file` | Writes logs to the configured log file. |
| `stream` | Writes logs to stdout. |

Set the channel in your environment:

```dotenv
LOG_CHANNEL=file
```

Use `stream` when the process manager, container runtime, or platform collects stdout:

```dotenv
LOG_CHANNEL=stream
```

## Log Level

`APP_DEBUG_LEVEL` controls the minimum Monolog level that will be written. Lower severity records are ignored.

| Value | Level | Typical use |
| --- | --- | --- |
| `100` | `debug` | Detailed local diagnostics. |
| `200` | `info` | Normal production events. |
| `250` | `notice` | Uncommon but expected events. |
| `300` | `warning` | Problems that do not stop the request. |
| `400` | `error` | Runtime errors that should be investigated. |
| `500` | `critical` | Critical application failures. |
| `550` | `alert` | Immediate action required. |
| `600` | `emergency` | The application is unusable. |

For local development, keep debug logs enabled:

```dotenv
APP_DEBUG=true
APP_DEBUG_LEVEL=100
```

For production, start with info logs:

```dotenv
APP_DEBUG=false
APP_DEBUG_LEVEL=200
```

Applications with high traffic or very noisy logs can raise the value to `300` or `400`.

## Environment Examples

Local development:

```dotenv
APP_ENV=local
APP_DEBUG=true
APP_DEBUG_LEVEL=100
LOG_CHANNEL=file
```

Container production:

```dotenv
APP_ENV=production
APP_DEBUG=false
APP_DEBUG_LEVEL=200
LOG_CHANNEL=stream
```

Server production with file logs:

```dotenv
APP_ENV=production
APP_DEBUG=false
APP_DEBUG_LEVEL=200
LOG_CHANNEL=file
```

## Production Recommendations

- Set `APP_DEBUG=false` so error responses do not expose development details.
- Set `APP_DEBUG_LEVEL=200` for a balanced production baseline.
- Use `APP_DEBUG_LEVEL=300` or higher when log volume is too high.
- Use `LOG_CHANNEL=stream` in containers and managed platforms that collect stdout.
- Use `LOG_CHANNEL=file` only when the host has log rotation and storage permissions configured.
