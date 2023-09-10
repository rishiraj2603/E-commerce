
const express = require('express');
const router = express.Router();
const Product = require('../models/product');
const Review = require('../models/review');


router.post('/products/:productId/review', async (req, res)=>{
    const {productId} = req.params;
    const {rating, comment} = req.body;

    console.log('Review Added!');

    const newReview = await Review.create({rating, comment});
    const product = await Product.findById(productId);

    const newAvgRating = ((product.avgRating * product.reviews.length) + parseInt(req.body.rating)) / (product.reviews.length + 1);
    product.avgRating = parseFloat(newAvgRating.toFixed(1));

    product.reviews.push(newReview);

    await product.save();

    res.redirect('back');
});


module.exports = router;