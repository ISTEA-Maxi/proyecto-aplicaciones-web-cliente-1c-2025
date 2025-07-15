const API_TOKEN = 'patmEZOBVLeLU083n.5aeded1e44694383dc421f9c9ba1142ef3e87d0f4cb6391e069f4c954ba3d8d8';
const BASE_ID = 'appEkSAE3cbrknyGI';
const TABLE_NAME = 'Parts';
const API_URL = `https://api.airtable.com/v0/${BASE_ID}/${TABLE_NAME}`;

// Enviar el producto nuevo a Airtable
async function addProductAirtable(product) {
    const itemAirtable = {
        fields: product
    };

    const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${API_TOKEN}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(itemAirtable)
    });

    return response.json();
}

// Al enviar el formulario se ejecuta esta función
function submitAddForm(event) {
    event.preventDefault();

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

    addProductAirtable(product).then(() => {
        alert('Producto agregado correctamente');
        window.location.href = '/admin/index.html';
    });
}

// Inicializador del formulario
document.addEventListener('DOMContentLoaded', () => {
    const form = document.querySelector('form');
    if (form) {
        form.addEventListener('submit', submitAddForm);
    }
});