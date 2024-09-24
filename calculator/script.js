// Get display element
const display = document.getElementById('display');

// Get all buttons
const buttons = document.querySelectorAll('.btn');

// Variables for the operation
let currentInput = '';
let previousInput = '';
let operator = '';
let result = '';

// Add event listener to each button
buttons.forEach(button => {
    button.addEventListener('click', function() {
        const value = this.value;

        if (value === 'C') {
            // Clear everything
            currentInput = '';
            previousInput = '';
            operator = '';
            display.value = '';
        } else if (value === '⌫') {
            // Handle backspace - remove the last character
            currentInput = currentInput.slice(0, -1);
            display.value = currentInput;
        } else if (value === '=') {
            // Perform the calculation
            if (operator && currentInput && previousInput) {
                result = calculate(previousInput, currentInput, operator);
                display.value = result;
                currentInput = result;
                previousInput = '';
                operator = '';
            }
        } else if (this.classList.contains('operator')) {
            // Handle operator input
            if (currentInput) {
                previousInput = currentInput;
                currentInput = '';
            }
            operator = value;
        } else {
            // Handle number input
            currentInput += value;
            display.value = currentInput;
        }
    });
});

// Calculation function
function calculate(num1, num2, op) {
    const n1 = parseFloat(num1);
    const n2 = parseFloat(num2);

    switch (op) {
        case '+':
            return n1 + n2;
        case '-':
            return n1 - n2;
        case '*':
            return n1 * n2;
        case '/':
            return n1 / n2;
        default:
            return '';
    }
}

