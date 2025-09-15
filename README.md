# Automatizacion-3
# Automatización de búsqueda de suministros abiertos en Euskadi

Este proyecto automatiza la búsqueda de oportunidades de contratación pública en Euskadi a través del portal de [Contratación Pública del Gobierno Vasco](https://www.contratacion.euskadi.eus/webkpe00-kpeperfi/es/ac70cPublicidadWar/busquedaAnuncios?locale=es). El proceso de automatización se realiza utilizando Playwright y Apify, permitiendo la extracción de datos de todas las páginas de resultados.

## Descripción

El script automatiza los siguientes pasos:

1. **Accede al portal de contratación pública de Euskadi.**
2. **Aplica los filtros**:
   - Tipo de contrato: **Suministros**
   - Estado de tramitación: **Abierto**
3. **Inicia la búsqueda**.
4. **Navega por las páginas de resultados** (ya que los resultados están divididos en páginas de 10 elementos).
5. **Extrae los datos** (título, fecha y enlace) de cada anuncio de contratación.
6. **Guarda los resultados** en un archivo JSON.

## Requisitos

Antes de ejecutar el proyecto, asegúrate de tener las siguientes herramientas instaladas:

- **Node.js** (preferiblemente la versión LTS): [Node.js download](https://nodejs.org/)
- **NPM**: El gestor de paquetes de Node.js (viene con la instalación de Node.js).

## Instalación

1. Clona este repositorio en tu máquina local:

   ```bash
   git clone https://github.com/tu-usuario/mi-repositorio.git
