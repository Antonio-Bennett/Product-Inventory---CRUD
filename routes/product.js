const express = require('express');
const router = express.Router();
const Product = require("../models/product");

router.get("/addProduct",(req,res)=>
{
    res.render("Products/AddProduct")
});

router.post("/addProduct", (req, res)=>{
const newProduct=
{
    productTitle:req.body.pTitle,
    productPrice:req.body.pPrice,
    productQuantity:req.body.pQuantityOnHand,
    productDescription:req.body.pDescription,
    productTax:req.body.pTax
}

const error = [];

    
const product = new Product(newProduct)
        product.save()
        .then(()=>{
            console.log(`Product was added to the database`);
            console.log(`${product}`);
            res.redirect("/product/view");
        
        })
        .catch((err)=>
        {
            console.log(`${err}`);
            Product.findOne({productTitle:req.body.pTitle})
            .then(result=>{
                error.push(`${req.body.pTitle} ALREADY IN DATABASE`)
                res.render("Products/AddProduct",{
                    error: error
                })
            })
            .catch(err=>console.log(`Error : ${err}`));
        });
  
});

router.get("/view",(req,res)=>
{

    Product.find()
    .then((product)=>{
        res.render("Products/viewProducts",
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

router.put("/edit/:id",(req,res)=>
{
    Product.findById(req.params.id)
    .then((product)=>{

    product.productTitle=req.body.pTitle,
    product.productPrice=req.body.pPrice,
    product.productQuantity=req.body.pQuantityOnHand,
    product.productDescription=req.body.pDescription,
    product.productTax=req.body.pTax

    const x = [];

        product.save()

        .then(()=>{
           res.redirect("/product/view") 
        })
        .catch((err)=>
        {
            console.log(`${err}`);
            Product.findOne({productTitle:req.body.pTitle})
            .then(result=>{
                x.push(`${req.body.pTitle} ALREADY IN DATABASE`)
                res.render("Products/editProduct",{
                    productDoc:product,
                    error: x
                })
            })
            .catch(err=>console.log(`Error : ${err}`));
            
        });

    })
    .catch(err=>console.log(`Error : ${err}`));
});

module.exports=router;