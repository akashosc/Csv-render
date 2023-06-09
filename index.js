const express=require('express');
const app=express();
const PORT=8000;
const mongoose=require('mongoose');
const ejs=require('ejs');
const ejslayouts=require('express-ejs-layouts');
const path=require('path');
const mongUrl="mongodb+srv://akash7067tiwari:pyRVxIqr7Z9qyvr3@cluster0.0nsntel.mongodb.net/?retryWrites=true&w=majority";

// mongoose connection
mongoose.connect(mongUrl,{useNewUrlParser:true}).then(()=>console.log('MongoDb connected'))
.catch(err=>console.log(err));

// app.use(express.static('assiet'));

app.use(express.static(path.join(__dirname ,'uplodes')));
// views engine ejs
app.use(ejslayouts);
app.set('view engine','ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname , 'assiet')));



app.use('/',require('./routes'));

app.listen(PORT,(err)=>{
    console.log(`Server is Ready in port ${PORT}`);
 })