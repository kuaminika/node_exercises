/*
This exercise is to demonstrate how Node.js can effectively serve large file such as 400 MB or text file for 
*/

const fs = require("fs");

// the following is to create a big file
const content = Math.random().toString();
const fileConent =  content.repeat(10000000 );

let dt = new Date();
console.log(content);
fs.writeFile(`contentHolder/bigFile${dt.getTime()}.txt`,fileConent,console.log);// this will create a file of around 180 MB