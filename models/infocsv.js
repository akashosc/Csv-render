const mongoose=require('mongoose');

const csvSchema= mongoose.Schema({
    file:{
        type:String,
        required:true,
    }
});

const user=mongoose.model('user',csvSchema);
module.exports=user;