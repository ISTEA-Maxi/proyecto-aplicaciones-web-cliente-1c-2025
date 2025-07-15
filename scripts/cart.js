// FUNCION DE CARRITO
const cartProducts = JSON.parse(localStorage.getItem('cart')) || []; //obtenemos los productos del carrito del localstorage

function createProductCartCard(products) {
    const card = document.createElement('article'); //creamos la tarjeta
    card.classList.add('tarjeta-articulos');

    const img = document.createElement('img'); //creamos la imagen
    img.src = products.image;
    img.alt = products.title;

    const title = document.createElement('h3'); //creamos el titulo
    title.textContent = `${products.brand} ${products.model} ${products.title}`;

    const price = document.createElement('p'); //creamos el precio
    price.textContent = `$${products.price}`;

    const button = document.createElement('button'); //creamos el boton
    button.textContent = 'Eliminar';
    button.addEventListener('click', () => {
        const exists = cartProducts.findIndex(p => p.description === products.description);
        if (exists !== -1) {
            cartProducts.splice(exists, 1); // elimina el producto
            localStorage.setItem('cart', JSON.stringify(cartProducts)); // actualiza el localStorage
            alert('Producto eliminado del carrito');
            renderCartProducts(cartProducts); // vuelve a mostrar el carrito actualizado
    }
});


    card.appendChild(img);
    card.appendChild(title);
    card.appendChild(price);
    card.appendChild(button);
    return card; //retornamos la tarjeta
}

function renderCartProducts() {
    const cartGrid = document.querySelector('.cart-grid'); //seleccionamos el grid del carrito
    const currentCart = JSON.parse(localStorage.getItem('cart')) || [];
    cartGrid.innerHTML = ''; //limpiamos el grid antes de agregar los productos
    currentCart.forEach(product => {
        const card = createProductCartCard(product);
        cartGrid.appendChild(card);
    });
}

renderCartProducts(); //llamamos a la funcion para que aparezca