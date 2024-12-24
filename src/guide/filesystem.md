# Filesystem

## Table of Contents

- [Read](#read)
- [Write](#write)
- [Exists](#exists)
- [Checking the Type](#checking-the-type)
    - [Directories](#directories)
    - [Files](#files)
- [Make Directories](#make-directories)
- [Open Files](#open-files)

Phenix provides the `Phenix\Facades\File` facade, which is based on the [File](https://amphp.org/file) package. It provides an abstraction layer and non-blocking file access solution that keeps your application responsive.

## Read

You can read a file using the `read` method, which takes the file path as an argument.

```php
use Phenix\Facades\File;

File::read('path/to/file.txt');
```

## Write

To write to files, use the `put` method. The first argument is the file path, and the second argument is the content to write.

```php
use Phenix\Facades\File;

File::put('path/to/file.txt', 'Amphp is amazing');
```

## Exists

The `exists` method allows you to check if a file or directory exists and returns a boolean value.

```php
use Phenix\Facades\File;

File::exists('path/to/file.txt');
```

## Checking the Type

### Directories

You can check if a path corresponds to a directory.

```php
use Phenix\Facades\File;

File::isDirectory('path/to/dir');
```

### Files

Likewise, you can check if a path corresponds to a file:

```php
use Phenix\Facades\File;

File::isFile('path/to/file.txt');
```

## Make Directories

The `createDirectory` method allows the creation of directories at the specified path. Additionally, you can indicate the permissions to be assigned in the second argument. By default, the mode is **0755**.

```php
use Phenix\Facades\File;

File::createDirectory('path/to/dir');
```

## Open Files

Finally, the `openFile` method returns an instance of the `Amp\File\File` class. The second argument corresponds to the file opening mode, which defaults to `w`. The same modes used by the native PHP function [fopen](https://www.php.net/manual/en/function.fopen.php) are applicable. This function should not be used in the Phenix framework.

```php
use Phenix\Facades\File;

$file = File::openFile('path/to/file.txt', 'r');
```

Methods provided by the `Amp\File\File` class: `read`, `seek`, `tell`, `eof`, `isSeekable`, `getPath`, `getMode`, `truncate`.