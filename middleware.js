const productSchema = require('./joiSchema');
const Product = require('./models/product');

module.exports.validateData = async (req , res , next)=>{
    const {name, image, price, description} = req.body;
    const { error, value } = await productSchema.validate({name, image, price, description});

    if(error){
        const msg = error.message;
        return res.render('error', { err: msg });
    }
    next();
}

module.exports.isLoggedIn = async (req, res, next) => {
    if(req.xhr && !req.isAuthenticated()){
        return res.status(401).json({
            msg:'Plz login first'
        })
    }

    if (!req.isAuthenticated()) {
        req.flash('error', 'Please LogIn first!!');
        return res.redirect('/login');
    }
    next();
}


module.exports.isSeller = (req,res,next) =>{
    
    if(req.user && req.user.role === 'buyer'){
        return res.redirect('back')
    }
    next();
}

module.exports.isAuthor = async (req,res,next)=>{
try {
        const {id} = req.params ;
        const product = await Product.findById(id).populate('author');
        if(product.author._id.toString() !== req.user._id.toString()){
            req.flash('error', 'you are not authorized to do that');
            return res.redirect('back');
        }
} catch (error) {
    console.log(error)
}
    next();
}
