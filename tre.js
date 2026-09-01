// ==========================================
// SCOPE AND CLOSURE IN JAVASCRIPT
// ==========================================

// ==========================================
// 1. SCOPE BASICS
// ==========================================

// Global Scope - accessible everywhere
var globalVar = "I am global";

function showGlobalScope() {
  console.log(globalVar); // Can access global variable
}

// ==========================================
// 2. FUNCTION SCOPE (Local Scope)
// ==========================================

function functionScope() {
  var localVar = "I am local"; // Only accessible inside this function
  
  console.log(localVar); // Works fine
  console.log(globalVar); // Can access global from inside function
}

// console.log(localVar); // ERROR! localVar is not defined outside the function

// ==========================================
// 3. BLOCK SCOPE (let and const)
// ==========================================

function blockScopeExample() {
  if (true) {
    var varVariable = "I am var";
    let letVariable = "I am let";
    const constVariable = "I am const";
  }
  
  console.log(varVariable); // Works - var ignores block scope
  // console.log(letVariable); // ERROR - let is block-scoped
  // console.log(constVariable); // ERROR - const is block-scoped
}

// Key Difference:
// - var: function-scoped
// - let: block-scoped
// - const: block-scoped

// ==========================================
// 4. NESTED SCOPE (Scope Chain)
// ==========================================

var outerVar = "outer";

function outerFunction() {
  var outerLocalVar = "outer local";
  
  function innerFunction() {
    var innerVar = "inner";
    
    console.log(innerVar); // Can access own scope
    console.log(outerLocalVar); // Can access parent scope
    console.log(outerVar); // Can access global scope
  }
  
  innerFunction();
  // console.log(innerVar); // ERROR - can't access inner scope from outer
}

// ==========================================
// 5. CLOSURES - THE MOST IMPORTANT CONCEPT
// ==========================================

// A closure is a function that has access to variables 
// from its outer scope even after the outer function has returned.

function createCounter() {
  let count = 0; // This variable is "closed over"
  
  return function() {
    count++; // The inner function can access and modify count
    return count;
  };
}

const counter = createCounter();
console.log(counter()); // 1
console.log(counter()); // 2
console.log(counter()); // 3

// Each call to createCounter creates a NEW closure with its own count
const counter2 = createCounter();
console.log(counter2()); // 1 (separate count variable)

// ==========================================
// 6. PRACTICAL CLOSURE EXAMPLE: Private Variables
// ==========================================

function createBankAccount(initialBalance) {
  let balance = initialBalance; // Private variable - can't access directly
  
  return {
    deposit: function(amount) {
      balance += amount;
      return balance;
    },
    withdraw: function(amount) {
      balance -= amount;
      return balance;
    },
    getBalance: function() {
      return balance;
    }
  };
}

const myAccount = createBankAccount(1000);
console.log(myAccount.getBalance()); // 1000
console.log(myAccount.deposit(500)); // 1500
console.log(myAccount.withdraw(200)); // 1300
// console.log(myAccount.balance); // undefined - balance is private!

// ==========================================
// 7. CLOSURE IN LOOPS (Common Mistake)
// ==========================================

// WRONG - Common mistake with var
function wrongLoop() {
  for (var i = 0; i < 3; i++) {
    setTimeout(function() {
      console.log("Wrong: " + i); // Will print 3, 3, 3
    }, 1000);
  }
}

// RIGHT - Using let (block-scoped)
function rightLoop() {
  for (let i = 0; i < 3; i++) {
    setTimeout(function() {
      console.log("Right: " + i); // Will print 0, 1, 2
    }, 1000);
  }
}

// ALTERNATIVE - Using closure with IIFE (Immediately Invoked Function Expression)
function alternativeLoop() {
  for (var i = 0; i < 3; i++) {
    (function(j) {
      setTimeout(function() {
        console.log("Alternative: " + j); // Will print 0, 1, 2
      }, 1000);
    })(i); // Pass i to the function
  }
}

// ==========================================
// 8. FUNCTION FACTORY WITH CLOSURES
// ==========================================

function createMultiplier(multiplier) {
  return function(number) {
    return number * multiplier; // Closes over 'multiplier'
  };
}

const double = createMultiplier(2);
const triple = createMultiplier(3);

console.log(double(5)); // 10
console.log(triple(5)); // 15

// ==========================================
// 9. MODULE PATTERN (Using Closures)
// ==========================================

const calculator = (function() {
  // Private variables and functions
  let result = 0;
  
  function logResult() {
    console.log("Result: " + result);
  }
  
  // Public methods (exposed through closure)
  return {
    add: function(x) {
      result += x;
      logResult();
      return this; // Allow chaining
    },
    subtract: function(x) {
      result -= x;
      logResult();
      return this;
    },
    multiply: function(x) {
      result *= x;
      logResult();
      return this;
    },
    getResult: function() {
      return result;
    }
  };
})();

calculator.add(5).subtract(2).multiply(3); // Chaining methods
console.log(calculator.getResult()); // 9

// ==========================================
// 10. KEY TAKEAWAYS
// ==========================================

/*
SCOPE:
- Defines where a variable is accessible
- Global Scope: accessible everywhere
- Function Scope: accessible only inside the function (var)
- Block Scope: accessible only inside the block (let, const)
- Scope Chain: inner functions can access outer variables

CLOSURE:
- A function that "remembers" and accesses variables from its outer scope
- Created every time a function is created
- Useful for:
  * Private variables and data encapsulation
  * Function factories
  * Module patterns
  * Callbacks and event handlers
  
BEST PRACTICES:
- Use 'let' and 'const' instead of 'var' (block-scoped)
- Understand closures to write better code
- Closures are powerful but can cause memory leaks if not careful
- Module pattern is great for organizing code
*/
