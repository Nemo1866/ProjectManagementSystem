const { User } = require("../connection")

module.exports={
    RegisterUser:async(req,res)=>{
        let {fullname,email,password}=req.body
        let result=await User.create({fullname,email,password})
        res.send("Added a user")
    }
}