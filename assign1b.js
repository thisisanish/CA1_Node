

const programmers = (...people)=> Math.max(...people)-Math.min(...people) // for any amount of people

const programmers3 = (uno,dos,tres)=>Math.max(uno,dos,tres) - Math.min(uno,dos,tres) // for only 3 people

console.log(programmers(147, 33, 526));
console.log(programmers3(147, 33, 526));