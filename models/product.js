const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productSchema = new Schema({
  productTitle:  
  {
      type:String,
      required:true
  },
  productPrice:  
  {
      type:String,
      required:true
  },
  productQuantity:  
  {
      type:String,
      required:true
  },
  productDescription:
  {
      type:String,
      required:true
  },
  productTax:
  {
      type:Boolean,
      required:true
  },
  dateCreated :
  {
      type:Date,
      default: Date.now()
  }
});

const productModel =mongoose.model("Product",productSchema);

module.exports=productModel;