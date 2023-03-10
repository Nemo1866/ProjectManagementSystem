const {Sequelize,DataTypes}=require("sequelize")

const sequelize=new Sequelize("pms","root","nimap123",{
    host:"localhost",
    dialect:"mysql"
})

sequelize.authenticate().then(()=>{
    console.log("Connected");
}).catch(err=>{
    console.log(err);
})
let Project=require("./models/project")(sequelize,DataTypes)
let Admin=require("./models/Admin")(sequelize,DataTypes)
let User=require("./models/User")(sequelize,DataTypes)


User.hasMany(Project)
Project.belongsTo(User)
sequelize.sync()



module.exports={sequelize,Project,Admin,User}