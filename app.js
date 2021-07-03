const express = require('express');
const app = express();
const morgan = require('morgan');
// const bodyParser = require('body-parser'); 
//NO need of body-parser
const mongoose = require('mongoose');

const productRoutes = require('./api/routes/product');
const orderRoutes = require('./api/routes/order');
const userRoutes = require('./api/routes/user');

mongoose.connect('mongodb+srv://dbuser:' + process.env.MONGO_ATLAS_PW +'@cluster0.tfj6s.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',{
      useMongoClient: true
})

app.use(morgan('dev'));
app.use(express.urlencoded({extended: false}));
app.use(express.json());

//To Enable CORS//
app.use((req,res,next) =>{
      res.header("Access-Control-Allow-Origin","*");
      res.header("Access-Control-Allow-Headers,Orgin,X-Requested-With, Content-Type,Accept,Authorization");
      if(req.method === 'OPTIONS'){
            res.header('Access-Control-Allow-Methods','PUT,POST,PATCH,DELETE,GET');
            return res.status(200).json({});
      }
      next();
})

app.use('/product',productRoutes); 
app.use('/order',orderRoutes);
app.use('/user',userRoutes);

//if none of the routes is used
app.use((req,res,next)=>{
      const error = new Error('Not Found');
      error.status = 404;
      next(error);
})

app.use((error,req,res,next)=>{
      res.status(error.status||500);
      res.json({
            error:{
                  message: error.message
            }
      })
})

module.exports = app;