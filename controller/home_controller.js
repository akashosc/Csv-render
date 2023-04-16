const userCsv=require('../models/infocsv');
const fs=require('fs');
const path=require('path');
const { use } = require('../routes');


module.exports.home=async (req,res)=>{
    const doc=await userCsv.find({});
    res.render('home',{
        data:doc,
    });
}
module.exports.sendCsv=async (req,res)=>{
    try{
        
       const doc=new userCsv({
          file:req.file.filename,
       });
       doc.save();

    //   res.send({status:200,success:true,msg:'Uploaded document is fine'});
    return res.redirect('/');

    }catch(err){
        console.log(err);
        // res.send({status:400,success:false,msg:err});
       return res.redirect('/');
    }
}
module.exports.removeCsv=async (req,res)=>{
     const id=req.params.id;
     const doc=await userCsv.findByIdAndRemove(id);
    //  console.log(path.join(__dirname,'../uplodes',doc.file));
     const filed=path.join(__dirname,'../uplodes',doc.file);
     fs.unlinkSync(filed);
    res.redirect('/');
}
module.exports.viewcsv=async (req,res)=>{
    const id=req.params.id;
    const doc=await userCsv.findById(id);
    const filed=path.join(__dirname,'../uplodes',doc.file);
    var dataarray=[];
    fs.readFile(filed, 'utf8', function (err, data) {
        var dataArray = data.split(/\r?\n/);  
        for(data of dataArray){
            var datagram=[]
            var k='';
             for(c of data){
                if(c===','){
                    datagram.push(k);
                    k='';
                }else{
                 k+=c;}
             }
             datagram.push(k);
             dataarray.push(datagram);
          }
        //   console.log(dataarray);
          return res.render('table',{
              data:dataarray,
          })
      })
      
    // res.send('table');
}