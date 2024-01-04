/*
MongoDB database schema modeling with mongoose
*/

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = mongoose.Schema.Types.ObjectId;

// Schema of 'wishlist' database collection; the columns and types
var wishlist = new Schema({
    title: String,
    products: [{type: ObjectId, ref:'Product'}] // creating database relation by referencing 'Product' 
});

module.exports = mongoose.model('Wishlist', wishlist);