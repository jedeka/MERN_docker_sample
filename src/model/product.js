/*
MongoDB database schema modeling with mongoose
*/

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// Schema of 'product' database collection; the columns and types
var product = new Schema({
    title: String,
    price: Number, 
    likes: {type: Number, default: 0}
});

module.exports = mongoose.model('Product', product);