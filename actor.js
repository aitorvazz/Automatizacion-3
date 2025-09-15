const Apify = require('apify'); // Asegúrate de que Apify esté correctamente importado
const { chromium } = require('playwright'); // Usamos Playwright para controlar el navegador

(async () => {
    const browser = await chromium.launch(); // Lanzamos Chromium
    const page = await browser.newPage(); // Creamos una nueva página

    // Accedemos a la URL
    await page.goto('https://www.contratacion.euskadi.eus/webkpe00-kpeperfi/es/ac70cPublicidadWar/busquedaAnuncios?locale=es');

    // Aplicamos los filtros
    await page.selectOption('select[name="tipoContrato"]', { label: 'Suministros' }); // Seleccionamos 'Suministros'
    await page.selectOption('select[name="estadoTramite"]', { label: 'Abierto' }); // Seleccionamos 'Abierto'
    
    // Hacemos clic en el botón de buscar
    await page.click('button#btnBuscar');
    await page.waitForSelector('div.paginacion'); // Esperamos que aparezca la paginación

    let items = []; // Arreglo para almacenar los datos extraídos

    // Bucle para recorrer las páginas
    let pageNumber = 1;
    let nextButtonExists = true;

    while (nextButtonExists) {
        console.log(`Extrayendo datos de la página ${pageNumber}`);
        
        // Esperamos a que los elementos de la página se carguen
        await page.waitForSelector('.resultadoItem');
        
        // Extraemos la información de los elementos en la página
        const pageItems = await page.$$eval('.resultadoItem', (items) => {
            return items.map(item => {
                const title = item.querySelector('h2')?.innerText;
                const date = item.querySelector('.fecha')?.innerText;
                const link = item.querySelector('a')?.href;
                return { title, date, link };
            });
        });
        
        // Agregamos los elementos extraídos a la lista principal
        items = [...items, ...pageItems];

        // Revisa si hay una siguiente página
        const nextButton = await page.$('a[aria-label="Siguiente"]');
        if (nextButton) {
            // Si existe, pasa a la siguiente página
            await nextButton.click();
            pageNumber++;
        } else {
            // Si no existe, termina el bucle
            nextButtonExists = false;
        }
    }

    // Guardamos los resultados en formato JSON
    await Apify.setValue('RESULTADOS', items);

    console.log(`Se extrajeron ${items.length} elementos.`);
    
    // Cerramos el navegador
    await browser.close();
})();
