const http = require("http");
const server = http.createServer();
const port = 3000;

const fs = require("fs");
// the stream server is going to have a request that will read the file. 
// it's important to note that the big file is currently taking a while to download with a curl call. 
server.on("request",(req,res)=>{

    fs.readFile("contentHolder/bigFile1726201523573.txt",function(err,fileContent){

        if(err) throw err;

        res.end(fileContent);
        // the res.end funciton contains the last remaining file  content
    })

})

 

server.listen(port, ()=>{


    console.log(`listening at port ${port}`);
});