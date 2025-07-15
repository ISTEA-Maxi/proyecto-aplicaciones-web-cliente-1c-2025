const API_TOKEN = 'patmEZOBVLeLU083n.5aeded1e44694383dc421f9c9ba1142ef3e87d0f4cb6391e069f4c954ba3d8d8';
const BASE_ID = 'appEkSAE3cbrknyGI';
const TABLE_NAME = 'Parts';
const API_URL = `https://api.airtable.com/v0/${BASE_ID}/${TABLE_NAME}`;

// Obtener referencia del ID desde la URL si existe (para editar)
const productId = new URLSearchParams(window.location.search).get('id');

// Crear una fila en la tabla del admin/index.html
function createProductRow(product) {
    const row = document.createElement('tr');

    const description = document.createElement('td');
    description.textContent = product.description;

    const price = document.createElement('td');
    price.textContent = `$${product.price}`;

    const actions = document.createElement('td');
    const button = document.createElement('button');
    button.textContent = 'Modificar';

    // Al hacer click, redirige a la página de edición con el ID del producto
    button.onclick = () => {
        window.location.href = `/admin/edit-product.html?id=${product.id}`;
    };

    actions.appendChild(button);
    row.appendChild(description);
    row.appendChild(price);
    row.appendChild(actions);

    return row;
}

// Renderizar los productos en la tabla de admin/index.html
function renderProducts(products) {
    const grid = document.querySelector('#products-list');
    if (!grid) return;

    products.forEach(product => {
        const row = createProductRow(product);
        grid.appendChild(row);
    });
}

// Trae todos los productos desde airtable
async function getProducts() {
    const response = await fetch(API_URL, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${API_TOKEN}`,
            'Content-Type': 'application/json'
        }
    });
    const data = await response.json();

    // Mapeamos los datos a un formato más manejable
    const products = data.records.map(item => ({
        id: item.id,
        title: item.fields.title,
        brand: item.fields.brand,
        model: item.fields.model,
        description: item.fields.description,
        image: item.fields.image,
        price: item.fields.price
    }));

    renderProducts(products);
}

// Traer un producto por ID (para editar)
async function getProductById(id) {
    const response = await fetch(`${API_URL}/${id}`, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${API_TOKEN}`,
            'Content-Type': 'application/json'
        }
    });
    const data = await response.json();
    return data.fields;
}

// Actualizar un producto existente en airtable
async function updateProductAirtable(product) {
    const itemAirtable = {
        fields: product
    };

    const response = await fetch(`${API_URL}/${productId}`, {
        method: 'PATCH',
        headers: {
            'Authorization': `Bearer ${API_TOKEN}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(itemAirtable)
    });

    return response.json();
}

// Manejar el submit del formulario de edición
function updateSubmit(event) {
    event.preventDefault(); // Prevenimos recarga

    // Obtenemos los valores del formulario
    const brand = document.querySelector('#product-brand').value;
    const model = document.querySelector('#product-model').value;
    const title = document.querySelector('#product-title').value;
    const description = document.querySelector('#product-description').value;
    const image = document.querySelector('#product-image').value;
    const price = document.querySelector('#product-price').value;

    const product = {
        brand,
        model,
        title,
        description,
        image,
        price
    };

    // Actualizamos en airtable y damos feedback
    updateProductAirtable(product).then(() => {
        alert('Producto actualizado correctamente');
        window.location.href = '/admin/index.html';
    });
}

// Precargar los datos del producto a editar en el formulario
async function loadEditForm() {
    if (!productId) return;

    const product = await getProductById(productId);
    if (!product) return;

    document.querySelector('#product-brand').value = product.brand || '';
    document.querySelector('#product-model').value = product.model || '';
    document.querySelector('#product-title').value = product.title || '';
    document.querySelector('#product-description').value = product.description || '';
    document.querySelector('#product-image').value = product.image || '';
    document.querySelector('#product-price').value = product.price || '';
}

// Inicializador general para detectar en qué página estamos y ejecutar lo necesario
document.addEventListener('DOMContentLoaded', () => {
    getProducts(); // siempre se ejecuta

    const form = document.querySelector('form');
    if (form) {
        loadEditForm();
        form.addEventListener('submit', updateSubmit);
    }
});
