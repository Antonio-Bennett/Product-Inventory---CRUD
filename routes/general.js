const express = require('express')
const router = express.Router();


router.get("/",(req,res)=>
{
    res.render("General/dashboard");
});

module.exports=router;