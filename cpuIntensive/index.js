/**
 * This exercise is about doing CPU intensive tasks. Like video processing and video encoding  or image processing. 
 * 
 * in this example we will be implementing fibbonacci as an example it's because Fibbonacci will use a lot of CPU
 * 
 * 
 * the solution consists of using the child process, it will be useful for running CPU intensive tasks
 * 
 * //TODO add this inside  notes
 * 4 things that can be done  with child prodcess
 * 1. you can execute exe  files - ths means you run a shell command with no communication 
 * 2. you can execute exec files
 * 3. you can spawn -- this means that you're creating a process that runs independently
 * 4. you can fork  -- this means that you are creating a light weight proces
 *    note the difference between fork an spawn is that 
 *      - the fork is still linked to the same process.. 
 *      - the spawn is a totally different process.
 * 
 */

const express = require("express");
const cors = require("cors"); //TODO : talk about it in your  notes and studies
const app = express();
const path = require("path");
const {fork} = require("node:child_process");

app.use(cors());

 
function calculateFib(n)
{
    if(n == 0 || n==1) return n;
    return calculateFib(n-1)+calculateFib(n-2);
}
app.get("/",(req,res)=>{

    console.log("i got summoned")
    res.json(req.params)

});


app.get("fibProblem",(req,res)=>{

 
    const {number,requestNumber} = req.query;

    if(!number  || isNaN(number)) {res.status(400).json({error: "invalid number:"+number})}
    const answer=  calculateFib(number);
   
   
    res.json({answer,...req.query});


});



app.get("/fib",(req,res)=>{

    console.log(req.query); // TODO  add that in your notes thing say that query is that thing aftr the ? in the url
    
    const {number,requestNumber} = req.query;

    if(!number  || isNaN(number)) {res.status(400).json({error: "invalid number:"+number})}
   
    
    const workerPath = path.join(__dirname,"fiboWorker.js");
    const fibWorker=  fork(workerPath);
    fibWorker.send({number});
   
    fibWorker.on("message",(answer)=>{
        
      res.json({answer,...req.query});


    })

});

app.listen(3000,()=>{

    console.log("listening at port...")

})
