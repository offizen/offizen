ARG PHP_VERSION=8.3
FROM dunglas/frankenphp:${PHP_VERSION}

ENV SERVER_NAME=:8080

WORKDIR /app

# Retrieve Composer
COPY --from=composer:2 /usr/bin/composer /usr/bin/composer

# Copy application code
COPY . /app

RUN \
 # Install git and unzip
 apt update && apt install -y git zip unzip && \
 # Install PHP extensions
 install-php-extensions \
    opcache \
    pcntl \
    pdo_pgsql \
    redis \ 
    zip && \
 # Enable PHP production settings
 mv "$PHP_INI_DIR/php.ini-production" "$PHP_INI_DIR/php.ini" && \
 # Install dependencies
 composer install --no-dev --optimize-autoloader && \
 # Set permissions
 chown -R www-data:www-data storage bootstrap/cache