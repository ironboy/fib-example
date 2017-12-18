const simpleThreads = require('simple-threads');
simpleThreads.require(
  'bigInt:big-integer',
  'express',
  'asleep'
);
const app = express();

async function fib(n){
  let startTime = Date.now();
  let loopTime = Date.now();
  let a = bigInt(0), b = bigInt(1);
  while(n > 0){
    let c = a.add(b);
    a = b;
    b = c;
    n--;
    // pause this while loop if more
    // than 10 ms has passed
    if(Date.now() - loopTime > 10){
      loopTime = Date.now();
      await asleep(1);
    }
  }
  let endTime = Date.now();
  return (endTime - startTime) + ' ms\n' +
    a.toString();
}

app.get('/fib/:fibnum',async (req,res) => {
  let n = req.params.fibnum;
  res.end( await fib.run(n) );
});


app.listen(3000, ()=>{
  console.log('Listening on port 3000!');
});

function randInt(min, max){
  return Math.floor(Math.random() * (1 + max - min)) + min;
}


// Test the cpu power
// by making several "parallell"
// request to fib
let howMany = 100;
let a = [], co = 0, start = Date.now();
while(a.length < howMany){
  let obj = {n: randInt(1000, 100000) };
  a.push(obj);
  fib.run(obj.n).then((result) => {
    // obj.result = result;
    obj.timeTaken = Date.now() - start;
    co++;
    if(co == howMany){
      console.log(
        'All done', Date.now() - start, 'ms',
        a.sort((objA, objB) => objA.timeTaken - objB.timeTaken)
      );
    }
  });
}






