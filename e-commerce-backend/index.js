import express from "express";
import mongoose, { mongo } from "mongoose";
import jsonwebtoken from "jsonwebtoken";
import multer from "multer";
import path from "path";
import cors from "cors";

const app = express();
const port=4000;

app.use(express.json());
app.use(cors());

//database
mongoose.connect("mongodb+srv://elitelaksh7:coderlaksh@cluster0.i4qmlnc.mongodb.net/ecommerce")

// api
app.get("/",(req,res)=>{
    res.send("running")
})

//image creation
const storage = multer.diskStorage({
    destination: './upload/images',
    filename : (req,file,cb)=>{
        return cb(null,`${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`)
    }
})

const upload = multer({storage : storage})

//create uplaod endpoint
app.use("/images",express.static('upload/images'))

app.post("/upload",upload.single('product'),(req,res)=>{
    res.json({
        success:1,
        image_url:`http://localhost:${port}/images/${req.file.filename}`
    })
})  

//schema for creating products
const Product = mongoose.model("Product",{
    id:{
        type:Number,
        required:true,
    },
    name:{
        type:String,
        required:true,
    },
    image:{
        type:String,
        required:true,
    },
    category:{
        type:String,
        required:true,
    },
    new_price:{
        type:Number,
        required:true,
    },
    old_price:{
        type:Number,
        required:true,
    },
    date:{
        type:Date,
        default:Date.now,
    },
    available:{
        type:Boolean,
        default:true,
    }
})

//add product to database
app.post("/addProduct",async (req,res)=>{
    let products = await Product.find({}).sort({id:1})
    let id;
    if(products.length>0){
        let last_product_array = products.slice(-1);
        let last_product = last_product_array[0];
        id = last_product.id + Number(1);
    }
    else{
        id = Number(1)
    }
    const product = new Product({
        id:id,
        name:req.body.name,
        image:req.body.image,
        category:req.body.category,
        new_price:req.body.new_price,
        old_price:req.body.old_price,
        date:req.body.date,
        available:req.body.available,
    });
    console.log(product)
    await product.save();
    console.log("saved");
    res.json({
        success:true,
        name:req.body.name,
    })
})

//remove data from database
app.post("/removeProduct",async (req,res)=>{
    if(req.body.id){
    await Product.findOneAndDelete({id:req.body.id})
    console.log("removed")
    res.json({
        success:true,
        name:req.body.name,
    })
}
    else{
        console.log("id doesn't exist")
        res.json({
            success:false,
            message:"id doesn't exist",
        })
        }
    }
)

//get all products of the database
app.get("/allProducts",async (req,res)=>{
    let products = await Product.find({})
    console.log("all products fetched")
    res.send(products)
})

//schema for user model
const Users = mongoose.model('Users',{
    name:{
        type:String,
    },
    email:{
        type:String,
        unique:true,
    },
    password:{
        type:String,
    },
    cartData:{
        type:Object,
    },
    date:{
        type:Date,
        default:Date.now,
    }
})

//creating endpoint for registering the user
app.post('/signup',async (req,res)=>{
    let check = await Users.findOne({email:req.body.email}) //the check variable checks if the email already exists or not
    if(check){
        return res.status(400).json({succes:false,errors:"email id already exists"})
    }
    let cart={}
    for (let i = 0; i < 300; i++) {
        cart[i]=0
    }
    const user = new Users({
        name:req.body.username,
        email:req.body.email,
        password:req.body.password,
        cartData:cart,
    })
    await user.save()

    const data = {
        user:{
            id:user.id
        }
    }

    const token  = jsonwebtoken.sign(data,'secret_ecom')
    res.json({success:true,token})
})

//creating endpoint for login
app.post("/login",async (req,res)=>{
    let user = await Users.findOne({email:req.body.email})    
    if(user){
        const passCompare  = req.body.password == user.password
        if(passCompare){
            const data = {
                user:{
                    id:user.id
                }
            }
        
            const token  = jsonwebtoken.sign(data,'secret_ecom')
            res.json({success:true,token})
        }
        else{
            res.json({success:false,errors:"wrong password"})
        }
    }
    else{
        res.json({success:false,errors:"email id not registered"})

    }
})
//creating endpoints for frontend parts

app.get('/newcollections',async (req,res)=>{
    let products = await Product.find({})
    let newcollection = products.slice(1).slice(-8)
    console.log("new collections fetched")
    res.send(newcollection)
})

app.get('/popularinwomen',async (req,res)=>{
    let products = await Product.find({category:"women"})
    let popular_in_women = products.slice(0,4)
    console.log("popular in women fetched")
    res.send(popular_in_women)
})

app.post('/getrelatedproductcategorywise',async (req,res)=>{
    let relatedCategory = req.body.category
    let products = await Product.find({category:relatedCategory})
    let relatedcatproducts = products.slice(0,4)
    console.log("products related in",relatedCategory,"fetched")
    res.send(relatedcatproducts)
})

//middleware to get the particular user using auth token and get their cartdata
const fetchUser = async (req,res,next)=>{
    const token = req.header("auth-token")
    if(!token){
        res.status(401).send({errors:"please authenticate using valid token"})
    }
    else{
        try {
            const data = jsonwebtoken.verify(token,'secret_ecom')
            console.log(data)//check what data comes back after verification for knowledge
            req.user = data.user
            next();
        } catch (error) {
            res.status(401).send({errors:"please authenticate using valid token"})

        }
    }
}

//creating endpoint to add items to cartdata
app.post('/addtocart',fetchUser,async (req,res)=>{//we can pass a function as a middleware if we dont want to
    //pass information through apis always
    console.log("added",req.body,req.user)
    let userData = await Users.findOne({_id:req.user.id});
    userData.cartData[req.body.itemId] += req.body.quantity;
    await Users.findOneAndUpdate({_id:req.user.id},{cartData:userData.cartData});
    res.send("cart items added")
})

//creating endpoint to remove items from cartdata
app.post('/removefromcart',fetchUser,async (req,res)=>{//we can pass a function as a middleware if we dont want to
    //pass information through apis always
    console.log("removed",req.body,req.user)
    let userData = await Users.findOne({_id:req.user.id});
    if(userData.cartData[req.body.itemId]>0){
    userData.cartData[req.body.itemId] -= 1;
    }
    await Users.findOneAndUpdate({_id:req.user.id},{cartData:userData.cartData});
    res.send("cart items removed")
})

//creating endpoint to get entire cart data
app.post('/getcart',fetchUser,async (req,res)=>{//we can pass a function as a middleware if we dont want to
    //pass information through apis always
    console.log("get cart")
    let userData = await Users.findOne({_id:req.user.id});
    res.send(userData.cartData)
})




app.listen(port,(err)=>{
    err?console.log(err):console.log("port running on",port)
})