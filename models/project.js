module.exports=(sequelize,DataTypes)=>{
let Project=sequelize.define("project",{
    title:{
        type:DataTypes.STRING,
        allowNull:false
    },
    desc:{
        type:DataTypes.STRING,
        allowNull:false
    },
    startTime:{
type:DataTypes.TIME,
defaultValue:DataTypes.NOW,
allowNull:false
    },
    endTime:{
type:DataTypes.TIME,
allowNull:false
    },
    status:{
        type:DataTypes.ENUM,
        values:["Not Yet Started","Pending","Completed","Delayed"],
        allowNull:false
    },remarks:{
        type:DataTypes.ENUM,
        values:["Good","Bad"]
    }
},{
    timestamps:false
})
return Project
}