const express = require('express');
const router = express.Router();
const passport = require('passport');

// const router= require('express').Router();

const User = require('../models/user');
const bcrypt = require('bcrypt');

router.get('/login', (req, res) => {
    res.render('users/login.ejs')
});

router.get('/signup', (req, res) => {
    res.render('users/signup.ejs')
});

router.post('/signup', async (req, res) => {
try {
    const { username, password, email, role } = req.body;

    const user = new User({ username, email, role });
    const userSave = await User.register(user, password);

    await userSave.save();

    res.redirect('/login');
} catch (error) {
    // res.render('error')
    console.log(error)
}
})

router.post('/login', passport.authenticate('local', { failureRedirect: '/login' }),(req, res)=>{
    req.flash('success', `Welcome,${req.user.username}`)
    // console.log(req.user)
    res.redirect('/products');

});

router.get('/logout', function(req, res, next) {
    req.logout(function(err) {
      if (err) { return next(err); }
      res.redirect('/login');
    });
  });










module.exports = router;

