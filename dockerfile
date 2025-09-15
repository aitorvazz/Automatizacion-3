FROM apify/actor-node:20

# Copia los archivos del repositorio al contenedor
COPY . /usr/src/app

# Establece el directorio de trabajo
WORKDIR /usr/src/app

# Instala Puppeteer y las dependencias del sistema necesarias para Chromium
RUN npm install puppeteer --quiet

# Instala las dependencias del sistema para ejecutar Chromium en contenedor
RUN apk update && apk add --no-cache \
    libx11-xcb1 \
    libxcomposite1 \
    libxrandr2 \
    xdg-utils \
    libgbm1

# Expone el puerto que utiliza Apify (si es necesario)
EXPOSE 8080
