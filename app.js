const express= require("express");
const exphbs = require("express-handlebars");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const methodOverride = require('method-override');


require("dotenv").config({path:'./config/keys.env'});

const productRoutes = require("./routes/product");
const generalRoutes = require("./routes/general");

const app = express();

app.use(bodyParser.urlencoded({extended:false}));

app.use(methodOverride('_method'));

app.use(express.static("public"));

app.use("/",generalRoutes);
app.use("/product",productRoutes);

app.engine("handlebars",exphbs());
app.set("view engine","handlebars");


const MONGO_DB_URL=`mongodb+srv://${process.env.MONGO_DB_USERNAME}:${process.env.MONGO_DB_PASSWORD}@cluster0-agoxt.mongodb.net/${process.env.MONGO_DB_DATABASE_NAME}?retryWrites=true&w=majority`;
 

mongoose.connect(MONGO_DB_URL, {useNewUrlParser: true,useUnifiedTopology: true })
.then(()=>{

    console.log(`You have successfully connected to your mongoDB database`);
})
.catch((err)=>{
    console.log(`Sorry, something occured :${err}`);
});


const port = process.env.PORT || 3000;

app.listen(port,()=>{
    console.log(`Your Web Server has been connected`);
    
});