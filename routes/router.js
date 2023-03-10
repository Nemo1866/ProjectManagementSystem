const passport = require("passport")
const { login } = require("../controller/AdminController")
const { createProject, showAllProjects, applyForProject, showAllPending, completedProjects, getAllDelayed } = require("../controller/projectController")
const { RegisterUser } = require("../controller/UserController")
const { isUserAuthenticated } = require("../passportConfig")

const router=require("express").Router()

router.post("/login",passport.authenticate("local"),login)


router.post("/add",createProject)
router.get("/projects",showAllProjects)
router.get("/apply/project/:id",isUserAuthenticated,applyForProject)
router.get("/showpendings",isUserAuthenticated,showAllPending)
router.get("/completed/:id",isUserAuthenticated,completedProjects)
router.get("/delayed",isUserAuthenticated,getAllDelayed)





//User
router.post("/register",RegisterUser)




//Admin


module.exports=router