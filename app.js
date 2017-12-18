const express = require('express');
const app = express();
const bigInt = require("big-integer");

function fib(n){
  let orgN = n;
  let startTime = Date.now();
  let a = bigInt(0), b = bigInt(1);
  while(n > 0){
    let c = a.add(b);
    a = b;
    b = c;
    n--;
  }
  let endTime = Date.now();
  return (endTime - startTime) + ' ms\n' +
    a.toString();
}

app.get('/fib/:fibnum',(req,res) => {
  let n = req.params.fibnum;
  res.end( fib(n) );
});


app.listen(3000, ()=>{
  console.log('Listening on port 3000!');
});