/**
 * This exercise is about doing CPU intensive tasks. Like video processing and video encoding  or image processing. 
 * 
 * in this example we will be implementing fibbonacci as an example it's because Fibbonacci will use a lot of CPU
 */

const express = require("express");
const cors = require("cors"); //TODO : talk about it in your  notes and studies
const app = express();


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

app.get("/fib",(req,res)=>{

    console.log(req.query); // TODO  add that in your notes thing say that query is that thing aftr the ? in the url
    
    const {number,requestNumber} = req.query;

    if(!number  || isNaN(number)) {res.status(400).json({error: "invalid number:"+number})}
    const answer=  calculateFib(number);
   
   
    res.json({answer,...req.query});

});

app.listen(3000,()=>{

    console.log("listening at port...")

})
