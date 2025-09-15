const Apify = require('apify');  // Asegúrate de que estás importando Apify correctamente
const puppeteer = require('puppeteer');  // Usamos Puppeteer para controlar el navegador

(async () => {
    // Lanzamos Chromium en modo headless
    const browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();  // Creamos una nueva página

    // Accedemos a la URL de la contratación pública de Euskadi
    await page.goto('https://www.contratacion.euskadi.eus/webkpe00-kpeperfi/es/ac70cPublicidadWar/busquedaAnuncios?locale=es');

    // Aplicamos los filtros de la búsqueda (tipo de contrato: Suministros, estado: Abierto)
    await page.select('select[name="tipoContrato"]', 'Suministros');  
    await page.select('select[name="estadoTramite"]', 'Abierto');
    await page.click('button#btnBuscar');  // Hacemos clic en el botón de búsqueda

    // Esperamos que los resultados de la búsqueda se carguen
    await page.waitForSelector('div.paginacion');  

    let items = [];  // Arreglo para almacenar los resultados extraídos
    let pageNumber = 1;
    let nextButtonExists = true;

    // Bucle para recorrer las páginas de resultados
    while (nextButtonExists) {
        console.log(`Extrayendo datos de la página ${pageNumber}`);
        
        await page.waitForSelector('.resultadoItem');  // Esperamos que los elementos estén presentes

        // Extraemos los datos de los anuncios
        const pageItems = await page.evaluate(() => {
            const items = Array.from(document.querySelectorAll('.resultadoItem'));
            return items.map(item => {
                const title = item.querySelector('h2')?.innerText;
                const date = item.querySelector('.fecha')?.innerText;
                const link = item.querySelector('a')?.href;
                return { title, date, link };
            });
        });

        // Agregamos los elementos extraídos a la lista principal
        items = [...items, ...pageItems];

        // Verificamos si hay una siguiente página
        const nextButton = await page.$('a[aria-label="Siguiente"]');
        if (nextButton) {
            await nextButton.click();  // Si existe el botón "Siguiente", hacemos clic
            pageNumber++;  // Incrementamos el número de página
        } else {
            nextButtonExists = false;  // Si no hay siguiente página, terminamos el bucle
        }
    }

    // Guardamos los resultados en formato JSON en Apify
    await Apify.setValue('RESULTADOS', items);

    console.log(`Se extrajeron ${items.length} elementos.`);
    
    await browser.close();  // Cerramos el navegador
})();
