const Order = require('../models/orders');
const mongoose = require('mongoose');

exports.orders_get_all = ( req, res, next) =>{
      //populate to show product details connected
      Order.find().select('product quantity _id').populate('product','name').exec().then(doc =>{
            const response ={
                  count: doc.length,
                  orders: doc.map(doc=>{
                        return{
                              product:doc.product,
                              quantity:doc.quantity,
                              _id:doc._id,
                              request:{
                                    type:'GET',url:'http://localhost:3000/order/'+ doc._id
                              }
                        }
                  })
            }
            res.status(200).json(response)
      }).catch(err=>{
            res.status(500).json({
                  error:err
            })      
      })
};

exports.order_create = (req,res,next)=>{
      // const order = {
      //       orderName: req.body.name,
      //       orderPrice: req.body.price
      // }
      const order = new Order({
            _id: mongoose.Types.ObjectId(),
            product: req.body.pid,
            quantity:req.body.quantity
      });
      order.save().then(result =>{
            console.log(result),
            res.status(201).json({
                  message: 'Order Created Successfully',
                  createdOrder: {
                        quantity: result.quantity,
                        _id: result._id,
                        request:{
                              type: 'GET', url: 'http://localhost:3000/order/'+result._id
                        }

                  }
            })
      }).catch(err=>{
            res.status(500).json({
                  error: err
            })
      })
};

exports.order_get_with_id = (req,res,next)=>{
      const oid = req.params.oid;
      Order.findById(oid).populate('product').exec().then(doc=>{
            console.log(doc);
            if(doc){
                  res.status(200).json(doc);
            }
            else{
                  res.status(404).json({
                        message: 'No order with this ID present'
                  })
            }
      }).catch(err=>{
            console.log(err);
            res.status(500).json({error:err});
      })
      // res.status(200).json({
      //       message: 'Order details',
      //       oid: req.params.oid
      // });
};

exports.order_delete_with_id = (req,res,next)=>{
      const id = req.params.oid;
      Order.remove({_id: id}).exec().then(result =>{
            res.status(200).json(result)
      }).catch(err =>{
            console.log(err);
            res.status(500).json({
                  error:err
            })
      });
};