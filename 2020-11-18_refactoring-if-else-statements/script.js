// 1. Default parameters
console.log("1. Default parameters ");

function sumFunctionThatMayBreak(a, b, inconsistentParameter) {
  return a + b + inconsistentParameter;
}
console.log(sumFunctionThatMayBreak);
console.log(sumFunctionThatMayBreak(1, 39, 2)); // => 42
console.log(sumFunctionThatMayBreak(2, 40, undefined)); // => NaN

// ------------------

let sumFunctionWithIf = (a, b, inconsistentParameter) => {
  if (inconsistentParameter === undefined) {
    return a + b;
  } else {
    return a + b + inconsistentParameter;
  }
};
console.log(sumFunctionWithIf);
console.log(sumFunctionWithIf(1, 39, 2)); // => 42
console.log(sumFunctionWithIf(2, 40, undefined)); // => 42

// ------------------

function simplifiedSumFunction(a, b, inconsistentParameter = 0) {
  return a + b + inconsistentParameter;
}
console.log(simplifiedSumFunction);
console.log(simplifiedSumFunction(1, 39, 2)); // => 42
console.log(simplifiedSumFunction(2, 40, undefined)); // => 42

// ------------------

// 2. OR operator (||)
console.log("2. OR operator (||)");

function sumFunctionWithIf(a, b, inconsistentParameter) {
  if (inconsistentParameter === undefined || inconsistentParameter === null || inconsistentParameter === false) {
    return a + b;
  } else {
    return a + b + inconsistentParameter;
  }
}
console.log(sumFunctionWithIf);
console.log(sumFunctionWithIf(1, 39, 2)); // => 42
console.log(sumFunctionWithIf(2, 40, undefined)); // => 42
console.log(sumFunctionWithIf(2, 40, null)); // => 42
console.log(sumFunctionWithIf(2, 40, false)); // => 42
console.log(sumFunctionWithIf(2, 40, 0)); // => 42
/// 🚨🚨🚨 but:
console.log(sumFunctionWithIf(1, 39, "")); // => "40"

// ------------------

function sumFunctionWithOr(a, b, inconsistentParameter) {
  inconsistentParameter = inconsistentParameter || 0;
  return a + b + inconsistentParameter;
}
// || returns the right-hand side when the left-side is a falsey value;
// || returns the left-side if it's truthy.

console.log(sumFunctionWithOr);
console.log(sumFunctionWithOr(1, 39, 2)); // => 42
console.log(sumFunctionWithOr(2, 40, undefined)); // => 42
console.log(sumFunctionWithOr(2, 40, null)); // => 42
console.log(sumFunctionWithOr(2, 40, false)); // => 42
console.log(sumFunctionWithOr(2, 40, "")); // => 42
console.log(sumFunctionWithOr(2, 40, 0)); // => 42

// ------------------

// 3. Nullish coalescing (??)
console.log("3. Nullish coalescing (??)");

// Sometimes you do want to preserve 0 or '' as valid arguments
// ?? returns the right side only when the left side is null or undefined

function sumFunctionWithNullish(a, b, inconsistentParameter) {
  inconsistentParameter = inconsistentParameter ?? 0.424242;
  return a + b + inconsistentParameter;
}
console.log(sumFunctionWithNullish);
console.log(sumFunctionWithNullish(2, 40, undefined)); // => 42.424242
console.log(sumFunctionWithNullish(2, 40, null)); // => 42.424242
/// 🚨🚨🚨 but:
console.log(sumFunctionWithNullish(1, 39, 2)); // => 42
console.log(sumFunctionWithNullish(2, 40, false)); // => 42
console.log(sumFunctionWithNullish(2, 40, "")); // => "42"
console.log(sumFunctionWithNullish(2, 40, 0)); // => 42

// ------------------

// 4. Optional chaining
console.log("4. Optional chaining");

let functionThatBreaks = (object) => {
  return object.name.firstName;
};

console.log(functionThatBreaks({ name: { firstName: "Sylwia", lasName: "Vargas" }, id: 1 })); // ✅ "Sylwia"
console.log(functionThatBreaks({ id: 2 })); // 🚨 Uncaught TypeError: Cannot read property 'firstName' of undefined 🚨

// ------------------

function functionWithIf(object) {
  if (object && object.name && object.name.firstName) {
    return object.name.firstName;
  }
}

functionWithIf({ name: { firstName: "Sylwia", lasName: "Vargas" }, id: 1 }); // "Sylwia"
functionWithIf({ name: { lasName: "Vargas" }, id: 2 }); // undefined
functionWithIf({ id: 3 }); // undefined
functionWithIf(); // undefined

// with optional chaining

function functionWithChaining(object) {
  return object?.name?.firstName;
}

functionWithChaining({ name: { firstName: "Sylwia", lasName: "Vargas" }, id: 1 }); // "Sylwia"
functionWithChaining({ name: { lasName: "Vargas" }, id: 2 }); // undefined
functionWithChaining({ id: 3 }); // undefined
functionWithChaining(); // undefined

// ------------------

// 5. No-else-returns and guard clauses
console.log("5. No-else-returns and guard clauses ");
// no-else-return : if the condition is not met, the function ends the execution of the if-else and jumps to the next line
// guards end the code execution even earlier

function nestedIfElseHell(str) {
  if (typeof str == "string") {
    if (str.length > 1) {
      return str.slice(0, -1);
    } else {
      return null;
    }
  } else {
    return null;
  }
}

nestedIfElseHell(""); // => null
nestedIfElseHell("h"); // => null
nestedIfElseHell("hello!"); // => "hello"

// with no-else returns

function noElseReturns(str) {
  if (typeof str == "string") {
    if (str.length > 1) {
      return str.slice(0, -1);
    }
  }

  return null;
}

noElseReturns(""); // => null
noElseReturns("h"); // => null
noElseReturns("hello!"); // => "hello"

// with guard clauses

function guardClauseFun(str) {
  // ✅ first guard: check the type
  if (typeof str !== "string") return null;
  // ✅ second guard: check for the length
  if (str.length <= 3) console.warn("your string should be at least 3 characters long and its length is", str.length);
  // otherwise:
  return str.slice(0, -1);
}

guardClauseFun(5); // => null
guardClauseFun("h"); // => undefined with a warning
guardClauseFun("hello!"); // => "hello"
