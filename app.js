require('dotenv').config();
const express = require("express");
const app = express();
const path = require("path");
const mongoose = require("mongoose");
const ejsMate = require('ejs-mate')
const { url } = require("inspector");
const methodOverride = require('method-override');
const flash = require('connect-flash');
const session = require('express-session');
const LocalStrategy = require('passport-local');
const passport = require('passport');
const User = require("./models/user");
const secret = process.env.SECRET;
const MONGO_DB_URL = process.env.MONGO_DB_URL || 'mongodb://127.0.0.1:27017/E-Com-DB';



app.engine('ejs', ejsMate);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

mongoose.connect(MONGO_DB_URL)
  .then(() => {
    console.log('mongoDB running')
  })
  .catch((err) => {
    console.log(err);
  });


app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(methodOverride('_method'));
app.use(express.json());

app.use(session({
  secret,
  resave: false,
  saveUninitialized: true,
  cookie:{
    maxAge:7*24*60*60*1000
  }
}));

app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


app.use(flash());

app.use((req, res, next) => {
  res.locals.currentUser = req.user;
  res.locals.success = req.flash('success');
  res.locals.error = req.flash('error');
  next();
})
app.get('/', (req, res) => {
res.render('home');
});

const porductsRoutes = require("./routes/product");
const reviewRoutes = require('./routes/review');
const authentication = require('./routes/authentication');
const cartRoutes = require('./routes/cart');

const productAPI = require('./routes/apis/productApi');
const paymentAPI = require('./routes/apis/paymentApi');

app.use(porductsRoutes);
app.use(reviewRoutes);

app.use(authentication);
app.use(cartRoutes);
app.use(productAPI);
app.use(paymentAPI);

const PORT = 4000;
app.listen(PORT, () => {
  console.log("server is running")
})



