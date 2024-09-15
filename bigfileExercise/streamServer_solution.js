
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
*/


const http = require("http");
const server = http.createServer();
const port = 3000;

const fs = require("fs");
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