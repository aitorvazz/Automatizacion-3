FROM apify/actor-node:20

# Copia los archivos del repositorio
COPY . ./ 

# Instala las dependencias
RUN npm install --quiet --only=prod --no-optional

# Instala los navegadores de Playwright
RUN npx playwright install

# Añadir los archivos y crear la imagen
RUN npm run build

LABEL com.apify.actBuildId=WGm0HzslyyPLJ1lYW
