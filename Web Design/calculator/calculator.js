const previousOp = document.getElementById('previous-operand');
const currentOp = document.getElementById('current-operand');

let current = '0';
let previous = '';
let operation = null;

function compute() {
    const prev = parseFloat(previous);
    const curr = parseFloat(current);
    if (isNaN(prev) || isNaN(curr)) {
        return;
    };
    let result;
    switch (operation) {
        case 'add':
            result = prev + curr;
            break;
        case 'subtract':
            result = prev - curr;
            break;
        case 'multiply':
            result = prev * curr;
            break;
        case 'divide':
            if (curr === 0) {
                result = 'Error';
                break;
            } else {
                result = prev / curr;
                break;
            };
        default:
            return;
    };
    if (result === 'Error') {
        current = 'Error';
        previous = '';
        operation = null;
        updateDisplay();
        return;
    } else {
        current = parseFloat(result.toFixed(10)).toString();
        previous = '';
        operation = null;
        updateDisplay();
    };
};

function opSymbol(op) {
    switch (op) {
        case 'add':
            return '+';
        case 'subtract':
            return '-';
        case 'multiply':
            return '×';
        case 'divide':
            return '÷';
        default:
            return '';
    };
};

function chooseOperation(op) {
    if (current === '') {
        return;
    };
    if (previous !== '') {
        compute();
    } else {
        operation = op;
        previous = current;
        current = '0';
        updateDisplay();
    };
};

function appendNumber(num) {
    if (current === 'Error') {
        current = '0';
    };
    if (num === '.' && current.includes('.')) {
        return;
    };
    if (current === '0' && num !== '.') {
        current = num;
    } else {
        current = current + num;
    };
    updateDisplay();
};

function clearAll() {
    current = '0';
    previous = '';
    operation = null;
    updateDisplay();
};

function clearEntry () {
    current = '0';
    updateDisplay();
};

function deleteDigit() {
    if (current === 'Error') {
        clearAll();
        return;
    };
    if (current.length <= 1) {
        current = '0';
    } else {
        current = current.slice(0, -1);
    };
    updateDisplay();
};

document.querySelectorAll('.btn.number').forEach(btn => {
    btn.addEventListener('click', (e) => appendNumber(e.target.dataset.number));
});

document.querySelectorAll('.btn.operator').forEach(btn => {
    const action = btn.dataset.action;
    if (action === 'clear') {
        btn.addEventListener('click', clearAll);
    } else if (action === 'clear-entry') {
        btn.addEventListener('click', clearEntry);
    } else if (action === 'delete') {
        btn.addEventListener('click', deleteDigit);
    } else if (action === 'equals') {
        btn.addEventListener('click', compute);
    } else {
        btn.addEventListener('click', () => chooseOperation(action));
    };
});

function updateDisplay() {
    currentOp.textContent = current;
    previousOp.textContent = operation && previous ? `${previous} ${opSymbol(operation)}` : '';
};

updateDisplay();