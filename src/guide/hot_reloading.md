# Hot Reloading

## Table of Contents

- [Overview](#overview)
- [Prerequisites](#prerequisites)
- [Usage](#usage)

## Overview

The hot reloading allows developers to automatically restart the server whenever a file change is detected. This feature is particularly useful during development as it ensures that the latest changes are always reflected without the need to manually restart the server.

## Prerequisites

- PHP 8.2 or higher
- Composer
- Node.js and npm

## Usage

To start the server with hot reloading, you can use the Composer command:

```sh
composer run dev
```

This command will execute the `php server` script and start watching for file changes.

### Running the Server Manually

Alternatively, you can manually start the server and the watcher:

```sh
php server
```