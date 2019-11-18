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

const product = new Product(newProduct)
        product.save()
        .then(()=>{
            console.log(`Product was added to the database`);
            console.log(`${product}`);
            res.redirect("/product/view");
        
        })
        .catch(err=>console.log(`Error : ${err}`));
  
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
    .then((Product)=>{

    Product.productTitle=req.body.pTitle,
    Product.productPrice=req.body.pPrice,
    Product.productQuantity=req.body.pQuantityOnHand,
    Product.productDescription=req.body.pDescription,
    Product.productTax=req.body.pTax

        Product.save()

        .then(()=>{
           res.redirect("/product/view") 
        })
        .catch(err=>console.log(`Error : ${err}`));

    })
    .catch(err=>console.log(`Error : ${err}`));
});

module.exports=router;