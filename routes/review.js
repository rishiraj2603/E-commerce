const express = require('express');
const router = express.Router();
const Product = require('../models/product');
const Review = require('../models/review');
const {isLoggedIn} = require("../middleware");

router.post('/products/:productId/review',isLoggedIn, async (req, res)=>{
    const {productId} = req.params;
    const user = req.user;
    const userID = user._id;
    const {rating, comment} = req.body;
    const newReview = await Review.create({rating, comment , user:userID});
    const product = await Product.findById(productId);

    const newAvgRating = ((product.avgRating * product.reviews.length) + parseInt(req.body.rating)) / (product.reviews.length + 1);
    product.avgRating = parseFloat(newAvgRating.toFixed(1));
    product.reviews.push(newReview);

    await product.save();

    res.redirect('back');
});


module.exports = router;