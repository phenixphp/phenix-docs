# Authentication

## Table of Contents

- [Overview](#overview)
- [How the flow works](#how-the-flow-works)
- [Guest-only endpoints](#guest-only-endpoints)
- [Authenticated endpoints](#authenticated-endpoints)
- [Main authentication flow](#main-authentication-flow)
- [Token lifecycle](#token-lifecycle)
- [OTP-backed flows](#otp-backed-flows)
- [Configuration defaults](#configuration-defaults)
- [Rate limits and safeguards](#rate-limits-and-safeguards)
- [Framework appendix](#framework-appendix)

## Overview

Phenix authentication in this application skeleton is based on personal access tokens, not server-side sessions.

The login flow has two steps:

1. The client submits email and password to request a login OTP.
2. The client submits the OTP to receive an API token.

Protected endpoints expect the token in the `Authorization` header:

```http
Authorization: Bearer <access_token>
```

The plain token is only returned when it is created or refreshed. The database stores only the SHA-256 hash of that token.

## How the flow works

The authentication journey is built around OTP-backed actions and bearer tokens:

- `POST /register` creates a user and sends an email verification OTP.
- `POST /verify-email` verifies the email address with `email + otp`.
- `POST /login` validates credentials and sends a login OTP.
- `POST /login/authorize` exchanges `email + otp` for a bearer token.
- Authenticated requests use `Authorization: Bearer <access_token>`.
- `POST /token/refresh` rotates the current token and expires the previous one.
- `POST /logout` revokes only the current token.
- `POST /reset-password` changes the password and revokes all existing tokens.

Guest-only auth routes reject requests that are already authenticated with a valid bearer token. Requests with missing, malformed, expired, revoked, or invalid tokens are still treated as guest requests, so clients can re-authenticate or complete recovery flows.

## Guest-only endpoints

These routes are available only when the request is not already authenticated by a valid bearer token:

- `POST /register`
- `POST /verify-email`
- `POST /resend-verification-otp`
- `POST /forgot-password`
- `POST /reset-password`
- `POST /login`
- `POST /login/authorize`
- `POST /register/cancel`

### Register

Creates a new user and sends an email verification OTP.

```http
POST /register
Content-Type: application/json
```

```json
{
  "name": "Ada Lovelace",
  "email": "ada@example.com",
  "password": "P@ssw0rd12",
  "password_confirmation": "P@ssw0rd12"
}
```

Successful response:

```json
{
  "id": 1,
  "name": "Ada Lovelace",
  "email": "ada@example.com",
  "email_verified_at": null,
  "created_at": "2026-03-25 12:00:00",
  "updated_at": null
}
```

Notes:

- Registration does not return an API token.
- The user must verify the email before login is allowed.

### Verify email

Completes email verification with the OTP sent during registration.

```http
POST /verify-email
Content-Type: application/json
```

```json
{
  "email": "ada@example.com",
  "otp": "123456"
}
```

Successful response:

```json
{
  "message": "Your email has been verified."
}
```

If the OTP is missing, expired, already used, or belongs to another scope, the endpoint returns `404` with an invalid OTP message.

### Resend verification OTP

Sends a new verification OTP to an unverified user.

```http
POST /resend-verification-otp
Content-Type: application/json
```

```json
{
  "email": "ada@example.com"
}
```

Successful response:

```json
{
  "message": "A new verification code has been sent."
}
```

### Login

Validates credentials for a verified user and sends a login OTP.

```http
POST /login
Content-Type: application/json
```

```json
{
  "email": "ada@example.com",
  "password": "P@ssw0rd12"
}
```

Successful response:

```json
{
  "message": "A login verification code has been sent."
}
```

Notes:

- This step does not return a token yet.
- Unverified users fail validation.
- Invalid passwords return `401 Unauthorized`.

### Login authorization

Exchanges a valid login OTP for a bearer token.

```http
POST /login/authorize
Content-Type: application/json
```

```json
{
  "email": "ada@example.com",
  "otp": "123456"
}
```

Successful response:

```json
{
  "access_token": "5b2f8b8d..._checksum",
  "expires_at": "2026-03-26 00:00:00",
  "token_type": "Bearer"
}
```

This is the main token payload contract used by the authentication system:

```json
{
  "access_token": "string",
  "expires_at": "YYYY-MM-DD HH:MM:SS",
  "token_type": "Bearer"
}
```

### Forgot password

Requests a reset-password OTP for a verified user.

```http
POST /forgot-password
Content-Type: application/json
```

```json
{
  "email": "ada@example.com"
}
```

Successful response:

```json
{
  "message": "If the account exists, a password reset code has been sent."
}
```

This endpoint intentionally returns the same success response even when:

- the email does not exist
- the user is not verified
- the hourly reset OTP cap has already been reached

### Reset password

Resets the password with a valid reset OTP.

```http
POST /reset-password
Content-Type: application/json
```

```json
{
  "email": "ada@example.com",
  "otp": "123456",
  "password": "N3wP@ssw0rd1",
  "password_confirmation": "N3wP@ssw0rd1"
}
```

Successful response:

```json
{
  "message": "Your password has been reset successfully."
}
```

Important behavior:

- The OTP is marked as used.
- The password is updated.
- All existing personal access tokens are revoked.

### Cancel registration

Deletes an unverified user and any pending verification OTP records.

```http
POST /register/cancel
Content-Type: application/json
```

```json
{
  "email": "ada@example.com"
}
```

Successful response:

```json
{
  "message": "Registration cancelled successfully."
}
```

## Authenticated endpoints

These routes require a valid bearer token:

- `POST /logout`
- `GET /tokens`
- `POST /token/refresh`
- `DELETE /tokens/{id}`

Requests without a valid token return `401 Unauthorized`.

### Call an authenticated endpoint

```http
GET /tokens
Authorization: Bearer <access_token>
```

### Logout

Revokes only the token used in the current request.

```http
POST /logout
Authorization: Bearer <access_token>
```

Successful response:

```json
{
  "message": "Logged out successfully."
}
```

### List active tokens

Returns the authenticated user's non-expired tokens.

```http
GET /tokens
Authorization: Bearer <access_token>
```

Example response:

```json
[
  {
    "id": "8bb7d0ef-236a-4f54-8df3-1b1d5a8b1f52",
    "tokenable_type": "App\\Models\\User",
    "tokenable_id": 1,
    "name": "auth_token",
    "abilities": "[\"*\"]",
    "last_used_at": "2026-03-25 12:30:00",
    "expires_at": "2026-03-26 00:00:00",
    "created_at": "2026-03-25 12:00:00",
    "updated_at": "2026-03-25 12:30:00"
  }
]
```

Notes:

- Expired tokens are filtered out.
- The stored token hash is hidden and is not included in the response.

### Refresh token

Creates a new token for the current user and expires the current token immediately.

```http
POST /token/refresh
Authorization: Bearer <access_token>
```

Successful response:

```json
{
  "access_token": "a5cd4fe1..._checksum",
  "expires_at": "2026-03-26 00:30:00",
  "token_type": "Bearer"
}
```

Important behavior:

- The previous token stops being valid after refresh.
- Clients should replace the stored token immediately.

### Revoke a specific token

Deletes one token by ID, as long as it belongs to the authenticated user.

```http
DELETE /tokens/8bb7d0ef-236a-4f54-8df3-1b1d5a8b1f52
Authorization: Bearer <access_token>
```

Successful response:

```json
[]
```

If the token does not belong to the authenticated user, the endpoint returns `404`.

## Main authentication flow

Here is the most common end-to-end flow for API clients:

1. Register a new user with `POST /register`.
2. Verify the email with `POST /verify-email`.
3. Submit credentials to `POST /login`.
4. Submit the login OTP to `POST /login/authorize`.
5. Store the returned `access_token` securely on the client.
6. Send the token as `Authorization: Bearer <access_token>` on protected routes.
7. Rotate the token with `POST /token/refresh` when needed.
8. Revoke the current token with `POST /logout` when the session should end.

## Token lifecycle

The token system is implemented with the `HasApiTokens` trait and the authentication middleware in the framework.

### Token creation

When a token is created:

- a cryptographically random plain-text token is generated
- a checksum suffix is appended to the token value
- the SHA-256 hash is stored in `personal_access_tokens`
- the plain token is returned once in the HTTP response

By default, tokens are created with the `auth_token` name in this application.

### Token validation

For authenticated routes, the `Authenticated` middleware:

- requires an `Authorization` header that starts with `Bearer `
- extracts the plain token
- hashes it with SHA-256
- loads the matching non-expired record from `personal_access_tokens`
- updates `last_used_at`
- attaches the authenticated user to the request

If validation fails, the request returns `401 Unauthorized`.

### Refresh behavior

Refreshing a token creates a new token and sets the previous token expiration to the current time. After that, clients must use the new token.

### Revocation behavior

Revocation behavior differs by endpoint:

- `POST /logout` deletes only the current token
- `DELETE /tokens/{id}` deletes a selected token that belongs to the current user
- `POST /reset-password` deletes all tokens for the user

## OTP-backed flows

OTP records are stored separately from personal access tokens and are scoped by purpose.

The application uses these OTP scopes:

- email verification
- login authorization
- password reset

Each OTP is:

- a 6-digit numeric code
- stored as a SHA-256 hash
- valid for a limited time
- single-use

An OTP becomes invalid when:

- it does not exist
- it belongs to another scope
- it has already been used
- it has expired

These rules are enforced in the email verification, login authorization, and password reset flows.

## Configuration defaults

The default authentication configuration in `config/auth.php` is:

- OTP expiration: `10` minutes
- personal access token expiration: `720` minutes
- token validation rate limit: `5` attempts per `300` seconds per client IP
- token prefix: empty by default

The token model used by the app is `Phenix\Auth\PersonalAccessToken`, and the user model is `App\Models\User`.

## Rate limits and safeguards

The auth flow has several independent protections.

### Endpoint-specific request rate limits

The API routes apply request throttling to these endpoints:

- `POST /verify-email`: 6 requests per minute
- `POST /resend-verification-otp`: 2 requests per minute
- `POST /forgot-password`: 2 requests per minute
- `POST /reset-password`: 5 requests per minute
- `POST /login`: 5 requests per minute
- `POST /login/authorize`: 5 requests per minute

### OTP issuance caps

The application also caps OTP generation per user and scope:

- login OTPs: maximum 5 per hour
- verification OTPs: maximum 5 per hour when resending
- reset-password OTPs: maximum 5 per hour

### Token validation rate limiting

The framework includes token validation attempt tracking by client IP.

When a client repeatedly sends invalid bearer tokens, the token validation middleware can block additional attempts for the configured window. The default limit is 5 failed token validation attempts in 300 seconds.

## Framework appendix

Most API consumers only need the HTTP contract above, but the framework pieces below explain how the behavior is implemented.

### `HasApiTokens`

The `HasApiTokens` trait is responsible for:

- creating token records
- returning the plain token to the caller
- exposing the current token through `currentAccessToken()`
- listing a model's tokens through `tokens()`
- rotating the current token through `refreshToken()`

### `Authenticated` middleware

The `Authenticated` middleware protects routes by:

- reading the bearer token from the `Authorization` header
- validating the token hash and expiration
- recording token usage
- binding the authenticated user to the request

### `TokenRateLimit` middleware

The `TokenRateLimit` middleware guards against repeated invalid bearer token attempts from the same client IP. When the configured limit is exceeded, it returns `429 Too Many Requests`.

### Console commands

The framework ships with two auth-related console commands:

- `tokens:table` generates the migration for the `personal_access_tokens` table
- `tokens:purge` deletes expired personal access tokens
