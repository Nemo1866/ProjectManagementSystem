const xlsx=require("xlsx")
const { Project } = require("../connection")
module.exports={
    login:async(req,res)=>{
        res.send(`Welcome ${req.user.dataValues.fullname}`)
    },
    exportAll:async(req,res)=>{
const projects=await Project.findAll()

const projectData=projects.map((project)=>project.toJSON())

const ProjectSheet= xlsx.utils.json_to_sheet(projectData)

const ProjectWorkBook=xlsx.utils.book_new()

xlsx.utils.book_append_sheet(ProjectWorkBook,ProjectSheet,"project")

xlsx.writeFile(ProjectWorkBook,"project.xlsx")
res.send("Exported all the data")

    }
}