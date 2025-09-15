FROM apify/actor-node:20

# Copia los archivos del repositorio al contenedor
COPY . /usr/src/app

# Establece el directorio de trabajo
WORKDIR /usr/src/app

# Instala las dependencias del sistema necesarias para Chromium
RUN apt-get update && apt-get install -y \
    wget \
    ca-certificates \
    fonts-liberation \
    libappindicator3-1 \
    libasound2 \
    libatk-bridge2.0-0 \
    libatk1.0-0 \
    libcups2 \
    libdbus-1-3 \
    libgdk-pixbuf2.0-0 \
    libnspr4 \
    libnss3 \
    libx11-xcb1 \
    libxcomposite1 \
    libxrandr2 \
    xdg-utils \
    libu2f-udev \
    libgbm1 \
    --no-install-recommends

# Instala las dependencias de Node.js
RUN npm install --quiet --only=prod --no-optional

# Instala Puppeteer
RUN npm install puppeteer --quiet

# Instala los navegadores de Puppeteer
RUN npx puppeteer install

# Añadir etiqueta de versión (opcional)
LABEL com.apify.actBuildId=WGm0HzslyyPLJ1lYW

# Expone el puerto que utiliza Apify (si es necesario)
EXPOSE 8080
