# Automatización de búsqueda de suministros abiertos en Euskadi

Este proyecto automatiza la búsqueda de oportunidades de contratación pública en Euskadi a través del portal de [Contratación Pública del Gobierno Vasco](https://www.contratacion.euskadi.eus/webkpe00-kpeperfi/es/ac70cPublicidadWar/busquedaAnuncios?locale=es). El proceso de automatización se realiza utilizando Playwright y Apify, permitiendo la extracción de datos de todas las páginas de resultados.

## Descripción

El script automatiza los siguientes pasos:

1. **Accede al portal de contratación pública de Euskadi.**
2. **Aplica los filtros**:
   - Tipo de contrato: **Suministros**
   - Estado de tramitación: **Abierto**
3. **Inicia la búsqueda.**
4. **Navega por las páginas de resultados** (los resultados están divididos en páginas de 10 elementos).
5. **Extrae los datos** (título, fecha y enlace) de cada anuncio de contratación.
6. **Guarda los resultados** en formato JSON.

## Requisitos

Antes de ejecutar el proyecto en Apify, asegúrate de tener las siguientes herramientas configuradas:

- **Cuenta en Apify**: Crea una cuenta gratuita o de pago en [Apify](https://www.apify.com/).
- **Repositorio de GitHub**: Este proyecto está vinculado a un repositorio de GitHub.

## Instrucciones para ejecutar el actor en Apify

1. **Crear un repositorio en GitHub**:
   - Clona este proyecto en tu repositorio de GitHub o crea un nuevo repositorio donde puedas alojar los archivos del proyecto.

2. **Conectar el repositorio de GitHub con Apify**:
   - Ve a la plataforma de [Apify](https://www.apify.com/) y crea un nuevo actor.
   - En la configuración del actor, selecciona **Conectar con GitHub** y proporciona la URL de tu repositorio.
   - Apify descargará automáticamente el código del repositorio.

3. **Estructura del proyecto en GitHub**:
   Asegúrate de tener la siguiente estructura de archivos en tu repositorio:

/mi-repositorio
|-- actor.js # Código principal del actor
|-- package.json # Dependencias y configuración


4. **Subir los archivos al repositorio de GitHub**:
Asegúrate de tener los siguientes archivos en tu repositorio de GitHub:

- **`actor.js`**: Contiene el código que automatiza el proceso de navegación y extracción de datos utilizando Playwright.
- **`package.json`**: Define las dependencias del proyecto, incluyendo Playwright y Apify.

5. **Ejecutar el actor en Apify**:
- Una vez que tu repositorio esté conectado, simplemente ejecuta el actor desde la interfaz de Apify.
- El actor accederá al portal, aplicará los filtros, navegará por las páginas de resultados, extraerá la información y almacenará los resultados en formato JSON.

## Archivos del proyecto

- **`actor.js`**: Contiene el código que automatiza el proceso de navegación y extracción de datos utilizando Playwright.
- **`package.json`**: Define las dependencias del proyecto, incluyendo Playwright y Apify.

## Dependencias

El proyecto utiliza las siguientes dependencias:

- **Playwright**: Para controlar el navegador y automatizar la navegación web.
- **Apify**: Para manejar la automatización a nivel de plataforma, como el almacenamiento de resultados.

Puedes ver las dependencias en el archivo `package.json`.

## Contribución

Si deseas colaborar en este proyecto, por favor realiza un **fork** del repositorio y crea un **pull request** con tus cambios. Asegúrate de seguir las mejores prácticas de desarrollo y probar tus cambios antes de enviarlos.

## Licencia

Este proyecto está bajo la Licencia MIT. Ver el archivo [LICENSE](LICENSE) para más detalles.
