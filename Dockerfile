# Stage 1: Build frontend assets
FROM node:20-alpine as node-builder

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install Node dependencies
RUN npm ci

# Copy source files
COPY . .

# Build frontend assets
RUN npm run build

# Stage 2: Build PHP application
FROM php:8.2-apache

# Install system dependencies
RUN apt-get update && apt-get install -y \
    git \
    curl \
    libpng-dev \
    libjpeg-dev \
    libfreetype6-dev \
    libonig-dev \
    libxml2-dev \
    libzip-dev \
    libsqlite3-dev \
    zip \
    unzip \
    sqlite3 \
    && docker-php-ext-configure gd --with-freetype --with-jpeg \
    && docker-php-ext-install -j$(nproc) \
    pdo \
    pdo_mysql \
    pdo_sqlite \
    mbstring \
    exif \
    pcntl \
    bcmath \
    gd \
    zip \
    opcache \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/*

# Enable Apache mod_rewrite
RUN a2enmod rewrite headers

# Install Composer
COPY --from=composer:2 /usr/bin/composer /usr/bin/composer

# Set working directory
WORKDIR /var/www/html

# Copy composer files first (for layer caching)
COPY composer.json composer.lock ./

# Install PHP dependencies
RUN composer install --no-interaction --prefer-dist --optimize-autoloader --no-dev --no-scripts

# Copy application files
COPY . .

# Copy built assets from node stage
COPY --from=node-builder /app/public/build ./public/build

# Run post-install scripts
RUN composer dump-autoload --optimize

# Create SQLite database directory and file
RUN mkdir -p /var/www/html/database \
    && touch /var/www/html/database/database.sqlite

# Set permissions
RUN chown -R www-data:www-data /var/www/html \
    && chmod -R 755 /var/www/html/storage \
    && chmod -R 755 /var/www/html/bootstrap/cache \
    && chmod 664 /var/www/html/database/database.sqlite

# Configure Apache
ENV APACHE_DOCUMENT_ROOT /var/www/html/public
RUN sed -ri -e 's!/var/www/html!${APACHE_DOCUMENT_ROOT}!g' /etc/apache2/sites-available/*.conf
RUN sed -ri -e 's!/var/www/!${APACHE_DOCUMENT_ROOT}!g' /etc/apache2/apache2.conf /etc/apache2/conf-available/*.conf

# Add Apache configuration for Laravel
RUN echo '<Directory /var/www/html/public>\n\
    Options Indexes FollowSymLinks\n\
    AllowOverride All\n\
    Require all granted\n\
    </Directory>' >> /etc/apache2/apache2.conf

# Copy environment file if not exists
RUN cp .env.example .env || true

# Expose port (Render uses PORT env variable)
EXPOSE 80

# Create startup script
RUN echo '#!/bin/bash\n\
    set -e\n\
    \n\
    # Generate app key if not set\n\
    if [ -z "$APP_KEY" ]; then\n\
    php artisan key:generate --force\n\
    fi\n\
    \n\
    # Run migrations\n\
    php artisan migrate --force || true\n\
    \n\
    # Cache configuration\n\
    php artisan config:cache || true\n\
    php artisan route:cache || true\n\
    php artisan view:cache || true\n\
    \n\
    # Start Apache\n\
    apache2-foreground\n\
    ' > /usr/local/bin/start.sh && chmod +x /usr/local/bin/start.sh

CMD ["/usr/local/bin/start.sh"]
