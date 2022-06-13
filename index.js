class Calculator {
    constructor(previousOperandTextElement, currentOperandTextElement) {
        this.previousOperandTextElement = previousOperandTextElement;
        this.currentOperandTextElement = currentOperandTextElement;
        this.clear();
    }

    clear() {
        this.currentOperand = '';
        this.previousOperand = '';
        this.operation = undefined;
    }

    appendNumber(num) {
        // if '.' is clicked and current operand already has a '.' => return 
        if (num === '.' && this.currentOperand.includes('.')) return;
        // else append num to the current operand via string concatenation. Ex: 7 => 77
        this.currentOperand += num.toString();
    }

    getDisplayNumber(num) {
        // convert num to string
        const numString = num.toString();
        // get the numbers before the '.'
        const integerDigits = parseFloat(numString.split('.')[0]);
        // get the numbers after the '.'
        const decimalDigits = numString.split('.')[1];

        let integerDisplay;
        // if a number wasn't selected
        if (isNaN(integerDigits)) {
            integerDisplay = '';
        } else {
            // formatting so no decimal is displayed
            integerDisplay = integerDigits.toLocaleString('en', {maximumFractionDigits: 0})
        }

        // if there are decimals, concatenate integerDisplay and decimalDigits
        if (decimalDigits != null) {
            return `${integerDisplay}.${decimalDigits}`
        } else {
            return integerDisplay;
        }

    }

    updateOutput() {
        // call this.getDisplayNumber to perform formatting on any clicked numbers/decimals
        // set the text of the currentOperandTextElement to the formatted numbers/decimals
        this.currentOperandTextElement.textContent = this.getDisplayNumber(this.currentOperand);
        if (this.operation != null) {
            // if an operation is defined (previously clicked), add it to the textContent
            this.previousOperandTextElement.textContent = `${this.getDisplayNumber(this.previousOperand)} 
            ${this.operation}`;
        } else {
            this.previousOperandTextElement.textContent = '';
        }
    }

    chooseOperation(operation) {
        if (this.currentOperand === '') return;
        if (this.previousOperand !== '') {
            this.compute();
        }
        this.operation = operation;
        this.previousOperand = this.currentOperand;
        this.currentOperand = '';
    }

    delete() {
        this.currentOperand = this.currentOperand.slice(0, -1);
    }

    compute() {
        let computation;
        const prev = parseFloat(this.previousOperand);
        const current = parseFloat(this.currentOperand);
        if (isNaN(prev) || isNaN(current)) return;
        switch (this.operation) {
        case '+':
            computation = prev + current;
            break;
        case '-':
            computation = prev - current;
            break;
        case '*':
            computation = prev * current;
            break;
        case '÷':
            computation = prev / current;
            break;
        case '%':
            computation = prev % current;
            break;
        default:
            return
        }
        this.currentOperand = computation
        this.operation = undefined
        this.previousOperand = ''
    }
}

const numberButtons = document.querySelectorAll('.number');
const operationButtons = document.querySelectorAll('.operation');
const equalsButton = document.querySelector('.equals');
const deleteButton = document.querySelector('.delete');
const allClearButton = document.querySelector('.all-clear');
const previousOperandTextElement = document.querySelector('.previous-operand');
const currentOperandTextElement = document.querySelector('.current-operand');

const calculator = new Calculator(previousOperandTextElement, currentOperandTextElement)

numberButtons.forEach(number => number.addEventListener('click', (e) => {
    calculator.appendNumber(e.target.value);
    calculator.updateOutput();
}))

operationButtons.forEach(operation => operation.addEventListener('click', (e) => {
    calculator.chooseOperation(e.target.value);
    calculator.updateOutput();
}))

equalsButton.addEventListener('click', () => {
    calculator.compute();
    calculator.updateOutput();
})

allClearButton.addEventListener('click', () => {
    calculator.clear();
    calculator.updateOutput();
})

deleteButton.addEventListener('click', () => {
    calculator.delete();
    calculator.updateOutput();
})