const express = require("express");
const Product = require("../models/product");
const { validateData, isLoggedIn,isSeller,isAuthor} = require("../middleware");
const router = express.Router();


router.get('/products', async (req, res) => {
    try {
        const products = await Product.find({});
        res.render('products/index.ejs', { products })
    } catch (error) {
        console.log(error)
    }
})

router.get('/products/new', isLoggedIn, isSeller , (req, res) => {
    try {
        res.render('products/new.ejs')
    } catch (error) {
        console.log(error)
    }
})

router.post('/products',isLoggedIn,isSeller, validateData , async (req, res) => {
    try {
        const { name, image, price, description } = req.body;
        await Product.create({ name, image, price, description, author:req.user._id  });
        req.flash('success', 'Successfully added your product!');
        res.redirect('/products');
    } catch (error) {
        console.log(error)
    }
})

router.get('/products/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const product = await Product.findById(id).populate('reviews');
        // console.log(Product.findById(id))
        res.render('products/show', { product });
    } catch (error) {
        console.log(error)
    }

});

router.get('/products/:id/edit', isLoggedIn, isSeller,isAuthor, async (req, res) => {
    try {
        const { id } = req.params;
        const product = await Product.findById(id);
        res.render('products/edit', { product });
    } catch (error) {
        console.log(error)
    }

});

router.patch('/products/:id', isLoggedIn,isSeller, validateData, async (req, res) => {
    try {
        const {id} = req.params;
        const { name, image, price, description } = req.body;

        await Product.findByIdAndUpdate(id, { name, image, price, description });
        req.flash('success', 'Changes saved!');
        res.redirect(`/products/${id}`);
    } catch (error) {
        console.log(error);
    }
});

router.delete('/products/:id', isLoggedIn,isSeller , isAuthor , async (req, res) => {
    try {
        const { id } = req.params;
        await Product.findByIdAndDelete(id);
        // console.log((await Product.findById(id)).select({"reviews":1}))
        // await Product.findByIdAndDelete(id).select({"reviews":1});
        req.flash('success', 'Successfully deleted your product!');
        res.redirect('/products');
    } catch (error) {
        console.log(error)
    }
});

module.exports = router;
