// Calculator variables
let currentNumber = '0';
let previousNumber = '';
let operator = '';
let newNumber = true;

// Calculator functions
function updateDisplay() {
    document.getElementById('display').textContent = currentNumber;
}

function appendNumber(num) {
    if (newNumber) {
        currentNumber = num;
        newNumber = false;
    } else {
        currentNumber = currentNumber + num;
    }
    updateDisplay();
}

function setOperator(op) {
    previousNumber = currentNumber;
    operator = op;
    newNumber = true;
}

function clearDisplay() {
    currentNumber = '0';
    previousNumber = '';
    operator = '';
    newNumber = true;
    updateDisplay();
}

function backspace() {
    if (currentNumber.length > 1) {
        currentNumber = currentNumber.slice(0, -1);
    } else {
        currentNumber = '0';
        newNumber = true;
    }
    updateDisplay();
}

function negate() {
    currentNumber = (-parseFloat(currentNumber)).toString();
    updateDisplay();
}

function percentage() {
    currentNumber = (parseFloat(currentNumber) / 100).toString();
    updateDisplay();
}

function calculate() {
    let result;
    const prev = parseFloat(previousNumber);
    const current = parseFloat(currentNumber);

    switch(operator) {
        case '+':
            result = prev + current;
            break;
        case '-':
            result = prev - current;
            break;
        case '*':
            result = prev * current;
            break;
        case '/':
            result = prev / current;
            break;
        default:
            return;
    }

    currentNumber = result.toString();
    newNumber = true;
    updateDisplay();
}

// Converter variables and functions
const conversions = {
    length: {
        units: ['meters', 'kilometers', 'miles', 'feet', 'inches'],
        toBase: {
            meters: x => x,
            kilometers: x => x * 1000,
            miles: x => x * 1609.34,
            feet: x => x * 0.3048,
            inches: x => x * 0.0254
        },
        fromBase: {
            meters: x => x,
            kilometers: x => x / 1000,
            miles: x => x / 1609.34,
            feet: x => x / 0.3048,
            inches: x => x / 0.0254
        }
    },
    weight: {
        units: ['kilograms', 'grams', 'pounds', 'ounces'],
        toBase: {
            kilograms: x => x,
            grams: x => x / 1000,
            pounds: x => x * 0.453592,
            ounces: x => x * 0.0283495
        },
        fromBase: {
            kilograms: x => x,
            grams: x => x * 1000,
            pounds: x => x / 0.453592,
            ounces: x => x / 0.0283495
        }
    },
    temperature: {
        units: ['Celsius', 'Fahrenheit', 'Kelvin'],
        toBase: {
            Celsius: x => x,
            Fahrenheit: x => (x - 32) * 5/9,
            Kelvin: x => x - 273.15
        },
        fromBase: {
            Celsius: x => x,
            Fahrenheit: x => x * 9/5 + 32,
            Kelvin: x => x + 273.15
        }
    }
};

function updateConversionUnits() {
    const type = document.getElementById('convertType').value;
    const units = conversions[type].units;
    
    const fromUnit = document.getElementById('fromUnit');
    const toUnit = document.getElementById('toUnit');
    
    fromUnit.innerHTML = '';
    toUnit.innerHTML = '';
    
    units.forEach(unit => {
        fromUnit.add(new Option(unit, unit));
        toUnit.add(new Option(unit, unit));
    });
    
    convert();
}

function convert() {
    const type = document.getElementById('convertType').value;
    const fromValue = parseFloat(document.getElementById('fromValue').value);
    const fromUnit = document.getElementById('fromUnit').value;
    const toUnit = document.getElementById('toUnit').value;
    
    if (isNaN(fromValue)) {
        document.getElementById('toValue').value = '';
        return;
    }
    
    const baseValue = conversions[type].toBase[fromUnit](fromValue);
    const result = conversions[type].fromBase[toUnit](baseValue);
    
    document.getElementById('toValue').value = result.toFixed(4);
}

// Initialize converter
updateConversionUnits();