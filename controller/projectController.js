const { Project } = require("../connection")

module.exports={

    createProject:async(req,res)=>{
        try {
            let {title,desc,startTime,endTime,status}=req.body
        let result=await Project.create({
            title,
            desc,
            startTime,
            endTime,
            status
        })
        res.send("Added a new project")
        } catch (error) {
        res.send("Some Error Occured")
        console.log(error);
        }
        


    },showAllProjects:async(req,res)=>{
        let result =await Project.findAll({where:{status:"Not Yet Started"}})
        console.log(result.title);
        
        if(!result){
            res.send("All Projects have been assigned or no projects found")
        }else{
            res.send(result)
        }
    },applyForProject:async(req,res)=>{
        try {
            let check=await Project.findOne({where:{id:req.params.id}})
            console.log(check.status);
           

            
            if(check.status=="Not Yet Started"){
                let find=await Project.update({status:"Pending",userId:req.user.dataValues.id},{where:{id:req.params.id}})
                res.send("Added A Task")
            }else{
                res.send("Already Completed by a user")
            }
        } catch (error) {
            res.send(error)
            console.log(error);
        }
       
    },showAllPending:async(req,res)=>{
        let find=await Project.findAll({where:{userId:req.user.dataValues.id,status:"Pending"}})
        if(!find){
            res.send("You've no pending task")
        }else{
            res.send(find)
        }
    },completedProjects:async(req,res)=>{
        try {
            let result=await Project.findAll({where:{status:"Pending",userId:req.user.dataValues.id}})
            let endTimeString = result[0].endTime;
            let [hours, minutes, seconds] = endTimeString.split(':');
            let endTime = new Date();
            endTime.setHours(hours);
            endTime.setMinutes(minutes);
            endTime.setSeconds(seconds);
            if(endTime>new Date()){
                await Project.update({status:"Completed",remarks:"Good",userId:req.user.dataValues.id},{where:{id:req.params.id}})
                res.send("Completed")
             
            }else{
            await Project.update({status:"Delayed",remarks:"Bad",userId:req.user.dataValues.id},{where:{id:req.params.id}})
            res.send("Delayed")
            }
        } catch (error) {
            res.send("Some error occured")
            console.log(error);
        }
       
    },getAllDelayed:async(req,res)=>{
        let result=await Project.findAll({where:{userId:req.user.dataValues.id,status:"Delayed"}})
        res.send(result)
    },getAllCompleted:async(req,res)=>{
        let result=await Project.findAll({where:{userId:req.user.dataValues.id,status:"Completed"}})
        res.send(result)
    }
}
