const User =require('../Model/Usermodel')
const bcrypt=require("bcrypt")
const saltround=10

exports.adminseeder=(req,res)=>{

    try {


    User.findOne({email:"admin@gmail.com"})
    .then(admindata=>{
        if(!admindata){
            let adminobj= new User()
            adminobj.email="admin@gmail.com"
            adminobj.password=bcrypt.hashSync("admin@12345",saltround)
            adminobj.name="Admin"
            adminobj.userType=1
            adminobj.save()
            console.log("admin register successfully")

    }
    else{
console.log("admin already exists")
    }

})


} catch (err) {
    console.log("error in seeder")
    console.error(err)
}
   
}