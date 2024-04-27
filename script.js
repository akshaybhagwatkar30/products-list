document.addEventListener('DOMContentLoaded', function () {
    const productList = document.getElementById('product-list');
    const categoryFilter = document.getElementById('category');
    const sortBy = document.getElementById('sortBy');
    const searchInput = document.getElementById('search');

    // Fetch products from API
    fetchProducts();

    // Fetch categories from API and populate dropdown
    fetchCategories();

    // Event listeners
    categoryFilter.addEventListener('change', fetchProducts);
    sortBy.addEventListener('change', fetchProducts);
    searchInput.addEventListener('input', filterProducts);

    async function fetchProducts() {
        const category = categoryFilter.value;
        const sort = sortBy.value;
        const response = await fetch(`https://fakestoreapi.com/products${category !== 'all' ? `?category=${category}` : ''}`);
        const products = await response.json();
        displayProducts(sortProducts(products, sort));
    }

    async function fetchCategories() {
        const response = await fetch('https://fakestoreapi.com/products/categories');
        const categories = await response.json();
        categories.forEach(category => {
            const option = document.createElement('option');
            option.textContent = category;
            option.value = category;
            categoryFilter.appendChild(option);
        });
    }

    function displayProducts(products) {
        productList.innerHTML = '';
        products.forEach(product => {
            const productItem = document.createElement('div');
            productItem.classList.add('product');
            productItem.innerHTML = `
                <img src="${product.image}" alt="${product.title}">
                <h3>${product.title}</h3>
                <p>$${product.price}</p>
            `;
            productList.appendChild(productItem);
        });
    }

    function sortProducts(products, sort) {
        if (sort === 'asc') {
            return products.sort((a, b) => a.price - b.price);
        } else {
            return products.sort((a, b) => b.price - a.price);
        }
    }

    function filterProducts() {
        const searchTerm = searchInput.value.toLowerCase();
        const filteredProducts = products.filter(product => product.title.toLowerCase().includes(searchTerm));
        displayProducts(filteredProducts);
    }
});
