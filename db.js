const mongoose=require("mongoose");
var mongoURL='mongodb+srv://aayushlamgade63:xDudJF6vVqRkMDXq@cluster0.9ztor.mongodb.net/Rooms'

mongoose.connect(mongoURL)

var connection= mongoose.connection

connection.on('error', ()=>{
    console.log('Mongo Db connection failed')
})

connection.on('connected',()=>{
    console.log('Mongo Db connection successful');
})

module.exports=mongoose