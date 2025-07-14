// Funcion para agregar un nuevo producto
function addProduct(event) {
    event.preventDefault();

    const title = document.getElementById('title').value;
    const brand = document.getElementById('brand').value;
    const model = document.getElementById('model').value;
    const description = document.getElementById('description').value;

    const newProduct = {
        title: title,
        brand: brand,
        model: model,
        description: description,
        image: './img/google.png', 
    };

    // Insertarlo en airtable
    addToAirtable(newProduct); //llamamos a la funcion para agregar el producto a Airtable
    alert('Producto agregado correctamente');

    //const card = createProductCard(newProduct); //creamos la tarjeta del nuevo producto
    //grid.appendChild(card); //insertamos la tarjeta en el grid
}

const button = document.querySelector('#btn-add-product');
//button.addEventListener('click', addProduct); 
button.addEventListener('click', () => {
    addProduct();
    alert('Se agregó un producto'); // muestro un mensaje cada vez que se agrega un producto
});
