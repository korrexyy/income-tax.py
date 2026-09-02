// var, let, and const
 
// global scope
var x = 1; 
let y = 2;
const z = 3; 

console.log(`global: ${x}`); // 1
console.log(`global: ${y}`); // 2
console.log(`global: ${z}`); // 3


function myFunc() {
  var x = 10; // function scope
  const z = 5; // block scope

  {
    var x = 11;  // function scope
    const z = 6; // block scope
    console.log(`block: ${x}`);
    console.log(`block: ${y}`);
    console.log(`block: ${z}`); 
  }

  console.log(`function: ${x}`); 
  console.log(`function: ${y}`); 
  console.log(`function: ${z}`); 
}


myFunc();



//this keyword in JavaScript
const person = {
    name: "Korede",

    sayName: function() {
        console.log(this.name);
    }
};

person.sayName();





const player ={
  name:"Illiman Ndiaye",
  intro: function(){
    console.log("hello my name is " + this.name)
  }
};

player.intro();


// this inside an object method





// //clousure

// function x(){
//   var a= 7;
//   function y(){
//     console.log(a);
//   }
//   y();
// }
// x();