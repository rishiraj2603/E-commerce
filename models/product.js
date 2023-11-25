const mongoose = require('mongoose');
const Review = require('./review');
const User = require('./user');

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        require: true
    },
    image:[
        {
            type: String  
        }
    ],
        

    price: {
        type: Number,
        require: true,
        min: 0
    },
    description: {
        type: String,
        trim: true,
        require: true
    },
    avgRating: {
        type: Number,
        default: 0
    },
    reviews: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Review'
        }
    ],
    author:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    }

});

const Product = mongoose.model('Product', productSchema)

module.exports = Product;

