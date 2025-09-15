const Apify = require('apify');  // Asegúrate de que estás importando Apify correctamente
const puppeteer = require('puppeteer');  // Usamos Puppeteer para controlar el navegador

(async () => {
    // Verificar si Puppeteer se ha instalado correctamente
    try {
        const browser = await puppeteer.launch();  // Lanza Chromium con Puppeteer
        console.log("Chromium se ha instalado correctamente");
    } catch (error) {
        console.error("Error al intentar lanzar Chromium", error);
    }

    const browser = await puppeteer.launch({ headless: true });  // Lanzamos Chromium
    const page = await browser.newPage();  // Creamos una nueva página

    // Accedemos a la URL
    await page.goto('https://www.contratacion.euskadi.eus/webkpe00-kpeperfi/es/ac70cPublicidadWar/busquedaAnuncios?locale=es');

    // Aplicamos los filtros
    await page.select('select[name="tipoContrato"]', 'Suministros');  // Seleccionamos 'Suministros'
    await page.select('select[name="estadoTramite"]', 'Abierto');  // Seleccionamos 'Abierto'
    await page.click('button#btnBuscar');
    await page.waitForSelector('div.paginacion');  // Esperamos que aparezca la paginación

    let items = [];  // Arreglo para almacenar los datos extraídos

    // Bucle para recorrer las páginas
    let pageNumber = 1;
    let nextButtonExists = true;

    while (nextButtonExists) {
        console.log(`Extrayendo datos de la página ${pageNumber}`);
        
        await page.waitForSelector('.resultadoItem');
        
        // Extraemos la información de los elementos en la página
        const pageItems = await page.evaluate(() => {
            const items = Array.from(document.querySelectorAll('.resultadoItem'));
            return items.map(item => {
                const title = item.querySelector('h2')?.innerText;
                const date = item.querySelector('.fecha')?.innerText;
                const link = item.querySelector('a')?.href;
                return { title, date, link };
            });
        });

        items = [...items, ...pageItems];

        const nextButton = await page.$('a[aria-label="Siguiente"]');
        if (nextButton) {
            await nextButton.click();
            pageNumber++;
        } else {
            nextButtonExists = false;
        }
    }

    // Guardamos los resultados en formato JSON
    await Apify.setValue('RESULTADOS', items);

    console.log(`Se extrajeron ${items.length} elementos.`);
    
    await browser.close();  // Cierra el navegador
})();
