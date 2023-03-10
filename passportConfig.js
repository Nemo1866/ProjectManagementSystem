const { compare } = require("bcrypt")
const LocalStrategy=require("passport-local")
const { Admin, User } = require("./connection")

exports.PassportInitialize=(passport)=>{
passport.use(new LocalStrategy({usernameField:"email",passwordField:"password"},async function(email,password,done){
    let user=null
    let admin=await Admin.findOne({where:{email}})
    let ss=await User.findOne({where:{email}})
    if(admin){
        user=admin
    }else{
        user=ss
    }
    if(!user){
        done("Email Address Does Not Exist",false)
    }
    let hashpassword=await compare(password,user.password)
    if(!hashpassword){
        done("Password Not Match",false)
    }
    done(null,user)
}))

passport.serializeUser((user,done)=>{
    done(null,user.email)
})
passport.deserializeUser(async(email,done)=>{
    try {
        let user=null
        let admin=await Admin.findOne({where:{email}})
        let ss=await User.findOne({where:{email}})
        if(admin){
            user=admin
        }else{
            user=ss
        }

        done(null,user)
        
    } catch (error) {
        done(error,false)
    }
})
}

exports.isAuthenticatedAdmin=async(req,res,next)=>{
    try {
        if(!req.user){
            res.send("You need to log in")
        }
        let email=req.user.dataValues.email
        let user=await Admin.findOne({where:{email}})
    
        if(!user){
            res.send("You're not a admin")
            return
        }
        next()
    } catch (error) {
        res.send("Error")
        console.log(error);
    }
   
}

exports.isUserAuthenticated=async(req,res,next)=>{
    try {
        if(!req.user){
            res.send("You need to login ")
        }
        let email=req.user.dataValues.email
        let user=await User.findOne({where:{email}})
        if(!user){
            res.send("You're not a user")
        }else{
            next()
        }
    } catch (error) {
        res.send("Some Error")
        console.log(error);
    }
    
}