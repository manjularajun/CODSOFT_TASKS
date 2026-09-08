// Get display elements
const currentDisplay = document.getElementById("current-display");
const previousDisplay = document.getElementById("previous-display");

// Get buttons
const numberButtons = document.querySelectorAll(".number");
const operatorButtons = document.querySelectorAll(".operator");
const equalsButton = document.querySelector(".equals");

const clearButton = document.getElementById("clear");
const deleteButton = document.getElementById("delete");
const percentageButton = document.getElementById("percentage");


// Calculator variables
let currentValue = "";
let previousValue = "";
let operator = "";


// Update the display
function updateDisplay() {
    currentDisplay.textContent = currentValue || "0";
    previousDisplay.textContent =
        previousValue && operator
            ? `${previousValue} ${operator}`
            : "";
}


// Add numbers
numberButtons.forEach(button => {

    button.addEventListener("click", () => {

        const value = button.textContent;

        // Prevent multiple decimal points
        if (value === "." && currentValue.includes(".")) {
            return;
        }

        currentValue += value;

        updateDisplay();
    });

});


// Select operator
operatorButtons.forEach(button => {

    button.addEventListener("click", () => {

        if (currentValue === "" && previousValue === "") {
            return;
        }

        if (currentValue !== "" && previousValue !== "") {
            calculate();
        }

        if (currentValue !== "") {
            previousValue = currentValue;
            currentValue = "";
        }

        operator = button.textContent;

        updateDisplay();
    });

});


// Calculate result
function calculate() {

    const firstNumber = parseFloat(previousValue);
    const secondNumber = parseFloat(currentValue);

    if (isNaN(firstNumber) || isNaN(secondNumber)) {
        return;
    }

    let result;

    if (operator === "+") {
        result = firstNumber + secondNumber;
    }
    else if (operator === "−") {
        result = firstNumber - secondNumber;
    }
    else if (operator === "×") {
        result = firstNumber * secondNumber;
    }
    else if (operator === "÷") {

        if (secondNumber === 0) {
            currentValue = "Error";
            previousValue = "";
            operator = "";

            updateDisplay();
            return;
        }

        result = firstNumber / secondNumber;
    }

    currentValue = String(
        Number(result.toFixed(10))
    );

    previousValue = "";
    operator = "";

    updateDisplay();
}


// Equals button
equalsButton.addEventListener("click", () => {

    if (currentValue !== "" && previousValue !== "" && operator !== "") {
        calculate();
    }

});


// Clear everything
clearButton.addEventListener("click", () => {

    currentValue = "";
    previousValue = "";
    operator = "";

    updateDisplay();

});


// Delete last character
deleteButton.addEventListener("click", () => {

    if (currentValue === "Error") {
        currentValue = "";
    }
    else {
        currentValue = currentValue.slice(0, -1);
    }

    updateDisplay();

});


// Percentage
percentageButton.addEventListener("click", () => {

    if (currentValue === "") {
        return;
    }

    currentValue = String(
        parseFloat(currentValue) / 100
    );

    updateDisplay();

});


// Keyboard support
document.addEventListener("keydown", (event) => {

    const key = event.key;

    if ((key >= "0" && key <= "9") || key === ".") {

        if (key === "." && currentValue.includes(".")) {
            return;
        }

        currentValue += key;
        updateDisplay();
    }

    else if (key === "+" || key === "-") {

        if (currentValue !== "") {
            previousValue = currentValue;
            currentValue = "";
            operator = key === "+" ? "+" : "−";

            updateDisplay();
        }
    }

    else if (key === "*") {

        if (currentValue !== "") {
            previousValue = currentValue;
            currentValue = "";
            operator = "×";

            updateDisplay();
        }
    }

    else if (key === "/") {

        if (currentValue !== "") {
            previousValue = currentValue;
            currentValue = "";
            operator = "÷";

            updateDisplay();
        }
    }

    else if (key === "Enter" || key === "=") {

        if (currentValue !== "" && previousValue !== "" && operator !== "") {
            calculate();
        }
    }

    else if (key === "Backspace") {
        currentValue = currentValue.slice(0, -1);
        updateDisplay();
    }

    else if (key === "Escape") {

        currentValue = "";
        previousValue = "";
        operator = "";

        updateDisplay();
    }

});