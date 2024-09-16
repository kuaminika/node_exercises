 
function calculateFib(n)
{
    if(n == 0 || n==1) return n;
    return calculateFib(n-1)+calculateFib(n-2);
}
// note.. seeing this. we can safely assume that the message event was emitted on another file
process.on("message",({number})=>{

    const result = calculateFib(number);

    process.send(result);

})