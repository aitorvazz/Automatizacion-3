FROM apify/actor-node:20

# Copia los archivos del repositorio al contenedor
COPY . /usr/src/app

# Establece el directorio de trabajo
WORKDIR /usr/src/app

# Instala las dependencias
RUN npm install --quiet --only=prod --no-optional

# Elimina la caché de Playwright y fuerza una nueva instalación de los navegadores y dependencias
RUN rm -rf /root/.cache/ms-playwright && npx playwright install --with-deps

# Añadir etiqueta de versión (opcional)
LABEL com.apify.actBuildId=WGm0HzslyyPLJ1lYW

# Expone el puerto que utiliza Apify (si es necesario)
EXPOSE 8080
