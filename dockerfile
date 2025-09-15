FROM apify/actor-node:20

# Copia los archivos del repositorio al contenedor
COPY . /usr/src/app

# Establece el directorio de trabajo
WORKDIR /usr/src/app

# Instala Puppeteer y las dependencias necesarias para Chromium
RUN npm install puppeteer --quiet

# Instala las dependencias necesarias para Chromium en Alpine
RUN apk update && apk add --no-cache \
    wget \
    ca-certificates \
    fonts-liberation \
    libappindicator3 \
    libasound2 \
    libatk-bridge2.0 \
    libatk1.0 \
    libcups2 \
    libdbus-1-3 \
    libgdk-pixbuf2.0 \
    libnspr4 \
    libnss3 \
    libx11 \
    libxcomposite \
    libxrandr \
    xdg-utils \
    libu2f-udev \
    libgbm \
    --no-install-recommends

# Fuerza la instalación de Chromium
RUN npx puppeteer install

# Añadir etiqueta de versión (opcional)
LABEL com.apify.actBuildId=WGm0HzslyyPLJ1lYW

# Expone el puerto que utiliza Apify (si es necesario)
EXPOSE 8080
