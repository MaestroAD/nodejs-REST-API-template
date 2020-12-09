//Bring in HTTP module which is already packaged with Node.js;
//compared to Express and other frameworks, who already have this 'under the hood'
const http = require('http');
//Destrcutured to get the functions straight from the controller
const { getProducts, getProduct, createProduct, updateProduct, deleteProduct } = require('./controllers/productControllers');


//Create Entry point
const server = http.createServer((req, resp) => {
    /*
    //We want to first establish a status code, assuming everything is okay
    //respond with Status Code 200 OK
    resp.statusCode = 200;
    //Then we want to send/respond back with the content type we are sending back.
    resp.setHeader('Content-Type', 'text/html');
    resp.write('<h1>Hello World!</h1>');
    //End of Response.
    resp.end();
    */
    //If we were to request a specific URL, we can check if it matches and then
    //display the JSON according to server request. In addition, we want to make
    //sure the request method is only a get in this case.
    
    if(req.url === '/api/products' && req.method === 'GET'){
        //Call controller function (GET **products**)
        getProducts(req, resp);
        /*
        //To simplify everything written above we can just use .writeHead
        This can then be transferred to a controller
         resp.writeHead(200, {'Content-Type': 'application/json'});
         resp.end(JSON.stringify(products));
         */
    }
    //Call controller to retrieve a **product**
    else if(req.url.match(/\/api\/products\/\w+/) && req.method === 'GET'){
        /*
        To get the id, I will split the url request by ('/')
        to get an array of [api,products,#], and we want the ID so arr[index = 3]
        */
        const id = req.url.split('/')[3];
        getProduct(req, resp, id);
    }
    //Call controller to add a product
    else if(req.url === '/api/products' && req.method === 'POST') {
        createProduct(req, resp);
    }
    else if(req.url.match(/\/api\/products\/\w+/) && req.method === 'PUT'){
        const id = req.url.split('/')[3];
        updateProduct(req, resp, id);
    }
    else if(req.url.match(/\/api\/products\/\w+/) && req.method === 'DELETE'){
        const id = req.url.split('/')[3];
        deleteProduct(req, resp, id);
    }
    else {
        resp.writeHead(200, {'Content-Type': 'application/json'});
        resp.end(JSON.stringify({message: 'Route Not Found'}));
    }
    
});

//Create variable PORT, to store location of server.
//In this case, I want to check if there is a environment variable or just simply
//create one at PORT = 5000
const PORT = process.env.PORT || 5000;

//Boot up server at PORT location, console logging the location to identify locaiton.
server.listen(PORT, () => console.log(`Server running on port: ${PORT}`));
