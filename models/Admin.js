const { hashSync } = require("bcrypt")

module.exports=(sequelize,DataTypes)=>{
const Admin =sequelize.define("admin",{
    fullname:{
        type:DataTypes.STRING,
        allowNull:false
    },
    email:{
        type:DataTypes.STRING,
        allowNull:false,
        validate:{
            isEmail:true
        }
    },password:{
        type:DataTypes.TEXT,
        allowNull:false,
    set(value){
        let password=hashSync(value,10)
        this.setDataValue('password',password)
    }}
},{
    timestamps:false
})
return Admin
}