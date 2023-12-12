require('dotenv').config();
const mongoose = require('mongoose');
const Product = require("./models/product");
const MONGO_DB_URL = process.env.MONGO_DB_URL || 'mongodb://127.0.0.1:27017/E-Com-DB';



mongoose.connect(MONGO_DB_URL)
 .then(()=>{
    console.log('mongoDB running')
 })
 .catch((err)=>{
   console.log(err);
 })


const dummyData = [{
    name:"Telephone",
    image:'https://images.unsplash.com/photo-1520923642038-b4259acecbd7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8dGVsZXBob25lfGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=60',
    price:300,
    description:'Lorem ipsum dolor sit amet consectetur adipisicing elit. Ea sunt unde tempora voluptatibus iusto explicabo eveniet perferendis dolorem, aliquid, quidem illo est earum quia, quam omnis accusantium! Enim, quas maiores.'
},
{
    name:"Car",
    image:'https://images.unsplash.com/photo-1494976388531-d1058494cdd8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8Y2FyfGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=60',
    price:230,
    description:'Lorem ipsum dolor sit amet consectetur adipisicing elit. Ea sunt unde tempora voluptatibus iusto explicabo eveniet perferendis dolorem, aliquid, quidem illo est earum quia, quam omnis accusantium! Enim, quas maiores.'
},
{
    name:"Watch",
    image:'https://images.unsplash.com/photo-1542496658-e33a6d0d50f6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8d2F0Y2h8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=800&q=60',
    price:500,
    description:'Lorem ipsum dolor sit amet consectetur adipisicing elit. Ea sunt unde tempora voluptatibus iusto explicabo eveniet perferendis dolorem, aliquid, quidem illo est earum quia, quam omnis accusantium! Enim, quas maiores.'
},
{
    name:"Laptop",
    image:'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8bGFwdG9wfGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=60',
    price:200,
    description:'Lorem ipsum dolor sit amet consectetur adipisicing elit. Ea sunt unde tempora voluptatibus iusto explicabo eveniet perferendis dolorem, aliquid, quidem illo est earum quia, quam omnis accusantium! Enim, quas maiores.'

},
{
    name:"Headphone",
    image:'https://images.unsplash.com/photo-1546435770-a3e426bf472b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fGhlYWRwaG9uZXxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60',
    price:300,
    description:'Lorem ipsum dolor sit amet consectetur adipisicing elit. Ea sunt unde tempora voluptatibus iusto explicabo eveniet perferendis dolorem, aliquid, quidem illo est earum quia, quam omnis accusantium! Enim, quas maiores.'
    },
{
    name:"Bag",
    image:'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8YmFnfGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=60',
    price:300,
    description:'Lorem ipsum dolor sit amet consectetur adipisicing elit. Ea sunt unde tempora voluptatibus iusto explicabo eveniet perferendis dolorem, aliquid, quidem illo est earum quia, quam omnis accusantium! Enim, quas maiores.'
    },
{
    name:"Jet",
    image:'https://images.unsplash.com/photo-1474302770737-173ee21bab63?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8amV0fGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=60',
    price:23000,
    description:'Lorem ipsum dolor sit amet consectetur adipisicing elit. Ea sunt unde tempora voluptatibus iusto explicabo eveniet perferendis dolorem, aliquid, quidem illo est earum quia, quam omnis accusantium! Enim, quas maiores.'
    },
]

async function sendData(){
// await Product.deleteMany({})
await Product.create(dummyData)
}

sendData();