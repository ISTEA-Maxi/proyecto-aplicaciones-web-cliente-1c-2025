const API_TOKEN = 'patmEZOBVLeLU083n.5aeded1e44694383dc421f9c9ba1142ef3e87d0f4cb6391e069f4c954ba3d8d8';
const BASE_ID = 'appEkSAE3cbrknyGI';
const TABLE_NAME = 'Parts';
const API_URL = `https://api.airtable.com/v0/${BASE_ID}/${TABLE_NAME}`;

const products = []; //creamos la variable products vacio para despues llenarlo cuando hace la llamada
const cartProducts = JSON.parse(localStorage.getItem('cart')) || []; //obtenemos los productos del carrito del localstorage
const grid = document.querySelector('.grilla-productos'); //seleccionamos el grid principal

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

getProducts(); //llamamos a la funcion para que aparezca los productos de la API

function createProductCard(products) {
    const card = document.createElement('article'); //creamos la tarjeta
    card.classList.add('tarjeta-articulos');

    const img = document.createElement('img'); //creamos la imagen
    img.src = products.image;
    img.alt = products.title;

    const title = document.createElement('h3'); //creamos el titulo
    title.textContent = `${products.brand} ${products.model} ${products.title}`;

    const description = document.createElement('p'); //creamos la descripcion
    description.textContent = products.description;

    const price = document.createElement('p'); //creamos el precio
    price.textContent = `$${products.price}`;

    const button = document.createElement('button'); //creamos el boton
    button.textContent = 'Agregar al carrito';
    button.addEventListener('click', () => {
        const exists = cartProducts.find(p => p.description === products.description); //verifica si el producto ya existe en el carrito
        if (!exists) { //si no existe
            cartProducts.push(products); //agrega el producto al carrito
            localStorage.setItem('cart', JSON.stringify(cartProducts)); //guarda el carrito en el localstorage
            alert('Producto agregado al carrito');
        } else {
            alert('El producto ya está en el carrito');
        }
    });

    card.appendChild(img);
    card.appendChild(title);
    card.appendChild(description);
    card.appendChild(price);
    card.appendChild(button);
    return card; //retornamos la tarjeta
}

function renderProducts(list) {
    grid.innerHTML = ''; //limpia el grid
    list.forEach(product => { //recorre todo el vector
        const card = createProductCard(product); //creamos la tarjeta
        grid.appendChild(card); //inserta los productos
    });
}

// FUNCION FILTRO
const searchInput = document.querySelector('#input-search-filter'); //input de búsqueda
const priceMinInput = document.querySelector('#precio-min'); //input precio mínimo
const priceMaxInput = document.querySelector('#precio-max'); //input precio máximo

function filterProducts() {
    const text = searchInput.value.toLowerCase(); //valor de búsqueda en minúscula
    const priceMin = parseFloat(priceMinInput.value) || 0; //valor mínimo o 0 si está vacío
    const priceMax = parseFloat(priceMaxInput.value) || Infinity; //valor máximo o infinito si está vacío

    const filtered = products.filter(product => {
        const matchText = `${product.description}`.toLowerCase().includes(text); //originalmente se podia buscar por titulo, marca, modelo, pero eso duplicaba las tarjetas
        const matchPrice = product.price >= priceMin && product.price <= priceMax;
        return matchText && matchPrice; //cumple los 2 filtros, el texto y el precio, ya sea que este seteado o no
    });

    renderProducts(filtered); //renderiza los productos filtrados
}

//event listeners para activar el filtro
searchInput.addEventListener('input', filterProducts);
priceMinInput.addEventListener('input', filterProducts);
priceMaxInput.addEventListener('input', filterProducts);