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
  intro: PhenixPHP combines expressive APIs with PHP Fibers and the Amp ecosystem, so routing, validation, persistence, and async work stay readable without special runtime extensions.
  tabs:
    - label: Routing
      file: routes/api.php
      description: Define readable CRUD endpoints with controller actions and route names that match the quick start flow.
      code: |
        <?php

        declare(strict_types=1);

        use App\Http\Controllers\UserController;
        use Phenix\Facades\Route;

        Route::get('/users', [UserController::class, 'index'])
            ->name('users.index');

        Route::post('/users', [UserController::class, 'store'])
            ->name('users.store');
    - label: Controllers
      file: app/Http/Controllers/UserController.php
      description: Controllers receive typed requests, use models directly, and return explicit JSON responses.
      code: |
        <?php

        declare(strict_types=1);

        namespace App\Http\Controllers;

        use App\Http\Requests\StoreUserRequest;
        use App\Models\User;
        use Phenix\Http\Constants\HttpStatus;
        use Phenix\Http\Controller;
        use Phenix\Http\Request;
        use Phenix\Http\Response;

        class UserController extends Controller
        {
            public function index(Request $request): Response
            {
                $users = User::query()->paginate($request->getUri());

                return response()->json($users);
            }

            public function store(StoreUserRequest $request): Response
            {
                $user = User::create($request->validated());

                return response()->json($user, HttpStatus::CREATED);
            }
        }
    - label: Migrations
      file: database/migrations/20230930111521_create_users_table.php
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
      description: Form requests keep validation at the HTTP boundary and expose validated data to controller actions.
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
    - label: ORM
      file: app/Models/User.php
      description: Ashes ORM maps database rows into typed PHP objects with attributes, relationships, and fluent retrieval.
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

            #[DateTime(name: 'updated_at')]
            public Date|null $updatedAt = null;

            #[HasMany(model: Product::class, foreignKey: 'user_id')]
            public Collection $products;

            public static function table(): string
            {
                return 'users';
            }
        }
    - label: Query Builder
      file: app/Http/Controllers/UserController.php
      description: Use the DB facade when you want fluent SQL-style reads that return arrays or paginated payloads.
      code: |
        <?php

        declare(strict_types=1);

        namespace App\Http\Controllers;

        use Phenix\Facades\DB;
        use Phenix\Http\Controller;
        use Phenix\Http\Request;
        use Phenix\Http\Response;

        class UserController extends Controller
        {
            public function index(Request $request): Response
            {
                $users = DB::table('users')
                    ->select(['id', 'name', 'email'])
                    ->paginate($request->getUri());

                return response()->json($users);
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
