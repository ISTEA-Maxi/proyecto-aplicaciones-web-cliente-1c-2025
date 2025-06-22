const products = [
    {
        name: "Camiseta",
        description: "Camiseta de algodon 100%",
        image: "./img/google.png",
        price: 15,
    },
    {
        name: "Pantalon",
        description: "Pantalon largo",
        image: "./img/google.png",
        price: 20,
    },
    {
        name: "Zapatos",
        description: "Zapatos de cuero",
        image: "./img/google.png",
        price: 30,
    },
    {
        name: "Gorro",
        description: "Gorro de sol",
        image: "./img/google.png",
        price: 10,
    },
];

const grid = document.querySelector('.grilla-productos');

function createproductcard(products) {
    const card = document.createElement('article'); /*creamos la tarjeta*/
    card.classList.add('tarjeta-articulos');

    const img = document.createElement('img'); /*creamos la imagen*/
    img.src = products.image;
    img.alt = products.name;

    const title = document.createElement('h3'); /*creamos el titulo*/
    title.textContent = products.name;

    const description = document.createElement('p'); /*creamos la descripcion*/
    description.textContent = products.description;

    const price = document.createElement('p'); /*creamos el precio*/
    price.textContent = `$${products.price}`;

    const button = document.createElement('button'); /*creamos el boton*/
    button.textContent = 'Buy!';

    card.appendChild(img);
    card.appendChild(title);
    card.appendChild(description);
    card.appendChild(price);
    card.appendChild(button);
    return card; /*retornamos la tarjeta*/
}

// Funcion para agregar un nuevo producto
function addProduct() {
    const newProduct = {
        name: "Nuevo Producto",
        description: "Descripcion del nuevo producto",
        image: "./img/google.png",
        price: 25,
    };
    const card = createproductcard(newProduct); /*creamos la tarjeta del nuevo producto*/
    grid.appendChild(card); /*insertamos la tarjeta en el grid*/
}

products.forEach(product => { /*recorre todo el vector*/
    const card = createproductcard(product); /*creamos la tarjeta*/
    grid.appendChild(card); /*inserta lo productos*/
});

const button = document.querySelector('#btn-add-product');
button.addEventListener('click', addProduct); 