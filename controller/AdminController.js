module.exports={
    login:async(req,res)=>{
        res.send(`Welcome ${req.user.dataValues.fullname}`)
    }
}