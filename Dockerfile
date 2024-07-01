FROM node:lts-alpine3.14 as builder

# Set working directory
WORKDIR /app

RUN apk update && \
    apk add --no-cache \
    libc6-compat autoconf automake libtool make tiff jpeg zlib zlib-dev pkgconf nasm file gcc musl-dev \
    libpng-dev \
    zip \
    jpegoptim optipng pngquant gifsicle \
    unzip \
    git \
    curl \
    libmemcached-dev \
    npm

# Copy all files
COPY ./ ./

# Install dependencies
RUN npm cache clean -f
RUN npm install

# Build app
RUN npm run build

EXPOSE 3000

CMD ["npm", "start"]