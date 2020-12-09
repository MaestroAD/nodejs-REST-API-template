let products = require('../data/products.json');
//Get a new ID, npm installed uuid
const { v4: uuidv4 } = require('uuid');

const { writeDataToFile } = require('../utils');

function findAll() {
    return new Promise((resolve, reject) => {
        //Access all the products from the JSON file
        resolve(products);
    });
}

function findById(id) {
    return new Promise((resolve, reject) => {
        //Access product based on id passed in
        const product = products.find((p) => p.id === id);
        resolve(product);
    });
}

function create(product) {
    return new Promise((resolve, reject) => {
        //uuidv4 taken from documentation will automatically increment the **id**
        const newProduct = {id: uuidv4(), ...product};
        products.push(newProduct);
        writeDataToFile('./data/products.json', products);
        resolve(newProduct);
    });
}

function update(id, product) {
    return new Promise((resolve, reject) => {
        //uuidv4 taken from documentation will automatically increment the **id**
        const index = products.findIndex((p) => p.id == id);
        products[index] = {id, ...product};
        writeDataToFile('./data/products.json', products);
        resolve(products[index]);
    });
}

function remove(id) {
    return new Promise((resolve, reject) => {
        products = products.filter((p) => p.id !== id);
        writeDataToFile('./data/products.json', products);
        resolve();
    });
}



module.exports = {
    findAll,
    findById,
    create,
    update,
    remove
}