# Installation

## Table of Contents

- [Requirements](#requirements)
- [Composer installation](#composer-installation)
- [Send request](#send-request)

## Requirements

- php:^8.1
- ext-pcntl

Typically, the PCNTL extension is part of the default PHP installation. You can check if the extension is active with the `php -m` command. If it is not listed, you must activate it.

## Composer installation

You must have [Composer](https://getcomposer.org/) installed on your computer. To create your first Phenix project, you can run Composer's **create-project** command.

```
composer create-project phenixphp/phenix phenix
```

After the project has been created, start Phenix's server with the following command:

```
php public/index.php
```

## Send request

Using CURL, you can send a test request:

```
curl http://127.0.0.1:1337
```

The server responds with a default greeting:

```
Hello, world!
```