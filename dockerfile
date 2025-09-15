FROM apify/actor-node:20

# Copia los archivos del repositorio al contenedor
COPY . /usr/src/app

# Establece el directorio de trabajo
WORKDIR /usr/src/app

# Instala las dependencias
RUN npm install --quiet --only=prod --no-optional

# Instala Puppeteer y sus dependencias
RUN npm install puppeteer --quiet

# Añadir etiqueta de versión (opcional)
LABEL com.apify.actBuildId=WGm0HzslyyPLJ1lYW

# Expone el puerto que utiliza Apify (si es necesario)
EXPOSE 8080
