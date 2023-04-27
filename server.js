const express = require('express');
const app = express();
const cors = require('cors');
const path= require('path');
require('dotenv').config({path:"./config.env"});
const port = process.env.PORT || 5000;

//use middlewares
app.use(cors());
app.use(express.json());
//mongodb connection
const con = require('./db/connection.js');




//using routes
app.use(require('./routes/route'));
con.then(db => {
    if(!db)return process.exit(1);
    //listen to the http server
    app.listen(port, () =>{
        console.log(`Server is running on port:http://localhost:${port}`)
    
    
})

///host///
///static files

app.use(express.static(path.join(__dirname,"./client/build")));
app.get("*",function (req,res){
    res.sendFile(path.join(__dirname,".client/build/index.html"));
});


app.on('error', err => console.log(`Failed To Connect with HTTP Server:${err}`));
//error in mongodb connection
}).catch(error => {
    console.log(`Connection Failed...!${error}`);
});