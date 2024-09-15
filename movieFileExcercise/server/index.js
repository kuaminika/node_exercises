const express = require("express");
const cors = require("cors");
const app = express();
const port = 3000;
const fs = require("fs");
const path = require("path");
const fileName = "video.mp4";
app.use(cors());


app.get("/getMovie",function(req,res){

   const filePath = path.join(__dirname,`content/${fileName}`);


    const readStream = fs.createReadStream(filePath);


    readStream.pipe(res);


});

app.get("/test",function(req,res){

    const message ="this is the response";
    const filePath = path.join(__dirname,`content/${fileName}`);

    const responseJSON = {message,filePath}
    console.log(filePath);

    res.json(responseJSON);
});

app.listen(port, ()=>{

    console.log(`listenning at port ${port}`);
})