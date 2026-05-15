---
layout: home

hero:
  name: PhenixPHP
  text: Async and concurrent APIs in pure PHP
  tagline: High-performance framework for build APIs, powered by Amphp.
  actions:
    - theme: brand
      text: Get Started
      link: /guide/
    - theme: alt
      text: View on GitHub
      link: https://github.com/phenixphp/phenix

codeShowcase:
  title: Code that feels familiar, runs concurrently
  intro: PhenixPHP combines expressive APIs with PHP Fibers and the Amp ecosystem, so routing, validation, persistence, testing, and async work stay readable without special runtime extensions.
  tabs:
    - label: Routing
      file: routes/api.php
      description: Group routes by prefix, middleware, and names while keeping every endpoint easy to scan from one file.
      code: |
        <?php

        declare(strict_types=1);

        use App\Http\Controllers\UserController;
        use Phenix\Auth\Middlewares\Authenticated;
        use Phenix\Facades\Route;
        use Phenix\Routing\Route as Router;

        Route::middleware(Authenticated::class)
            ->prefix('admin')
            ->name('admin')
            ->group(function (Router $route) {
                $route->get('/users', [UserController::class, 'index'])
                    ->name('users.index');

                $route->post('/users', [UserController::class, 'store'])
                    ->name('users.store');
            });
    - label: Controllers
      file: app/Http/Controllers/UserController.php
      description: Controllers receive typed requests and return response objects, keeping HTTP behavior explicit and compact.
      code: |
        <?php

        declare(strict_types=1);

        namespace App\Http\Controllers;

        use App\Http\Requests\StoreUserRequest;
        use Phenix\Http\Constants\HttpStatus;
        use Phenix\Http\Controller;
        use Phenix\Http\Request;
        use Phenix\Http\Response;

        class UserController extends Controller
        {
            public function index(Request $request): Response
            {
                return response()->json([
                    'page' => $request->query('page', 1),
                    'users' => [],
                ]);
            }

            public function store(StoreUserRequest $request): Response
            {
                return response()->json(
                    $request->validated(),
                    HttpStatus::CREATED
                );
            }
        }
    - label: Models
      file: app/Models/User.php
      description: Models use PHP attributes for table metadata, column mapping, dates, and relationships.
      code: |
        <?php

        declare(strict_types=1);

        namespace App\Models;

        use Phenix\Database\Models\Attributes\Column;
        use Phenix\Database\Models\Attributes\DateTime;
        use Phenix\Database\Models\Attributes\HasMany;
        use Phenix\Database\Models\Attributes\Id;
        use Phenix\Database\Models\Collection;
        use Phenix\Database\Models\DatabaseModel;
        use Phenix\Util\Date;

        class User extends DatabaseModel
        {
            #[Id]
            public int $id;

            #[Column]
            public string $name;

            #[Column]
            public string $email;

            #[DateTime(name: 'created_at', autoInit: true)]
            public Date $createdAt;

            #[HasMany(model: Product::class, foreignKey: 'user_id')]
            public Collection $products;

            public static function table(): string
            {
                return 'users';
            }
        }
    - label: Migrations
      file: database/migrations/2026_01_01_000000_create_users_table.php
      description: Database changes are versioned with migration classes and fluent table builders.
      code: |
        <?php

        declare(strict_types=1);

        use Phenix\Database\Migration;

        class CreateUsersTable extends Migration
        {
            public function up(): void
            {
                $table = $this->table('users');

                $table->string('name', 100);
                $table->string('email', 124)->unique();
                $table->create();
            }

            public function down(): void
            {
                $this->table('users')->drop()->save();
            }
        }
    - label: Form Requests
      file: app/Http/Requests/StoreUserRequest.php
      description: Form requests keep validation close to the boundary and are resolved automatically before the controller action runs.
      code: |
        <?php

        declare(strict_types=1);

        namespace App\Http\Requests;

        use Phenix\Http\FormRequest;
        use Phenix\Validation\Types\Email;
        use Phenix\Validation\Types\Str;

        class StoreUserRequest extends FormRequest
        {
            protected function rules(): array
            {
                return [
                    'name' => Str::required()->max(60),
                    'email' => Email::required(),
                ];
            }
        }
    - label: Query Builder
      file: app/Http/Controllers/UserController.php
      description: The query builder keeps reads fluent and predictable while returning data ready for JSON APIs.
      code: |
        <?php

        declare(strict_types=1);

        namespace App\Http\Controllers;

        use Phenix\Database\Constants\Order;
        use Phenix\Facades\DB;
        use Phenix\Http\Controller;
        use Phenix\Http\Response;

        class UserController extends Controller
        {
            public function active(): Response
            {
                $users = DB::table('users')
                    ->whereEqual('status', 'active')
                    ->orderBy('created_at', Order::DESC)
                    ->get();

                return response()->json($users);
            }
        }
    - label: Testing
      file: tests/Feature/HealthTest.php
      description: Feature tests can boot the app and make real HTTP requests through the Phenix testing client.
      code: |
        <?php

        declare(strict_types=1);

        use Phenix\Facades\Route;

        test('health endpoint returns ok', function () {
            Route::get('/health', fn () => response()->plain('ok'));

            $this->app->run();

            $this->get('/health')
                ->assertOk()
                ->assertBodyContains('ok');
        });
    - label: Mail
      file: app/Services/SendWelcomeEmails.php
      description: Async operations can be awaited together, so I/O-heavy workflows stay concise and concurrent.
      code: |
        <?php

        declare(strict_types=1);

        namespace App\Services;

        use Amp\Future;
        use App\Mail\WelcomeMail;
        use Phenix\Facades\Mail;

        class SendWelcomeEmails
        {
            public function handle(array $users): array
            {
                $futures = [];

                foreach ($users as $user) {
                    $futures[] = Mail::send(new WelcomeMail($user));
                }

                return Future\await($futures);
            }
        }

features:
- title: Concurrent by default
  details: Modern applications demand tolerance to high traffic. Non-blocking I/O operations and asynchronism allow maximum performance to be achieved.
  icon: ⚡
- title: Pure PHP runtime
  details: Runs on standard PHP without special async extensions. Phenix uses Fibers through the Amp ecosystem to provide non-blocking concurrency.
  icon: 🐘
- title: Elegant and simple syntax
  details: Facades, fluent query builder, elegant route collector, tasks, events, queues, integrated CLI, testing tools, powerful ORM, collections, and much more.
  icon: ✨

footer: Made by Omar Barbosa with ❤️
---
