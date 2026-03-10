# Translation

## Table of Contents

- [Introduction](#introduction)
- [Language File Structure](#language-file-structure)
- [Basic Translation](#basic-translation)
- [Pluralization](#pluralization)
- [Fallback Locale](#fallback-locale)
- [Runtime Locale Switching](#runtime-locale-switching)
- [Checking Translation Keys](#checking-translation-keys)
- [Use in Views](#use-in-views)
- [Notes and Current Behaviors](#notes-and-current-behaviors)

## Introduction

Phenix provides a translation module through `Phenix\Translation\Translator`. It loads language catalogues from the `lang` directory and offers helper functions plus a facade to retrieve translated lines.

Main entry points:

- helper: `trans(string $key, array $replace = [])`
- helper: `trans_choice(string $key, int $number, array $replace = [])`
- facade: `Phenix\Facades\Translator`

Translation keys use dot notation with the format `group.key` (for example: `users.greeting`).

## Language File Structure

Language files are loaded from:

```txt
lang/{locale}/{group}.php
```

Example:

```php
// lang/en/users.php
<?php

return [
    'greeting' => 'Hello',
    'welcome' => 'Welcome, :name',
    'items' => 'One item|:count items',
];
```

```php
// lang/es/users.php
<?php

return [
    'greeting' => 'Hola',
    'welcome' => 'Bienvenido, :name',
    'items' => 'Un elemento|:count elementos',
];
```

With these files, `users.greeting` resolves from the `users` group.

## Basic Translation

Use the global helper for common cases:

```php
$title = trans('users.greeting');
$welcome = trans('users.welcome', ['name' => 'john']);
```

You can also use the facade directly:

```php
use Phenix\Facades\Translator;

$title = Translator::get('users.greeting');
$spanishTitle = Translator::get('users.greeting', [], 'es');
```

### Placeholder replacement variants

The translator supports three placeholder variants automatically:

- `:name` -> original value
- `:Name` -> `ucfirst(value)`
- `:NAME` -> uppercase value

```php
// lang/en/messages.php
return [
    'hello' => 'Hello :name :Name :NAME',
];

echo trans('messages.hello', ['name' => 'john']);
// Hello john John JOHN
```

## Pluralization

Use pluralization when a line has multiple segments separated by `|`.

Two-segment example:

```php
// lang/en/files.php
return [
    'count' => 'One file|:count files',
];
```

```php
echo trans_choice('files.count', 1); // One file
echo trans_choice('files.count', 3); // 3 files
```

Three-segment example:

```php
// lang/en/apples.php
return [
    'count' => 'No apples|One apple|:count apples',
];
```

```php
echo trans_choice('apples.count', 0); // No apples
echo trans_choice('apples.count', 1); // One apple
echo trans_choice('apples.count', 7); // 7 apples
```

Facade variant:

```php
use Phenix\Facades\Translator;

echo Translator::choice('apples.count', 2);
```

## Fallback Locale

Translator locale configuration is read from `config/app.php`:

```php
return [
    'locale' => 'en',
    'fallback_locale' => 'en',
];
```

If a key is missing in the active locale, Phenix tries the fallback locale automatically.

## Runtime Locale Switching

You can switch locale at runtime using the facade:

```php
use Phenix\Facades\Translator;

Translator::setLocale('es');

$current = Translator::getLocale(); // es
$title = Translator::get('users.greeting'); // Hola
```

You can also pass locale explicitly to `get`/`choice` without changing global locale:

```php
use Phenix\Facades\Translator;

$title = Translator::get('users.greeting', [], 'es');
$count = Translator::choice('users.items', 5, [], 'es');
```

## Checking Translation Keys

Use `has` to check whether a key exists in the active locale or fallback locale:

```php
use Phenix\Facades\Translator;

if (Translator::has('users.greeting')) {
    // key exists
}
```

## Use in Views

Views can use `trans(...)` directly, and custom directives can delegate to the same helper.

## Notes and Current Behaviors

- Missing keys return the key itself (for example, `users.unknown`).
- For pluralization, if `count` is not provided in replacements, the translator injects `count` automatically.
- Catalogue loading scans `lang/{locale}/*.php` group files and only loads files that return arrays.
- If `lang` directory does not exist, translation calls safely return keys.
