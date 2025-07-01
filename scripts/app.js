const products = [
    {
        name: "Camiseta",
        description: "Camiseta de algodon 100%",
        image: "./img/google.png",
        price: 15,
        deliveryFree: true,
    },
    {
        name: "Pantalon",
        description: "Pantalon largo",
        image: "./img/google.png",
        price: 20,
        deliveryFree: true,
    },
    {
        name: "Zapatos",
        description: "Zapatos de cuero",
        image: "./img/google.png",
        price: 30,
        deliveryFree: false,
    },
    {
        name: "Gorro",
        description: "Gorro de sol",
        image: "./img/google.png",
        price: 10,
        deliveryFree: false,
    },
];

const grid = document.querySelector('.grilla-productos');
const searchInput = document.querySelector('#input-search-filter');
const deliveryFreeCheckbox = document.querySelector('#delivery-free');

function createProductCard(products) {
    const card = document.createElement('article'); //creamos la tarjeta
    card.classList.add('tarjeta-articulos');

    const img = document.createElement('img'); //creamos la imagen
    img.src = products.image;
    img.alt = products.name;

    const title = document.createElement('h3'); //creamos el titulo
    title.textContent = products.name;

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
        name: "Nuevo Producto",
        description: "Descripcion del nuevo producto",
        image: "./img/google.png",
        price: 25,
        deliveryFree: false,
    };
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
    alert('Se agregó un producto'); // muestor un mensaje cada vez que se agrega un producto
});

const getProducts = async () => { //meto la funcion async dentro de la variable getProducts
    const response = await fetch('https://dummyjson.com/products'); //obtenemos los productos de la API
    const data = await response.json(); //convertimos la respuesta a JSON
    console.log('data', data.products); //mostramos los productos en la consola
}

getProducts(); //llamamos a la funcion para que aparezca los productos de la API