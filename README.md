# Vanilla Node.js REST-API Template
> Without utilizing Express.js framework to ease the production of a functional REST-API, I created a functional REST-API which can perform complete CRUD operations.

***Note:*** I mainly used a JSON file with the filesystem (FS) module to demonstrate CRUD operations.

By putting myself thru this grueling process, I understand and appreciate the Express.js framework even more, allowing for a faster development lifecycle when trying to get a project to production.
Most importantly, Express.js will make the most sense to utilize especially when working with a production level product.

```
Router file --> server.js
GET      /api/products --> Gets all products listed
POST     /api/products --> Create and add new Product
GET      /api/products/:id --> Gets a Single Product, based on ID
PUT      /api/products/:id --> Updates an existing Product, based on ID
DELETE   /api/products/:id --> Deletes a Single Product, based on ID
```

> Follows MVC architecture

# Usage
For best use of understanding to update and develop new features to the Model & Controller, I suggest using ***Postman*** to test the API.

```
Install Dependencies
> npm install
```
```
Run in Development (nodemon)
> npm run dev
```
```
Run in Production
> npm start
```

# Call to Devs
Please feel free to use this and upgrade the routes; if you would like me to go over this REST-API, please feel free to contact me!
