const express = require("express");
const mongoose = require("mongoose");

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const User = require("./user.js");


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
    
    res.json({
        success:true,
        message:"Login successful",
        user: {
            id: userExist._id,
            username: userExist.username,
            email: userExist.email
        }
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
