const API_TOKEN = 'patmEZOBVLeLU083n.5aeded1e44694383dc421f9c9ba1142ef3e87d0f4cb6391e069f4c954ba3d8d8';
const BASE_ID = 'appEkSAE3cbrknyGI';
const TABLE_NAME = 'Parts';
const API_URL = `https://api.airtable.com/v0/${BASE_ID}/${TABLE_NAME}`;

const grid = document.querySelector('#products-list'); //seleccionamos el grid donde se van a mostrar los productos

function createProductRow(products) {
    const row = document.createElement('tr');

    const description = document.createElement('td');
    description.textContent = products.description;

    const price = document.createElement('td');
    price.textContent = `$${products.price}`;

    const actions = document.createElement('td');

    const button = document.createElement('button');
    button.textContent = 'Modificar';
    

    actions.appendChild(button);
    row.appendChild(description);
    row.appendChild(price);
    row.appendChild(actions);


    return row;
}

const products = []; //creamos la variable products vacio para despues llenarlo cuando hace la llamada

const getProducts = async () => { //meto la funcion async dentro de la variable getProducts
    const response = await fetch(API_URL, { 
        method: 'GET', //metodo GET para obtener los datos
        headers: {
            'Authorization': `Bearer ${API_TOKEN}`, //autorizacion para acceder a la API
            'Content-Type': 'application/json' //tipo de contenido que vamos a enviar
        }
    }); 
    const data = await response.json(); //convertimos la respuesta a JSON
    //console.log('data', data); //mostramos los productos en la consola

    const productsMaped = data.records.map(item => {
        return {
            title: item.fields.title,
            brand: item.fields.brand,
            model: item.fields.model,
            description: item.fields.description,
            image: item.fields.image,
            price: item.fields.price,
    };
    })
    //console.log(productsMaped); 
    products.push(...productsMaped); //le mando a products el contenido de productsMaped para que funcione el buscador

    renderProducts(productsMaped); //mostramos en el grid los productos obtenidos de la API
}

function renderProducts(list) {
    list.forEach(product => { //recorre todo el vector
        const row = createProductRow(product); //creamos la tarjeta
        grid.appendChild(row); //inserta lo productos
    });
}

getProducts(); //llamamos a la funcion para que aparezca los productos de la API