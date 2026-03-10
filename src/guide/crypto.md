# Cryptography

## Table of Contents

- [Introduction](#introduction)
- [Module Overview](#module-overview)
- [Key Management](#key-management)
    - [Application Key Requirement](#application-key-requirement)
    - [Generating Keys](#generating-keys)
- [Encrypting and Decrypting](#encrypting-and-decrypting)
    - [Encrypting Arrays or Objects](#encrypting-arrays-or-objects)
    - [Encrypting Plain Strings](#encrypting-plain-strings)
    - [Serialize and Unserialize Flags](#serialize-and-unserialize-flags)
- [Password Hashing](#password-hashing)
- [Bin2Base64 Utility](#bin2base64-utility)
    - [Encoding Modes](#encoding-modes)
    - [Decode Behavior](#decode-behavior)
- [Exceptions and Failure Cases](#exceptions-and-failure-cases)
- [Facade API Reference](#facade-api-reference)

## Introduction

Phenix cryptography provides two main capabilities:

- Symmetric encryption/decryption through `Phenix\Facades\Crypto`.
- Password hashing/verification through `Phenix\Facades\Hash`.

Internally, the module uses sodium (`xchacha20poly1305` for encryption and `pwhash` for passwords).

## Module Overview

Use `Crypto` when you need to encrypt/decrypt payloads.

Use `Hash` when you need one-way password hashing:

- `Hash::make()`
- `Hash::verify()`
- `Hash::needsRehash()`

## Key Management

### Application Key Requirement

The `Crypto` service requires `app.key`. If it is missing, resolving the facade throws `MissingKeyException`.

```php
use Phenix\Facades\Crypto;

// Throws MissingKeyException if app.key is not set
$encrypted = Crypto::encryptString('secret');
```

### Generating Keys

Generate a raw sodium key (binary bytes):

```php
use Phenix\Facades\Crypto;

$rawKey = Crypto::generateKey();
```

Generate an encoded key suitable for config/env usage:

```php
$encodedKey = Crypto::generateEncodedKey();
```

`generateEncodedKey()` returns a prefixed format (for example `base64:...`) that can be used as `APP_KEY`.

## Encrypting and Decrypting

### Encrypting Arrays or Objects

```php
use Phenix\Facades\Crypto;

$payload = ['id' => 10, 'role' => 'admin'];

$encrypted = Crypto::encrypt($payload); // serialize=true by default
$decrypted = Crypto::decrypt($encrypted); // unserialize=true by default
```

### Encrypting Plain Strings

```php
use Phenix\Facades\Crypto;

$encrypted = Crypto::encryptString('hello world');
$decrypted = Crypto::decryptString($encrypted);
```

### Serialize and Unserialize Flags

`Crypto::encrypt()` and `Crypto::decrypt()` support manual control of serialization.

```php
use Phenix\Facades\Crypto;

$encrypted = Crypto::encrypt('plain text', serialize: false);
$decrypted = Crypto::decrypt($encrypted, unserialize: false);
```

Use `encryptString()/decryptString()` when you are working with plain strings.

## Password Hashing

Use `Phenix\Facades\Hash` for password hashing flows:

```php
use Phenix\Facades\Hash;

$password = 'secret-password';

$hash = Hash::make($password);
$isValid = Hash::verify($hash, $password);
$needsRehash = Hash::needsRehash($hash);
```

`Hash::make()` is one-way. You do not decrypt hashes.

## Bin2Base64 Utility

`Phenix\Crypto\Bin2Base64` encodes binary data with a mode prefix and decodes it back.

### Encoding Modes

Supported modes (`Bin2Base64Mode`):

- `base64`
- `base64_np`
- `base64url`
- `base64url_np`

```php
use Phenix\Crypto\Bin2Base64;
use Phenix\Crypto\Constants\Bin2Base64Mode;

$bytes = random_bytes(16);

$encoded = Bin2Base64::encode($bytes, Bin2Base64Mode::BASE_64_URL_NO_PADDING);
$decoded = Bin2Base64::decode($encoded);
```

### Decode Behavior

`decode()` supports two input formats:

- Prefixed value (for example `base64:...`).
- Raw base64 string without prefix (uses original variant).

Invalid prefixes throw `InvalidArgumentException`.

## Exceptions and Failure Cases

Main exceptions in this module:

- `MissingKeyException`: app key is missing.
- `EncryptException`: encryption failed.
- `DecryptException`: payload cannot be decrypted.

Typical failure examples:

```php
use Phenix\Crypto\Exceptions\DecryptException;
use Phenix\Crypto\Exceptions\EncryptException;
use Phenix\Facades\Crypto;

try {
    Crypto::decryptString('invalid-encrypted-string');
} catch (DecryptException $e) {
    // Invalid or tampered payload
}

try {
    // wrong/invalid key format can fail encryption
    Crypto::encrypt(['foo' => 'bar']);
} catch (EncryptException $e) {
    // encryption failure
}
```

## Facade API Reference

### `Phenix\Facades\Crypto`

- `encrypt(object|array|string $value, bool $serialize = true): string`
- `encryptString(string $value): string`
- `decrypt(string $payload, bool $unserialize = true): object|array|string`
- `decryptString(string $payload): string`
- `generateKey(): string`
- `generateEncodedKey(): string`

### `Phenix\Facades\Hash`

- `make(string $password): string`
- `verify(string $hash, string $password): bool`
- `needsRehash(string $hash): bool`
