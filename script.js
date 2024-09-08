// script.js
document.getElementById('productForm').addEventListener('submit', function(event) {
    event.preventDefault();

    // Get product details from the form
    const name = document.getElementById('productName').value;
    const price = document.getElementById('productPrice').value;
    const description = document.getElementById('productDescription').value;
    const imageInput = document.getElementById('productImage');
    
    // Check if an image is selected
    if (imageInput.files && imageInput.files[0]) {
        const reader = new FileReader();
        reader.onload = function(e) {
            const image = e.target.result;

            // Create a product object
            const product = {
                name,
                price,
                description,
                image
            };

            // Get existing products from local storage
            let products = JSON.parse(localStorage.getItem('products')) || [];

            // Add the new product to the array
            products.push(product);

            // Save back to local storage
            localStorage.setItem('products', JSON.stringify(products));

            // Reset the form
            document.getElementById('productForm').reset();

            // Hide the form and show the link
            document.getElementById('productFormSection').style.display = 'none';
            document.getElementById('addProductLinkSection').style.display = 'block';

            // Update the product list
            displayProducts();
        };
        reader.readAsDataURL(imageInput.files[0]);
    }
});

function displayProducts() {
    const productList = document.getElementById('productList');
    productList.innerHTML = '';

    // Get products from local storage
    const products = JSON.parse(localStorage.getItem('products')) || [];

    // Iterate over products and add them to the list
    products.forEach(product => {
        const li = document.createElement('li');
        li.innerHTML = `
            <img src="${product.image}" alt="${product.name}">
            <strong>${product.name}</strong> - $${product.price}
            <p>${product.description}</p>
        `;
        productList.appendChild(li);
    });
}

// Function to show the form again
document.getElementById('showProductForm').addEventListener('click', function(event) {
    event.preventDefault();
    document.getElementById('productFormSection').style.display = 'block';
    document.getElementById('addProductLinkSection').style.display = 'none';
});

// Display products on page load
document.addEventListener('DOMContentLoaded', displayProducts);



