const Product = require('../models/product');
const mongoose = require('mongoose');

exports.products_get_all = (req,res,next)=>{
      Product.find().select('name price _id').exec().then(docs =>{
          const response ={
                count: docs.length,
                products: docs.map(doc =>{
                      return{
                         name: doc.name,
                         price: doc.price,
                         _id: doc._id,
                         request: {
                              type: 'GET',url:'http://localhost:3000/product/'+ doc._id
                         }   
                      }
                })
          }
           res.status(200).json(response);
      }).catch(err=>{
            console.log(err);
            res.status(500).json({
                  error:err
            })
      });
};

exports.product_create = (req,res,next)=>{
      // const pro = {
      //       name: req.body.name,
      //       price: req.body.price
      // };
      const product = new Product({
            _id: new mongoose.Types.ObjectId(),
            name: req.body.name,
            price: req.body.price 
      });
      product.save().then(result =>{
            console.log(result);
            res.status(201).json({
                  message:'Created product successfully',
                  createdProduct: {
                        name: result.name,
                        price:result.price,
                        _id:result._id,
                        request:{
                              type:'GET',
                              url:'http://localhost:3000/product/'+ result._id
                        }
                  }
            });
      }).catch(err => {
            console.log(err);
            res.status(500).json({
                  error:err
            });
      });
};

exports.product_get_with_id = (req,res,next)=>{
      const id = req.params.pid;
      Product.findById(id).exec().then(doc =>{
            console.log(doc);
            if(doc){
                  res.status(200).json(doc);
            }else{
                  res.status(404).json({
                        message: 'No Product with this ID Found'
                  })
            }
      }).catch(err => {
            console.log(err);
            res.status(500).json({error:err})
      })
      // if(id === 'ak'){
      //       res.status(200).json({
      //             message:'hi akki',
      //             id: id
      //       })
      // }
      // else{
      //       res.json({
      //             message:'not now bitch',id:id
      //       })
      // }
};

exports.product_update_details = (req,res,next)=>{
      const id = req.params.pid;
      const updateOps = {};
      for(const ops of req.body){
            updateOps[ops.propName] = ops.value;
      }
      Product.updateOne({_id: id},{$set:updateOps}).exec().then(result =>{
            console.log(res);
            res.status(200).json(result);
      }).catch(err => {
            console.log(err);
            res.status(500).json({
                  error: err
            })
      });
};

exports.product_delete = (req,res,next)=>{
      const id = req.params.pid;
      Product.remove({_id: id}).exec().then(result =>{
            res.status(200).json(result)
      }).catch(err =>{
            console.log(err);
            res.status(500).json({
                  error:err
            })
      });
};