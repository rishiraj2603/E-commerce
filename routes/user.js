const express = require('express');
const router = express.Router();
const User = require('../models/user');
// const bcrypt = require('bcrypt');


router.get('/signup', (req, res) => {
    res.render('users/signup.ejs')
});

router.post('/signup', async (req, res) => {
    const { username, password, email } = req.body;
    const user = await User.findOne({ username });
    // console.log(user);
   const hashPassword = await bcrypt.hash(password, 10);
    if (!user) {
        await User.create({ username,  password:hashPassword, email });
        // const encrypted = encryptpwd.encrypt(password);
        // console.log(user);
        
        return res.redirect('/login');
    }
    else{
        // console.log('here')
         return res.redirect('back')
    }
   
});

router.get('/login', (req, res) => {
    res.render('users/login.ejs')
});

router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (user) {
        if (user.password === password) {
            req.session.user_id = user._id;
            return res.redirect('/');
        }
        // const isValid = await bcrypt.compare(password, user.password);
        // if(isValid){
        //     req.session.user_id = user;
        //     return res.redirect('/');

        // }
        return res.redirect('/login');
    }

    return res.redirect('/signup');


})



module.exports = router ;


