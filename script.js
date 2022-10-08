var Calculator = /** @class */ (function () {
    function Calculator(previosOperandTextElement, currentOperandTextElement) {
        this.previosOperandTextElement = previosOperandTextElement;
        this.currentOperandTextElement = currentOperandTextElement;
        this.clear();
    }
    Calculator.prototype.clear = function () {
        this.currentOperand = "";
        this.previosOperand = "";
        this.operation = undefined;
    };
    Calculator.prototype["delete"] = function () {
        this.currentOperand = this.currentOperand.toString().slice(0, -1);
    };
    Calculator.prototype.appendNumber = function (number) {
        if (number == '.' && this.currentOperand.indexOf('.') != -1)
            return;
        this.currentOperand += number.toString();
    };
    Calculator.prototype.chooseOperations = function (operation) {
        if (this.currentOperand === "")
            return;
        if (this.previosOperand !== "") {
            this.compute();
        }
        this.operation = operation;
        this.previosOperand = this.currentOperand;
        this.currentOperand = "";
    };
    Calculator.prototype.compute = function () {
        var computation;
        var prev = parseFloat(this.previosOperand);
        var current = parseFloat(this.currentOperand);
        if (isNaN(prev) || isNaN(current))
            return;
        switch (this.operation.trim()) {
            case '+':
                computation = prev + current;
                break;
            case '-':
                computation = prev - current;
                break;
            case 'X':
                computation = prev * current;
                break;
            case '/':
                computation = prev / current;
                break;
            case '%':
                computation = (prev / current) * 100;
                break;
            default:
                return;
        }
        this.currentOperand = computation.toString();
        this.operation = undefined;
        this.previosOperand = "";
    };
    Calculator.prototype.getDisplayNumber = function (number) {
        var stringNumber = number.toString();
        var integerDigits = parseFloat(stringNumber.split('.')[0]);
        var decimalDigits = stringNumber.split('.')[1];
        var integerDisplay;
        if (isNaN(integerDigits)) {
            integerDisplay = '';
        }
        else {
            integerDisplay = integerDigits.toLocaleString('en', {
                maximumFractionDigits: 0
            });
        }
        if (decimalDigits != null) {
            return "".concat(integerDisplay, ".").concat(decimalDigits);
        }
        else {
            return integerDisplay;
        }
    };
    Calculator.prototype.handleScrollToBottom = function (element) {
        element === null || element === void 0 ? void 0 : element.scrollTo(0, element.scrollHeight);
    };
    Calculator.prototype.handleScrollToTop = function (element) {
        element.scrollTop = 0;
    };
    Calculator.prototype.updateDisplay = function () {
        this.currentOperandTextElement.innerHTML = this.getDisplayNumber(this.currentOperand);
        this.handleScrollToBottom(this.currentOperandTextElement);
        if (this.operation != null) {
            this.handleScrollToTop(this.currentOperandTextElement);
            this.previosOperandTextElement.innerHTML = "".concat(this.getDisplayNumber(this.previosOperand), " ").concat(this.operation.toLowerCase());
        }
        else {
            this.previosOperandTextElement.innerHTML = '';
        }
    };
    return Calculator;
}());
var numberButtons = document.querySelectorAll("[data-number]");
var operationButtons = document.querySelectorAll("[data-operation]");
var equalsButton = document.querySelector("[data-equals]");
var allClearButton = document.querySelector("[data-all-clear]");
var deleteButton = document.querySelector("[data-delete]");
var previosOperandTextElement = document.querySelector("[data-previos-operand]");
var currentOperandTextElement = document.querySelector("[data-current-operand]");
var calcuator = new Calculator(previosOperandTextElement, currentOperandTextElement);
numberButtons.forEach(function (button) {
    button.addEventListener('click', function () {
        calcuator.appendNumber(button.innerText);
        calcuator.updateDisplay();
    });
});
numberButtons.forEach(function (button) {
    button.addEventListener('click', clickONNumbers);
});
var clickONNumbers = function (button) {
    console.log(button);
    calcuator.appendNumber(button === null || button === void 0 ? void 0 : button.innerText);
    calcuator.updateDisplay();
};
operationButtons.forEach(function (button) {
    button.addEventListener('click', function () {
        calcuator.chooseOperations(button.innerText);
        calcuator.updateDisplay();
    });
});
equalsButton === null || equalsButton === void 0 ? void 0 : equalsButton.addEventListener('click', function (button) {
    calcuator.compute();
    calcuator.updateDisplay();
});
allClearButton === null || allClearButton === void 0 ? void 0 : allClearButton.addEventListener('click', function (button) {
    calcuator.clear();
    calcuator.updateDisplay();
});
deleteButton === null || deleteButton === void 0 ? void 0 : deleteButton.addEventListener('click', function (button) {
    calcuator["delete"]();
    calcuator.updateDisplay();
});
