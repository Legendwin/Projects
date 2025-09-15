let runningTotal = 0;
let buffer = "0";
let previousOperator;

const screen = document.querySelector('.screen');

function buttonClick(value) {
    if (isNaN(value)) {
        handleSymbol(value);
    }
    else {
        handleNumber(value);
    }
    screen.innerText = buffer;
}

function handleSymbol(symbol) {
    switch(symbol) {
        case 'C':
            buffer = '0';
            runningTotal = 0;
            break;
        case '=':
            if (previousOperator === null) {
                return
            }
            flushOperation(parseFloat(buffer));
            previousOperator = null;
            buffer = runningTotal;
            runningTotal = 0;
            break;
        case '←':
            if (buffer.length === 1) {
                buffer = '0';
            }
            else {
                buffer = buffer.substring(0, buffer.length - 1);
            }
            break;
        case '.':
            if (!buffer.includes('.')) {
                buffer += '.';
            }
            break;
        case '+':
        case '−':
        case '×':
        case '÷':
        case 'mod':
        case 'log':
        case 'sin':
        case 'cos':
        case 'tan':
        case 'ⅹ²':
        case '√ⅹ':
            handleMath(symbol);
            break;
    }
}

function handleMath(symbol) {
    if (buffer === '0') {
        return
    }

    const floatBuffer = parseFloat(buffer);

    if (runningTotal === 0) {
        runningTotal = floatBuffer;
    }
    else {
        flushOperation(floatBuffer);
    }
    previousOperator = symbol;
    buffer = '0';
}

function flushOperation(floatBuffer) {
    if (previousOperator === '+') {
        runningTotal += floatBuffer;
    }
    else if (previousOperator === '−') {
        runningTotal -= floatBuffer;
    }
    else if (previousOperator === '×') {
        runningTotal *= floatBuffer;
    }
    else if (previousOperator === '÷') {
        runningTotal /= floatBuffer;
    }
    else if (previousOperator === 'mod') {
        runningTotal %= floatBuffer;
    }
    else if (previousOperator === 'log') {
        runningTotal = Math.log(floatBuffer) / Math.log(runningTotal);
    }
    else if (previousOperator === 'sin') {
        runningTotal = Math.sin(floatBuffer);
    }
    else if (previousOperator === 'cos') {
        runningTotal = Math.cos(floatBuffer);
    }
    else if (previousOperator === 'tan') {
        runningTotal = Math.tan(floatBuffer);
    }
    else if (previousOperator === 'ⅹ²') {
        runningTotal = floatBuffer * floatBuffer;
    }
    else if (previousOperator === '√ⅹ') {
        runningTotal = Math.sqrt(floatBuffer);
    }
}

function handleNumber(numberString) {
    if (buffer === '0') {
        buffer = numberString;
    }
    else {
        buffer += numberString;
    }
}

function init() {
    document.querySelector('.calc-buttons').addEventListener('click', function(event) {
        let value = event.target.innerText;
        buttonClick(value);
    })
}

init();