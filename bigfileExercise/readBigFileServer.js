const http = require("http");
const fs = require("fs");
const path = require("path");

const server = http.createServer();
const PORT = 3000; 

const fileName = "bigFile1726201523573.txt";

server.on("request",(req,res)=>{

    const functionToUse = req.url.substring(1,req.url.length);
    console.log(req.url,functionToUse)

    if(!serverActions[functionToUse]){
        res.end("no actions found");
        return;
    }

    serverActions[functionToUse](req,res);
  //  serverFunctions[req.]
    /**/

});


const serverActions = {};

serverActions.readLikeProblem = function(req,res)
    {
        console.log("I am reading problematically");
        const filePath = path.join(__dirname,`contentHolder/${fileName}`);
       
        const startReadTime = new Date();
        console.log("read started at:"+startReadTime);
        const data = fs.readFileSync(filePath,"utf-8");
        console.log(data);
        const endReadTime = new Date();
        console.log("read ended at:"+endReadTime);
        
        res.end(JSON.stringify({startReadTime,endReadTime}));
    };

serverActions.readLikeProblemAsync = function(req,res)
{
    console.log("I am reading problematically using fs.readFile");
    const startReadTime = new Date();
    console.log("read started at:"+startReadTime);
    const filePath = path.join(__dirname,`contentHolder/${fileName}`);
    fs.readFile(filePath,function(err,data){

        if(err) throw err;
        console.log(data);
        const endReadTime = new Date();
        console.log("read ended at:"+endReadTime);
        res.end(JSON.stringify({startReadTime,endReadTime}));
        // the res.end funciton contains the last remaining file  content
    })
}

serverActions.readLikeSolution= function(req,res){
        console.log("I am reading solutionally");

        const filePath = path.join(__dirname,"contentHolder/bigFile1726201523573.txt");
    console.log(__dirname);
    console.log(filePath);
    
    const fileReadStream = fs.createReadStream(filePath);
    fileReadStream.pipe(res);
    }

 



server.listen(PORT,()=>{

    console.log("read server is listening at port:"+PORT)
})