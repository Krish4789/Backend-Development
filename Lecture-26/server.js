

const express = require("express");
const mongoose = require("mongoose");

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const User = require("./user.js");

const jwt = require("jsonwebtoken");

function verifyToken(req , res , next)
{

    // req se token mangega ,
    // token ko verify karega
    // req ko aage bhj do 

    let token = req.headers.authorization;
    if(!token){
        return res.json({
            success:false,
            message:"Token require"
        })
    }

    let decode = jwt.verify(token, "JaiShreeRam");
    console.log(decode);

    if(!decode){
        return res.json({
            success:false,
            message:"Invalid token"
        })
    }
    req.user_id = decode.id;
    next();
}

app.get("/home" , verifyToken, async (req, res) => {
    let userId = req.user_id;
    let user = await User.findById(userId);
    let username = user.username;
    res.send("Hello World" + " " + username);
})

app.post("/api/users/signup" , async (req , res) => {

    let {username, email, password} = req.body;
    
    let userExist =await User.findOne({email:email});
    if(userExist){
        return res.json({
            success:false,
            message:"User already exists"
        })
    }

    let newUser = await User.create({
        username:username,
        email:email,
        password:password
    })
    res.json({
        success:true,
        message:"User created successfully"
    })

});

app.post("/api/auth/login" , async (req , res) => {
    let {email, password} = req.body;

    let userExist = await User.findOne({email:email});
    if(!userExist){
        return res.json({
            success:false,
            message:"User does not exist"
        })
    }
    
    if(userExist.password !== password){
        return res.json({
            success:false,
            message:"Invalid password"
        })
    }

    // create token to state user state using jwt

    let token = jwt.sign({id: userExist._id}, "JaiShreeRam" );
    console.log(token);

    res.json({
        success:true,
        message:"Login successful",
        token:token
    })
});


app.listen(5656, () => {
    console.log("Server is running on port 5656");
})

mongoose.connect("mongodb://127.0.0.1:27017/G14myblogapp")
.then(() => {
    console.log("Connected to MongoDB");
})
.catch((err) => {
    console.log("Error connecting to MongoDB", err);
})