const { Apify } = require('apify');
const { chromium } = require('playwright');

Apify.main(async () => {
    const browser = await chromium.launch(); // Lanza el navegador Chromium
    const page = await browser.newPage(); // Crea una nueva página en el navegador

    // Accede a la URL
    await page.goto('https://www.contratacion.euskadi.eus/webkpe00-kpeperfi/es/ac70cPublicidadWar/busquedaAnuncios?locale=es');

    // Aplica los filtros
    await page.selectOption('select[name="tipoContrato"]', { label: 'Suministros' }); // Selecciona 'Suministros'
    await page.selectOption('select[name="estadoTramite"]', { label: 'Abierto' }); // Selecciona 'Abierto'
    
    // Haz click en el botón de buscar
    await page.click('button#btnBuscar');
    await page.waitForSelector('div.paginacion'); // Espera que aparezca la paginación

    let items = []; // Arreglo para almacenar los datos extraídos

    // Bucle para recorrer las páginas
    let pageNumber = 1;
    let nextButtonExists = true;

    while (nextButtonExists) {
        console.log(`Extrayendo datos de la página ${pageNumber}`);
        
        // Espera a que los elementos de la página se carguen
        await page.waitForSelector('.resultadoItem');
        
        // Extrae la información de los elementos en la página
        const pageItems = await page.$$eval('.resultadoItem', (items) => {
            return items.map(item => {
                const title = item.querySelector('h2')?.innerText;
                const date = item.querySelector('.fecha')?.innerText;
                const link = item.querySelector('a')?.href;
                return { title, date, link };
            });
        });
        
        // Agrega los elementos extraídos a la lista principal
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

    // Guarda los resultados en formato JSON
    await Apify.setValue('RESULTADOS', items);

    console.log(`Se extrajeron ${items.length} elementos.`);
    
    // Cierra el navegador
    await browser.close();
});

