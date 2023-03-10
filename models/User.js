const { hashSync } = require("bcrypt")

module.exports=(sequelize,DataTypes)=>{
    let User=sequelize.define("user",{
        fullname:{
            type:DataTypes.STRING,
            allowNull:false
        },
        email:{
            type:DataTypes.STRING,
            allowNull:false,
            unique:true,
            validate:{
                isEmail:true
            }
        },
        password:{
            type:DataTypes.STRING,
            allowNull:false,
            set(value){
                let password=hashSync(value,10)
                this.setDataValue("password",password)
            }
        }
    },{
        timestamps:false
    })
return User
}