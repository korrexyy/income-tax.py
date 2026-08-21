// Variable Declaration
const firstName = "Ada";
// firstName = "Abdulrazaq";
console.log("First Name:", firstName);

let age = 20;
age = 21;

console.log("Age:", age);

// Data Types
const lastName = "Chukwuka"; // string
const numberOfRooms = 4; // number
const isRazaqSleepy = false; // boolean
let fullName; // undefined

console.log("Full Name:", fullName);

const maidenName = null; // null

console.log("Maiden Name:", maidenName);

const userData = {
  firstName: "Abdulrazaq",
  age: 38,
  sleepy: true,
  slowToday: true
}; // object

console.log('User Data', userData);

console.log('userData.firstName', userData.firstName);

console.log('userData.age', userData.age);

// Template Literals
console.log('My name is ' + userData.firstName + ', and I am ' + userData.age + ' years old.');

// Using backticks
console.log(`My name is ${userData.firstName}, and I am ${userData.age} years old.`);

// Operators
const a = 12;
const b = 4;
let c = 5;
const d = "4";

console.log("a + b =", a + b);
console.log("a - b =", a - b);
console.log("a * b =", a * b);
console.log("a / b =", a / b);
console.log("a % c =", a % c);
console.log('c += 6 =', c += 6); // c += 6 -> c = c + 6
console.log('c -= 6 =', c -= 6); // c -= 6 -> c = c - 6
console.log('c *= 6 =', c *= 6); // c *= 6 -> c = c * 6
console.log('c /= 6 =', c /= 6); // c /= 6 -> c = c / 6
console.log('c++', c++); // c + 1, but log c before adding
console.log('c--', c--); // c - 1, but log c before subtracting
console.log(c);
console.log('++c', ++c); // c + 1, add 1 before logging
console.log('--c', --c); // c - 1, subtract 1 before logging

console.log('Is b equal to d?', b == d); // true
console.log('Is b equal to d?', b === d); // false

const newObj = { plus: a + b, minus: a - b, times: a * b, divide: a / b };

console.log(newObj);

// Functions

// declaration
function showText() {
  console.log('This is the text.');
}

showText();

function greet(name) {
  return `Hi ${name}`;
}

console.log(greet('Abdulrazaq'));

// expression, stored in a variable
const greet2 = function(name) {
  return `Hi ${name}`;
};

console.log(greet2('Lawal'));

// arrow function, the modern shorthand
const greet3 = (name) => `Hi ${name}`;

console.log(greet3("Tobiloba"));

const greet4 = (name) => {
  return `Hello, World and ${name}!`;
}

console.log(greet4('Jack'));

function add(a, b, c = 4) {
  console.log(a + b + c);
}

add(1, 2, 3);

const newGreeting = (name = 'Samuel') => {
  console.log(`My name is ${name}.`);
}

newGreeting('John');

// if/else and Logical Operators
const gradeStudent = (score) => {
  let grade;

  if (score >= 90) {
    grade = "A";
  } else if (score >= 70) {
    grade = "B";
  } else {
    grade = "C";
  }

  console.log(`Student's Grade: ${grade}`);
}

gradeStudent(92);
gradeStudent(48);
gradeStudent(78);

const checkGenderAndAge = (gender, age, isHungry) => {
  if (gender === 'M' && age >= 18) {
    console.log('You are good to go');
  } else {
    console.log('You are not good to go.');
  }

  if (gender === 'F' || age <= 13) {
    console.log('Thank you.');
  }

  console.log(!isHungry);
}

checkGenderAndAge('F', 17, true);

// for Loops
for (let i = 0; i < 5; i++) {
  console.log(i);
  // 0, 1, 2, 3, 4
}

for (let i = 0; i <= 5; i+2) {
  console.log(i);
  // 0, 1, 2, 3, 4, 5
}