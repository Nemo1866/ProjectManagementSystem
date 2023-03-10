const express=require("express")
const passport = require("passport")
const { PassportInitialize } = require("./passportConfig")
const router = require("./routes/router")
const session=require("express-session")
require("./connection")

const app=express()

PassportInitialize(passport)
app.use(session({
    secret:"secret",
    saveUninitialized:false,
    resave:false
}))
app.use(passport.initialize())
app.use(passport.session())

app.use(express.json())
app.use('/',router)

app.listen(3000,()=>{
    console.log("Server is running on port 3000");
})