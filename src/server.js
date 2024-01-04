// ***** Modules *****
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var cors = require('cors');

app.use(cors());

// Initialize database 
var db = mongoose.connect('mongodb://db:27017/swag-shop') 
        .then(() => {
            console.log('MongoDB is connected.');
        })
        .catch(err => console.log(err.message));


var Product = require('./model/product');
var Wishlist = require('./model/wishlist');
// const product = require('./model/product');
// const wishlist = require('./model/wishlist');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false})); // extended: false -> reject any weird format

// ***** Body *****
app.get('/', function(request, response) {
    response.send("Hello");
});

// ==== Product ====
app.get('/product', function(request, response) {
    // Product.find({}, function(err, products){
    //     if (err) {
    //         response.status(500).send({error: "Could not fetch products"});  
    //     } else {
    //         // Because it runs asynchronously (run on different thread), 
    //         // we put this inside to ensure (promise) that it will run correctly. 
    //         response.send(products) ; 
    //     }
    // });

    Product.find({})
        .then(products => {
            response.status(200).send(products);
        })
        .catch(err => {
            response.status(500).send({error: "Could not fetch product"});
        }); 
    
});

app.post('/product', function(request, response) {
    // below code is equivalent to:
    //   var product = new Product({title: request.body.title, request.body.price});
    var product = new Product();
    product.title = request.body.title;
    product.price = request.body.price;
    product.likes = 0;   

    // In Node v18.17.0, using callback for save function is deprecated and will return error below:
    //  new MongooseError('Model.prototype.save() no longer accepts a callback');

    // product.save(async function(err, savedProduct) {
    //     if(err) {
    //         response.status(500).send({error:"Could not save product"});
    //     } else {
    //         response.send(savedProduct);
    //     }
    // });

    // Use Promises, as follows
    product.save()
        .then(savedProduct => {
            response.send(savedProduct);
        })
        .catch(err => {
            response.status(500).send({error: "Could not save product"});
        });
});


// ==== Wishlist ====
app.get('/wishlist', function(request, response) {
    // we use populate to make the products field not only filled with id, but also its contents
    // using only find, we just get this:
    // [
    //     {
    //         "_id": "64cbe281bb704434024b4467",
    //         "products": [
    //             "64c724f0dcec8a7948227ae1",
    //         ],
    //         "title": "My video game ",
    //         "__v": 0
    //     }
    // ]
    // with populate, we get this:
    // [
    //     {
    //         "_id": "64cbe281bb704434024b4467",
    //         "products": [
    //             {
    //                 "_id": "64c724f0dcec8a7948227ae1",
    //                 "likes": 0,
    //                 "title": "Book 1",
    //                 "price": 19,
    //                 "__v": 0
    //             }
    //         ],
    //         "title": "My video game ",
    //         "__v": 0
    //     }
    // ]
    Wishlist.find({}).populate({path:'products', model: 'Product'}).exec()
        .then(wishlists => {
                response.status(200).send(wishlists);
        })
        .catch(err => {
                response.status(500).send({error: "Could not fetch wishlists"})
        });
});

app.post('/wishlist', function(request, response){
    var wishlist = new Wishlist();
    wishlist.title = request.body.title;

    wishlist.save()
        .then(newWishlist => {
            response.send(newWishlist);
        })
        .catch(err => {
            response.status(500).send({error:"Could not create wishlist"})
        });
});


app.put('/wishlist/product/add', function(request, response) {
    /*
    Adding a product to existing wishlist
    */
    Product.findOne({_id: request.body.productId})
        .then( product => {
            // update the wishlist
            Wishlist.updateOne({_id: request.body.wishlistId}, {$addToSet: {products: product._id}})
                .then(wishlist => {
                    response.send(wishlist);
                }) 
                .catch(err => {
                    response.status(500).send({error:"could not add item to wishlist"});
                });
        })
        .catch(err => {
            response.status(500).send({error:"could not add item to wishlist"});
        });
});  

// bind and listen to the connections on the specified host and port
var PORT = 3004;
app.listen(PORT, function(){
    console.log("Website API running on port " + PORT + '...');
});