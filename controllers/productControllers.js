const Product = require('../models/productModels');

const { getPostData } = require('../utils');

// @desc    Gets All Products
// @route   GET /api/products
async function getProducts(req, resp) {
    try{
        const products = await Product.findAll()

        resp.writeHead(200, {'Content-Type': 'application/json'});
        resp.end(JSON.stringify(products));
    } catch (error) {
        console.log(error);
    }
}

// @desc    Gets Single Product
// @route   GET /api/product/:id
async function getProduct(req, resp, id) {
    try {
        const product = await Product.findById(id);

        //If product exists
        if(!product){
            resp.writeHead(404, { 'Content-Type': 'application/json' });
            resp.end(JSON.stringify({ message: 'Cannot find product!'}));
        } else {
            resp.writeHead(200, { 'Content-Type': 'application/json' });
            resp.end(JSON.stringify(product));
        }

    } catch (error) {
        console.log(error)
    }
}

// @desc    Create a Product
// @route   POST /api/products
async function createProduct(req, resp) {
    try {
        const body = await getPostData(req);

        const { title, description, price } = JSON.parse(body);

        //Enter the key parts into the object
        const product = {
            title,
            description,
            price
        }

        //set product to variable to upload to model
        const newProduct = await Product.create(product);

        //Then respond with the newProduct
        resp.writeHead(201, { 'Content-Type': 'application/json' });
        return resp.end(JSON.stringify(newProduct));

    } catch (error) {
        console.log(error);
    }
}

// @desc    Update a Product
// @route   PUT /api/products/:id
async function updateProduct(req, resp, id) {
    try {
        const product = await Product.findById(id);

        if(!product) {
            resp.writeHead(404, { 'Content-Type': 'application/json' });
            resp.end(JSON.stringify({ message: 'Cannot find product!'}));
        } else {
            const body = await getPostData(req);

            const { title, description, price } = JSON.parse(body);

            //Enter the key parts into the object
            const productData = {
                title: title || product.title,
                description: description || product.description,
                price: price || product.price
            }

            //set product to variable to upload to model
            const updatedProduct = await Product.update(id, productData);

            //Then respond with the newProduct
            resp.writeHead(200, { 'Content-Type': 'application/json' });
            return resp.end(JSON.stringify(updatedProduct));
        }
    } catch (error) {
        console.log(error);
    }
}

// @desc    Delete Product
// @route   DELETE /api/product/:id
async function deleteProduct(req, resp, id) {
    try {
        const product = await Product.findById(id);

        //If product exists
        if(!product){
            resp.writeHead(404, { 'Content-Type': 'application/json' });
            resp.end(JSON.stringify({ message: 'Cannot find product!'}));
        } else {
            await Product.remove(id);
            resp.writeHead(200, { 'Content-Type': 'application/json' });
            resp.end(JSON.stringify({ message: `Product ${id} removed!`}));
        }

    } catch (error) {
        console.log(error)
    }
}

module.exports = {
    getProducts,
    getProduct,
    createProduct,
    updateProduct,
    deleteProduct
}