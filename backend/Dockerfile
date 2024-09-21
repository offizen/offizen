FROM dunglas/frankenphp:php8.3

ENV SERVER_NAME=:80

WORKDIR /app

# Enable PHP production settings
RUN mv "$PHP_INI_DIR/php.ini-production" "$PHP_INI_DIR/php.ini" \
 && composer install --no-dev --optimize-autoloader

# Retrieve Composer
COPY --from=composer:2 /usr/bin/composer /usr/bin/composer

# Copy application code
COPY . /app

# Set permissions
RUN chown -R www-data:www-data storage bootstrap/cache