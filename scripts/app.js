const API_TOKEN = 'patmEZOBVLeLU083n.5aeded1e44694383dc421f9c9ba1142ef3e87d0f4cb6391e069f4c954ba3d8d8';
const BASE_ID = 'appEkSAE3cbrknyGI';
const TABLE_NAME = 'Parts';
const API_URL = `https://api.airtable.com/v0/${BASE_ID}/${TABLE_NAME}`;

const products = []; //creamos la variable products vacio para despues llenarlo cuando hace la llamada

const addToAirtable = async (product)=>{
    const itemAirtable = {
        fields: product //creamos el objeto que vamos a enviar a Airtable
    };

    fetch (API_URL, {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${API_TOKEN}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(itemAirtable)
    }).then(data => console.log(data));
}

const getProducts = async () => { //meto la funcion async dentro de la variable getProducts
    const response = await fetch(API_URL, { 
        method: 'GET', //metodo GET para obtener los datos
        headers: {
            'Authorization': `Bearer ${API_TOKEN}`, //autorizacion para acceder a la API
            'Content-Type': 'application/json' //tipo de contenido que vamos a enviar
        }
    }); 
    const data = await response.json(); //convertimos la respuesta a JSON
    console.log('data', data); //mostramos los productos en la consola

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
    console.log(productsMaped); 
    renderProducts(productsMaped); //mostramos en el grid los productos obtenidos de la API
}

getProducts(); //llamamos a la funcion para que aparezca los productos de la API

const grid = document.querySelector('.grilla-productos');
const searchInput = document.querySelector('#input-search-filter');
const deliveryFreeCheckbox = document.querySelector('#delivery-free');

function createProductCard(products) {
    const card = document.createElement('article'); //creamos la tarjeta
    card.classList.add('tarjeta-articulos');

    const img = document.createElement('img'); //creamos la imagen
    img.src = products.image;
    img.alt = products.title;

    const title = document.createElement('h3'); //creamos el titulo
    //title.textContent = products.title+products.brand;
    title.textContent = `${products.brand} ${products.model} ${products.title}`;


    const description = document.createElement('p'); //creamos la descripcion
    description.textContent = products.description;

    const price = document.createElement('p'); //creamos el precio
    price.textContent = `$${products.price}`;

    const button = document.createElement('button'); //creamos el boton
    button.textContent = 'Buy!';

    card.appendChild(img);
    card.appendChild(title);
    card.appendChild(description);
    card.appendChild(price);
    card.appendChild(button);
    return card; //retornamos la tarjeta
}

// Funcion para agregar un nuevo producto
function addProduct() {
    const newProduct = {
        title: "Nuevo Producto",
        description: "Descripcion del nuevo producto",
        image: "./img/google.png",
        price: 25,
        deliveryFree: false,
    };

    // Insertarlo en airtable
    addToAirtable(newProduct); //llamamos a la funcion para agregar el producto a Airtable

    const card = createProductCard(newProduct); //creamos la tarjeta del nuevo producto
    grid.appendChild(card); //insertamos la tarjeta en el grid
}

function renderProducts(list) {
    list.forEach(product => { //recorre todo el vector
        const card = createProductCard(product); //creamos la tarjeta
        grid.appendChild(card); //inserta lo productos
    });
}

// FUNCION DE FILTRO
function filterProducts(text){
    const filteredProducts = products.filter(product => {
        return product.name.toLowerCase().includes(text.toLowerCase()) //filtra sin importar la mayuscula o minuscula
        && (product.deliveryFree === deliveryFreeCheckbox.checked || !deliveryFreeCheckbox.checked); //filtra por el checkbox
    });
    grid.innerHTML = ''; //limpia el grid
    renderProducts(filteredProducts); //llamamos a la funcion para que aparezca
}

searchInput.addEventListener('input', (event) => {
    filterProducts(event.target.value); //captura el valor del input
});

deliveryFreeCheckbox.addEventListener('change', () => {
    filterProducts(searchInput.value); //con esto filtramos los productos cuando se cambia el checkbox
});

renderProducts(products); //llamamos a la funcion para que aparezca

const button = document.querySelector('#btn-add-product');
//button.addEventListener('click', addProduct); 
button.addEventListener('click', () => {
    addProduct();
    alert('Se agregó un producto'); // muestro un mensaje cada vez que se agrega un producto
});