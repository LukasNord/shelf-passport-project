const mongoose = require('mongoose');

const Schema = mongoose.Schema;

// Mongoose Schema
const ItemSchema = new Schema({
    itemName: String,
    placer: {type: mongoose.Schema.ObjectId, ref: 'Users'},
    description: String,
    imageUrl: String

});





module.exports = mongoose.model('Item', ItemSchema);
