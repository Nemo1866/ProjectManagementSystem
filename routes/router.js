const passport = require("passport")
const { login, exportAll } = require("../controller/AdminController")
const { createProject, showAllProjects, applyForProject, showAllPending, completedProjects, getAllDelayed, getAllCompleted } = require("../controller/projectController")
const { RegisterUser } = require("../controller/UserController")
const { isUserAuthenticated, isAuthenticatedAdmin } = require("../passportConfig")

const router=require("express").Router()

router.post("/login",passport.authenticate("local"),login)


router.post("/add",isAuthenticatedAdmin,createProject)
router.get("/projects",isUserAuthenticated,showAllProjects)
router.get("/apply/project/:id",isUserAuthenticated,applyForProject)
router.get("/showpendings",isUserAuthenticated,showAllPending)
router.get("/completed/:id",isUserAuthenticated,completedProjects)
router.get("/delayed",isUserAuthenticated,getAllDelayed)
router.get("/success",isUserAuthenticated,getAllCompleted)

router.get("/exportAll",isAuthenticatedAdmin,exportAll)






//User
router.post("/register",RegisterUser)




//Admin


module.exports=router