/*
Haven't worked through multiple operations (9*9*9)
*/

const history = document.querySelector('.history')
const output = document.querySelector('.output');
const clearBtn = document.querySelector('.clear');
const signBtn = document.querySelector('.sign');
const moduloBtn = document.querySelector('.modulo');
const divideBtn = document.querySelector('.divide');
const sevenBtn = document.querySelector('.seven');
const eightBtn = document.querySelector('.eight');
const nineBtn = document.querySelector('.nine');
const multiplyBtn = document.querySelector('.multiply');
const fourBtn = document.querySelector('.four');
const fiveBtn = document.querySelector('.five');
const sixBtn = document.querySelector('.six');
const minusBtn = document.querySelector('.minus');
const oneBtn = document.querySelector('.one');
const twoBtn = document.querySelector('.two');
const threeBtn = document.querySelector('.three');
const plusBtn = document.querySelector('.plus');
const zeroBtn = document.querySelector('.zero');
const pointBtn = document.querySelector('.point');
const equalsBtn = document.querySelector('.equals');
const numbersBtns = document.querySelectorAll('.number');
const operationBtns = document.querySelectorAll('.operation');

// Global String for holding multiple numbers
const DEFAULT_NUMBER_STR = "0"
let numberStr = DEFAULT_NUMBER_STR;
output.textContent = numberStr;

// Global Array for holding num1, operation, num2
let placeholderArray = [];

function add(a, b) {
    return a + b;
}
function subtract(a, b) {
    return a - b;
}
function multiply(a, b) {
    return a * b;
}
function divide(a, b) {
    return a / b;
}

function modulo(a, b) {
    return a % b;
}

function operate(operator, a, b) {
    let result = 0;
    switch (operator) {
        case 'add':
            result = add(a, b);
            break;
        case 'subtract':
            result = subtract(a, b);
            break;
        case 'multiply':
            result = multiply(a, b);
            break;
        case 'divide':
            if (b === 0) {
                return "Cannot divide by zero."
            } else {
                result = divide(a, b).toFixed(2);
                console.log(result);
            }
            break;
        case 'modulo':
            result = modulo(a, b);
            break;
        default:
            console.log(`Invalid operation requested.`)
    }
    return result;
}

clearBtn.addEventListener('click', clear);
function clear() {
    numberStr = DEFAULT_NUMBER_STR;
    output.textContent = numberStr;
    placeholderArray.length = 0;
}

signBtn.addEventListener('click', flipSign);
function flipSign() {
    let num = parseInt(numberStr);
    if (num < 0) {
        num = (num - (2 * num));
    } else if (num > 0) {
        num = num - num * 2;
    }
    numberStr = num.toString();
    output.textContent = numberStr;
}

/* Event listeners for all numbered buttons */
numbersBtns.forEach(item => item.addEventListener('click', (e) => {
    if (numberStr === DEFAULT_NUMBER_STR) {
        numberStr = e.target.value;
    } else {
        numberStr += e.target.value
    }
    output.textContent = numberStr;
}))

/* Event listeners for all operations */
operationBtns.forEach(item => item.addEventListener('click', (e) => {
    // Once an operator symbol is clicked, the numberStr is finalized.
    // We can now push the number into the placeholder array.
    let num = 0;
    if (numberStr.includes('.')) {
        num = parseFloat(numberStr);
    } else {
        num = parseInt(numberStr)
    }
    console.log(num)
    placeholderArray.push(num);

    // if there are 3 elements in the array, run operate()
    if (placeholderArray.length >= 3) {
        let len = placeholderArray.length;
        let operator = placeholderArray[len-2];
        let num1 = placeholderArray[len-3];
        let num2 = placeholderArray[len-1];
        let result = operate(operator, num1, num2);
        numberStr = result.toString();
        placeholderArray.push(result)
    }
    console.log(placeholderArray)
    placeholderArray.push(e.target.value)
    console.log(placeholderArray)

    let operatorStr = e.target.firstChild.data;
    output.textContent = `${numberStr} ${operatorStr}`;

    // clear the number string
    numberStr = DEFAULT_NUMBER_STR;
}))

equalsBtn.addEventListener('click', equals)

function equals() {
    let num = parseInt(numberStr);
    placeholderArray.push(num);
    
    let len = placeholderArray.length;
    let operator = placeholderArray[len-2];
    let num1 = placeholderArray[len-3];
    let num2 = placeholderArray[len-1];
    
    numberStr = operate(operator, num1, num2); 
    output.textContent = numberStr;
}

/* 
Scenario 1: 7 * 9 = 63 --> 63 + 3 = 66. 
Scenario 2: 7 * 9 + 3. Intermediate value needs to be calculated 
before + can be evaluated.

if (placeholderArray.length >= 3) {

}
*/