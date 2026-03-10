# Mailing

## Table of Contents

- [Introduction](#introduction)
- [Configuration](#configuration)
  - [SMTP Configuration](#smtp-configuration)
  - [Amazon SES Configuration](#amazon-ses-configuration)
  - [Resend Configuration](#resend-configuration)
  - [Log Configuration (Testing)](#log-configuration-testing)
- [Creating Mailables](#creating-mailables)
  - [Generating a Mailable](#generating-a-mailable)
  - [Mailable Structure](#mailable-structure)
- [Writing Mailables](#writing-mailables)
  - [Configuring the Recipient](#configuring-the-recipient)
  - [Configuring the Subject](#configuring-the-subject)
  - [Configuring the View](#configuring-the-view)
  - [View Data](#view-data)
  - [Attaching Files](#attaching-files)
- [Sending Mail](#sending-mail)
  - [Basic Sending](#basic-sending)
  - [Async Sending](#async-sending)
  - [Multiple Recipients](#multiple-recipients)
- [Mail Templates](#mail-templates)
  - [Creating a Template](#creating-a-template)
  - [Mail Layouts](#mail-layouts)
- [Attachments](#attachments)
  - [Attaching Files](#attaching-files)
  - [Multiple Attachments](#multiple-attachments)
- [Testing](#testing)
  - [Mail Fake](#mail-fake)
  - [Assertions](#assertions)
  - [Verifying Sends](#verifying-sends)
- [Available Transports](#available-transports)
- [CLI Commands](#cli-commands)

## Introduction

PhenixPHP provides a clean and simple email system based on the `Mailable` abstraction. The system supports multiple transports (SMTP, Amazon SES, Resend) and integrates seamlessly with the [view system](./views.md) to create attractive email templates.

The PhenixPHP mailing module:

- **Supports multiple transports**: SMTP, Amazon SES, Resend, and Log for testing
- **Asynchronous by default**: Uses AmpPHP for non-blocking async sending
- **Integrated with views**: Uses the template engine to render emails
- **Easy to test**: Includes utilities for testing with `Mail::fake()`
- **Flexible attachments**: Supports file attachments with automatic validation

## Configuration

The mail system configuration is located in `config/mail.php` and `config/services.php`.

### SMTP Configuration

Configuration for standard SMTP servers:

```php
// config/mail.php
return [
    'default' => env('MAIL_MAILER', static fn (): string => 'smtp'),

    'mailers' => [
        'smtp' => [
            'transport' => 'smtp',
            'host' => env('MAIL_HOST', static fn (): string => 'smtp.mailgun.org'),
            'port' => env('MAIL_PORT', static fn (): int => 587),
            'encryption' => env('MAIL_ENCRYPTION', static fn (): string => 'tls'),
            'username' => env('MAIL_USERNAME'),
            'password' => env('MAIL_PASSWORD'),
            'timeout' => null,
        ],
    ],

    'from' => [
        'address' => env('MAIL_FROM_ADDRESS', static fn (): string => 'hello@example.com'),
        'name' => env('MAIL_FROM_NAME', static fn (): string => 'Example'),
    ],
];
```

**Environment Variables:**

```env
# .env
MAIL_MAILER=smtp
MAIL_HOST=smtp.mailgun.org
MAIL_PORT=587
MAIL_ENCRYPTION=tls
MAIL_USERNAME=your_username
MAIL_PASSWORD=your_password
MAIL_FROM_ADDRESS=noreply@yourapp.com
MAIL_FROM_NAME="Your Application"
```

**Encryption Options:**

- `tls` - Transport Layer Security (port 587)
- `ssl` - Secure Sockets Layer (port 465)
- `null` - No encryption (not recommended)

### Amazon SES Configuration

Configuration for Amazon Simple Email Service:

```php
// config/mail.php
'mailers' => [
    'ses' => [
        'transport' => 'ses',
    ],
],
```

```php
// config/services.php
'ses' => [
    'key' => env('AWS_ACCESS_KEY_ID'),
    'secret' => env('AWS_SECRET_ACCESS_KEY'),
    'region' => env('AWS_DEFAULT_REGION', 'us-east-1'),
],
```

**Environment Variables:**

```env
# .env
MAIL_MAILER=ses
AWS_ACCESS_KEY_ID=your_access_key
AWS_SECRET_ACCESS_KEY=your_secret_key
AWS_DEFAULT_REGION=us-east-1
```

### Resend Configuration

Configuration for the [Resend](https://resend.com/) service:

```php
// config/mail.php
'mailers' => [
    'resend' => [
        'transport' => 'resend',
    ],
],
```

```php
// config/services.php
'resend' => [
    'key' => env('RESEND_KEY'),
],
```

**Environment Variables:**

```env
# .env
MAIL_MAILER=resend
RESEND_KEY=re_your_api_key
```

### Log Configuration (Testing)

For local development and testing, the `log` transport records emails to logs instead of sending them:

```php
// config/mail.php
'mailers' => [
    'log' => [
        'transport' => 'log',
    ],
],
```

**Environment Variables:**

```env
# .env
MAIL_MAILER=log
```

No additional configuration is required. This transport is ideal for development when you don't have an SMTP server configured.

## Creating Mailables

### Generating a Mailable

PhenixPHP provides the `make:mail` command to generate new Mailable classes:

```sh
php phenix make:mail WelcomeMail
```

This command creates:

- The class `app/Mail/WelcomeMail.php`
- The view `resources/views/emails/welcome-mail.php`

**With nested namespaces:**

```sh
php phenix make:mail Auth/PasswordResetMail
```

Creates:

- `app/Mail/Auth/PasswordResetMail.php`
- `resources/views/emails/auth/password-reset-mail.php`

**Force overwrite:**

```sh
php phenix make:mail WelcomeMail --force
php phenix make:mail WelcomeMail -f
```

### Mailable Structure

A generated Mailable has this structure:

```php
<?php

declare(strict_types=1);

namespace App\Mail;

use Phenix\Mail\Mailable;

class WelcomeMail extends Mailable
{
    public function build(): self
    {
        return $this->view('emails.welcome-mail')
            ->subject('Subject here');
    }
}
```

The `build()` method is where you configure the email: recipients, subject, view, attachments, etc.

## Writing Mailables

### Configuring the Recipient

Use the `to()` method to set the recipient:

```php
public function build(): self
{
    return $this->to('user@example.com');
}
```

You can also pass an object that implements `__toString()` or has an `email` property:

```php
public function build(): self
{
    return $this->to($this->user); // $user must have 'email' property
}
```

### Configuring the Subject

Use the `subject()` method:

```php
public function build(): self
{
    return $this->to('user@example.com')
        ->subject('Welcome to our application!');
}
```

### Configuring the View

Use the `view()` method to specify the email template:

```php
public function build(): self
{
    return $this->to('user@example.com')
        ->subject('Welcome!')
        ->view('emails.welcome-mail');
}
```

The view uses PhenixPHP's [view system](./views.md) with dot notation.

### View Data

To pass data to the view, use the second parameter of the `view()` method. This parameter accepts an associative array that will be extracted as variables in the template:

```php
class WelcomeMail extends Mailable
{
    public function __construct(
        private readonly User $user,
        private readonly string $verificationUrl,
    ) {}

    public function build(): self
    {
        return $this->to($this->user->email)
            ->subject('Welcome to our application!')
            ->view('emails.welcome-mail', [
                'user' => $this->user,
                'verificationUrl' => $this->verificationUrl,
            ]);
    }
}
```

Each key in the array becomes a variable available in the view:

```php
<!-- resources/views/emails/welcome-mail.php -->
<h1>Hello, {{ $user->name }}!</h1>
<p>Click the following link to verify your account:</p>
<a href="{{ $verificationUrl }}">Verify account</a>
```

You can also pass computed values or configuration data:

```php
public function build(): self
{
    return $this->to($this->user->email)
        ->subject('Welcome!')
        ->view('emails.welcome-mail', [
            'userName' => $this->user->name,
            'appName' => config('app.name'),
            'year' => date('Y'),
        ]);
}
```

> **Note**: Only the data explicitly passed in the `view()` second parameter will be available as variables in the template. Properties on the Mailable class are not automatically extracted into the view scope.

### Attaching Files

Use the `attachment()` or `attachments()` method:

```php
public function build(): self
{
    return $this->to('user@example.com')
        ->subject('Your invoice')
        ->view('emails.invoice')
        ->attachment('/path/to/invoice.pdf', 'Invoice-2026.pdf', 'application/pdf');
}
```

We'll see more details about attachments [later](#attachments).

## Sending Mail

### Basic Sending

To send an email, create an instance of the Mailable and use the `Mail` facade:

```php
use App\Mail\WelcomeMail;
use Phenix\Facades\Mail;

$user = User::find(1);
$mailable = new WelcomeMail($user, 'https://app.com/verify/123');

$future = Mail::send($mailable);
$result = $future->await(); // Wait for the result

if ($result->isSuccess()) {
    // Email sent successfully
} else {
    // There was an error
    $error = $result->error();
}
```

### Async Sending

PhenixPHP uses AmpPHP, so email sending is asynchronous by nature. The `send()` method returns a `Future` that you can await:

```php
use Amp\Future;

// Send multiple emails in parallel
$futures = [];
foreach ($users as $user) {
    $mailable = new WelcomeMail($user, $verificationUrl);
    $futures[] = Mail::send($mailable);
}

// Wait for all to complete
$results = Future\await($futures);

foreach ($results as $result) {
    if ($result->isSuccess()) {
        // Success
    }
}
```

You can also use the facade's `to()` method as a shortcut:

```php
Mail::to('user@example.com')->send(new WelcomeMail($user, $url));
```

### Multiple Recipients

To send the same email to multiple recipients:

```php
public function build(): self
{
    return $this->to([
            'admin@example.com',
            'manager@example.com',
        ])
        ->subject('Monthly Report')
        ->view('emails.monthly-report');
}
```

Or using the `to()` method multiple times:

```php
public function build(): self
{
    return $this->to('admin@example.com')
        ->to('manager@example.com')
        ->subject('Monthly Report')
        ->view('emails.monthly-report');
}
```

## Mail Templates

### Creating a Template

Mail templates use PhenixPHP's [view system](./views.md). You can use all features: directives, layout inheritance, includes, etc.

```php
<!-- resources/views/emails/welcome-mail.php -->
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <style>
        body {
            font-family: Arial, sans-serif;
            line-height: 1.6;
            color: #333;
        }
        .button {
            display: inline-block;
            padding: 10px 20px;
            background-color: #007bff;
            color: white;
            text-decoration: none;
            border-radius: 5px;
        }
    </style>
</head>
<body>
    <h1>Hello, {{ $user->name }}!</h1>

    <p>Thank you for registering with our application.</p>

    @if($verificationUrl)
        <p>Please verify your email address:</p>
        <a href="{{ $verificationUrl }}" class="button">Verify my account</a>
    @endif

    <p>If you have any questions, don't hesitate to contact us.</p>

    <p>Regards,<br>The {{ config('app.name') }} Team</p>
</body>
</html>
```

### Mail Layouts

Create a base layout for your emails and extend it in each template:

```php
<!-- resources/views/emails/layouts/base.php -->
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <style>
        body {
            font-family: Arial, sans-serif;
            line-height: 1.6;
            color: #333;
            max-width: 600px;
            margin: 0 auto;
        }
        .header {
            background-color: #007bff;
            color: white;
            padding: 20px;
            text-align: center;
        }
        .content {
            padding: 20px;
        }
        .footer {
            background-color: #f4f4f4;
            padding: 10px;
            text-align: center;
            font-size: 12px;
        }
        .button {
            display: inline-block;
            padding: 10px 20px;
            background-color: #007bff;
            color: white;
            text-decoration: none;
            border-radius: 5px;
        }
    </style>
</head>
<body>
    <div class="header">
        <h1>{{ config('app.name') }}</h1>
    </div>

    <div class="content">
        @yield('content')
    </div>

    <div class="footer">
        <p>&copy; 2026 {{ config('app.name') }}. All rights reserved.</p>
        <p>
            <a href="{{ config('app.url') }}/unsubscribe">Unsubscribe</a> |
            <a href="{{ config('app.url') }}/privacy">Privacy Policy</a>
        </p>
    </div>
</body>
</html>
```

Now extend the layout in your emails:

```php
<!-- resources/views/emails/welcome-mail.php -->
@extends('emails.layouts.base')

@section('content')
    <h2>Welcome, {{ $user->name }}!</h2>

    <p>We're delighted to have you with us.</p>

    <p>
        <a href="{{ $verificationUrl }}" class="button">Verify my account</a>
    </p>

    <p>If you have any questions, we're here to help.</p>
@endsection
```

## Attachments

### Attaching a File

Use the `attachment()` method to attach a file:

```php
class InvoiceMail extends Mailable
{
    public function __construct(
        public readonly Invoice $invoice,
        public readonly string $pdfPath,
    ) {}

    public function build(): self
    {
        return $this->to($this->invoice->customer->email)
            ->subject("Invoice #{$this->invoice->number}")
            ->view('emails.invoice')
            ->attachment(
                $this->pdfPath,
                "invoice-{$this->invoice->number}.pdf",
                'application/pdf'
            );
    }
}
```

**Parameters of the `attachment()` method:**

1. `path` - Full path to the file
2. `name` (optional) - File name for the recipient
3. `mimeType` (optional) - MIME type of the file

### Multiple Attachments

Use the `attachments()` method to attach multiple files:

```php
public function build(): self
{
    return $this->to('user@example.com')
        ->subject('Important documents')
        ->view('emails.documents')
        ->attachments([
            '/path/to/document1.pdf',
            '/path/to/document2.pdf',
            [
                'path' => '/path/to/document3.pdf',
                'name' => 'Final-Contract.pdf',
                'mime' => 'application/pdf',
            ],
        ]);
}
```

**Supported formats for `attachments()`:**

```php
// Simple array of paths
->attachments(['/path/file1.pdf', '/path/file2.pdf'])

// Full associative array
->attachments([
    [
        'path' => '/path/to/file.pdf',
        'name' => 'custom-name.pdf',
        'mime' => 'application/pdf',
    ],
])

// Mixed formats
->attachments([
    '/path/simple.pdf',
    [
        'path' => '/path/custom.pdf',
        'name' => 'renamed.pdf',
    ],
])
```

**Automatic Validation:**

The system automatically validates that attachment files exist. If a file doesn't exist, an exception will be thrown before attempting to send the email.

## Testing

PhenixPHP provides utilities for testing email sending without actually sending them.

### Mail Fake

Use `Mail::fake()` to intercept email sending:

```php
use Phenix\Facades\Mail;
use App\Mail\WelcomeMail;

// In your test
Mail::fake();

// Code that sends emails
$user = User::factory()->create();
Mail::send(new WelcomeMail($user, 'https://verify.url'));

// Verifications (see next section)
```

### Assertions

After using `Mail::fake()`, you can make assertions about sent emails:

```php
use Phenix\Facades\Mail;
use App\Mail\WelcomeMail;

Mail::fake();

// Your code that sends emails
$service->sendWelcomeEmail($user);

// Verify that a specific email was sent
Mail::assertSent(WelcomeMail::class);

// Verify it was sent to a specific recipient
Mail::assertSent(WelcomeMail::class, function ($mail) use ($user) {
    return $mail->hasTo($user->email);
});

// Verify an email was NOT sent
Mail::assertNotSent(PasswordResetMail::class);

// Verify the number of emails sent
Mail::assertSentCount(WelcomeMail::class, 1);
```

### Verifying Sends

You can get the emails sent during the test:

```php
Mail::fake();

// Send emails
Mail::send(new WelcomeMail($user1, 'url1'));
Mail::send(new WelcomeMail($user2, 'url2'));

// Get all sends
$sent = Mail::getSendingLog();

// Verify manually
$this->assertCount(2, $sent);
$this->assertEquals($user1->email, $sent[0]['to']);
```

**Complete Test Example:**

```php
use PHPUnit\Framework\TestCase;
use Phenix\Facades\Mail;
use App\Mail\WelcomeMail;
use App\Services\UserService;

class UserServiceTest extends TestCase
{
    public function test_welcome_email_is_sent_on_registration(): void
    {
        Mail::fake();

        $service = new UserService();
        $user = $service->register([
            'name' => 'John Doe',
            'email' => 'john@example.com',
            'password' => 'secret123',
        ]);

        // Verify that the welcome email was sent
        Mail::assertSent(WelcomeMail::class, function ($mail) use ($user) {
            return $mail->hasTo($user->email) &&
                   $mail->user->id === $user->id;
        });
    }

    public function test_welcome_email_contains_verification_url(): void
    {
        Mail::fake();

        $user = User::factory()->create();
        $verificationUrl = 'https://app.com/verify/abc123';

        Mail::send(new WelcomeMail($user, $verificationUrl));

        $sent = Mail::getSendingLog();
        $this->assertCount(1, $sent);
        $this->assertStringContainsString('verify/abc123', $sent[0]['body']);
    }
}
```

## Available Transports

PhenixPHP supports the following transports:

### SMTP Transport

Standard transport compatible with any SMTP server:

**Features:**

- Support for TLS/SSL
- Authentication with username and password
- Compatible with Gmail, Mailgun, SendGrid, etc.
- Configurable timeout

**Use Cases:**

- Own SMTP servers
- Third-party services with SMTP support
- Local development with MailHog or Mailpit

### Amazon SES Transport

Amazon Web Services email service:

**Features:**

- High availability and scalability
- Integrated with AWS ecosystem
- CloudWatch metrics and monitoring
- Competitive pricing for high volume

**Use Cases:**

- Applications hosted on AWS
- High volume transactional emails
- Need for detailed metrics

### Resend Transport

Modern email API service:

**Features:**

- Simple and modern API
- Excellent developer experience
- Intuitive dashboard
- Detailed delivery logs

**Use Cases:**

- Startups and modern projects
- Fast development with good DX
- Need for detailed tracking

### Log Transport

Transport for development and testing:

**Features:**

- Does not send real emails
- Logs emails to logs
- Useful for local development
- No external configuration required

**Use Cases:**

- Local development without SMTP server
- Manual testing
- Debugging email content

## CLI Commands

### `make:mail`

Creates a new Mailable class along with its view:

```sh
# Create a simple Mailable
php phenix make:mail WelcomeMail

# Create with nested namespace
php phenix make:mail Auth/PasswordResetMail

# Force overwrite of existing files
php phenix make:mail WelcomeMail --force
php phenix make:mail WelcomeMail -f
```

**What it creates:**

- Mailable class in `app/Mail/`
- Template view in `resources/views/emails/`

---

## Complete Example

Here is a complete example showing the typical email sending flow:

**1. Create the Mailable:**

```sh
php phenix make:mail Orders/OrderConfirmation
```

**2. Configure the Mailable:**

```php
<?php

// app/Mail/Orders/OrderConfirmation.php

declare(strict_types=1);

namespace App\Mail\Orders;

use App\Models\Order;
use Phenix\Mail\Mailable;

class OrderConfirmation extends Mailable
{
    public function __construct(
        public readonly Order $order,
    ) {}

    public function build(): self
    {
        return $this->to($this->order->customer->email)
            ->subject("Order confirmation #{$this->order->number}")
            ->view('emails.orders.order-confirmation')
            ->attachment(
                $this->order->invoicePdfPath(),
                "invoice-{$this->order->number}.pdf",
                'application/pdf'
            );
    }
}
```

**3. Create the view:**

```php
<!-- resources/views/emails/orders/order-confirmation.php -->
@extends('emails.layouts.base')

@section('content')
    <h2>Thank you for your order, {{ $order->customer->name }}!</h2>

    <p>Your order <strong>#{{ $order->number }}</strong> has been confirmed and is being processed.</p>

    <h3>Order Summary:</h3>

    <table style="width: 100%; border-collapse: collapse;">
        <thead>
            <tr style="background-color: #f4f4f4;">
                <th style="padding: 10px; text-align: left;">Product</th>
                <th style="padding: 10px; text-align: center;">Quantity</th>
                <th style="padding: 10px; text-align: right;">Price</th>
            </tr>
        </thead>
        <tbody>
            @foreach($order->items as $item)
                <tr>
                    <td style="padding: 10px;">{{ $item->product->name }}</td>
                    <td style="padding: 10px; text-align: center;">{{ $item->quantity }}</td>
                    <td style="padding: 10px; text-align: right;">${{ number_format($item->price, 2) }}</td>
                </tr>
            @endforeach
        </tbody>
        <tfoot>
            <tr style="font-weight: bold; background-color: #f4f4f4;">
                <td colspan="2" style="padding: 10px; text-align: right;">Total:</td>
                <td style="padding: 10px; text-align: right;">${{ number_format($order->total, 2) }}</td>
            </tr>
        </tfoot>
    </table>

    <p style="margin-top: 20px;">
        You will receive a notification when your order is shipped.
    </p>

    <p>
        <a href="{{ config('app.url') }}/orders/{{ $order->id }}" class="button">
            View order details
        </a>
    </p>

    <p>We have attached your invoice in PDF format.</p>
@endsection
```

**4. Send the email:**

```php
// In your controller or service
use App\Mail\Orders\OrderConfirmation;
use Phenix\Facades\Mail;

class OrderController
{
    public function store(Request $request): Response
    {
        // Create the order
        $order = Order::create($validatedData);

        // Send confirmation email
        $future = Mail::send(new OrderConfirmation($order));
        $result = $future->await();

        if ($result->isSuccess()) {
            return response()->json([
                'message' => 'Order created and email sent',
                'order' => $order,
            ]);
        }

        // Order was created but email failed
        return response()->json([
            'message' => 'Order created but there was an error sending the email',
            'order' => $order,
        ], 207); // Multi-Status
    }
}
```

**5. Test:**

```php
use PHPUnit\Framework\TestCase;
use Phenix\Facades\Mail;
use App\Mail\Orders\OrderConfirmation;

class OrderConfirmationTest extends TestCase
{
    public function test_order_confirmation_email_is_sent(): void
    {
        Mail::fake();

        $order = Order::factory()->create();

        Mail::send(new OrderConfirmation($order));

        Mail::assertSent(OrderConfirmation::class, function ($mail) use ($order) {
            return $mail->hasTo($order->customer->email) &&
                   $mail->order->id === $order->id;
        });
    }
}
```
