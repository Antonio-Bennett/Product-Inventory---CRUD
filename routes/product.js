const express = require('express');
const router = express.Router();
const Product = require("../models/product");

router.get("/add",(req,res)=>
{
    res.render("Products/AddProduct")
});

router.get("/view",(req,res)=>
{

    Product.find()
    .then((product)=>{
        res.render("Product/viewProducts",
        {
            lists:product
        });
    })
    .catch(err=>console.log(`Error : ${err}`));
});

router.get("/edit/:id",(req,res)=>
{
    Product.findById(req.params.id)
    .then((product)=>{

        res.render("Products/editProduct",{
            productDoc:product
        })

    })
    .catch(err=>console.log(`Error : ${err}`));
});

module.exports=router;