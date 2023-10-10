# Filesystem

Phenix provides the `Phenix\Facades\File` facade, which is based on the [File](https://amphp.org/file) package, it provides an abstraction layer and non-blocking file access solution that keeps your application responsive.

## Read

You can read a file using the `get` method, which takes the file path as an argument.

```php
use Phenix\Facades\File;

File::read('path/to/file.txt');
```

## Write

To write to files you can use the `put` method, the first argument is the file path and the second argument is the content to write.

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

## Checking the type

### Directories

Additionally you can check if a path corresponds to a directory.

```php
use Phenix\Facades\File;

File::isDirectory('path/to/dir');
```

### Files

Likewise you can check if a path corresponds to a file:

```php
use Phenix\Facades\File;

File::isFile('path/to/file.txt');
```

## Make directories

The `createDirectory` method allows the creation of directories in the indicated path, additionally you can indicate the permissions to be assigned in the second argument, by default the mode is **0755**.

```php
use Phenix\Facades\File;

File::createDirectory('path/to/dir');
```

## Open files

Finally, the `openFile` method returns an instance of the `Amp\File\File` class, the second argument corresponds to the file opening mode, by default in `w`, the same modes used by the native PHP function [fopen](https://www.php.net/manual/es/function.fopen.php), this function should not be used in the Phenix framework.

```php
use Phenix\Facades\File;

File::createDirectory('path/to/dir');
```

Methods provided by the `Amp\File\File` class: `read`, `seek`, `tell`, `eof`, `isSeekable`, `getPath`, `getMode`, `truncate`.