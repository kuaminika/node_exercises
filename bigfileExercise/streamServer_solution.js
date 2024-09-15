
// the stream server is going to have a request that will read the file. 
// it's important to note that the big file is currently taking a while to download with a curl call. 
//TODO put stream inside your note thing
/*this is why we have a stream : 
     its a sequence of data elements that flows conitnuously... 
     Therefore data will be able to be processed in small chunks to provide one piece of data at a a time without loading 
    the entire thing

    there are 4 types of streams
    1. read => used by fs.createReadStream(path)
    2. write => used by fs.createWriteStream(path)
    3. duplex. => used by web sockets
    4. transformative => used by zlib and crypto




    --------
    note: the read/write stream use the event module. 
    - we can emit events based on certain criterias. in this case the key event names are:  
        - data  => the event handler will be a callback containing the chunk of data as a parameter
        - end   => the event handler will be a callback containing no parameters
        - error => the event handler will be a callback containing the error as a parameter

    note: there's also the concept of Pipe. which is used to connect two streams together. In this case, the read and write stream
         - it will be used to handle the data transfer from readable to writable stream
         - the pipe method is a method that belongs to a stream. 
            we could use it like readStream.pipe(writeStream);

*/


const http = require("http");
const server = http.createServer();
const cors = require("cors");
const port = 3000;
const path = require("path");
const filePath = path.join(__dirname,"contentHolder/bigFile1726201523573.txt"); 

const fs = require("fs");
server.on("request",(req,res)=>{ 


    res.setHeader('Access-Control-Allow-Origin', '*'); // Replace with your allowed origin
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
       

    
    const functionToUse = req.url.substring(1,req.url.length);
    console.log(req.url,functionToUse)

    if(!actions[functionToUse]){
        res.end("no actions found");
        return;
    }

    actions[functionToUse](req,res);

})

 const actions = {};

actions.useProblem = function(req,res)
{
 
    console.log("doing the problematic one",filePath);

        fs.readFile(filePath,function(err,fileContent){
    
            if(err) throw err;
    
            res.end(fileContent);
            // the res.end funciton contains the last remaining file  content
        })
    
  
    
     
}

actions.useWithPipe = function(req,res){
     
    const readStream = fs.createReadStream(filePath);
    readStream.on("data",chunk=>{
        console.log(`received ${chunk.length} bytes of data`);

      // writeStream.write(chunk);
    });
    readStream.pipe(res);
}

 actions.useWithoutPipe = function(req,res)
 {

    const readStream =  fs.createReadStream(filePath);
    const writeStream = fs.createWriteStream(`${filePath}.copy.txt`);

    readStream.on("data",chunk=>{
        console.log(`received ${chunk.length} bytes of data`);

        writeStream.write(chunk);
    });

    readStream.on("end",()=>{
         writeStream.end();
         console.log("finished writing")
    });


    readStream.on("error",console.log);

    res.end();
 }





server.listen(port, ()=>{


    console.log(`listening at port ${port}`);
});