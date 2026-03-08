# Docker usage

```bash
docker-compose up --build

docker-compose exec app composer install

docker-compose exec app composer test

docker-compose exec app bash

docker build --target local -t phenix:local .

docker build --target production -t phenix:prod .

docker build -t phenix:latest .
```
