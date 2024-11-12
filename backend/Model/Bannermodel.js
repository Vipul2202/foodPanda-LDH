const mongoose=require('mongoose')
const bannerschema=new mongoose.Schema({
    description:{type:String,default:null},
    price:{type:String,default:null},
    Image:{type:String,default:null},
   status:{type:Boolean, default:false},
   created_at: { type: Date, default: Date.now() },
})
module.exports = new mongoose.model("banner",bannerschema)