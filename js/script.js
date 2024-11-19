document.addEventListener("DOMContentLoaded", () => {
    const buttonContainer = document.getElementById("button-container");
    const toggleBtn = document.getElementById("toggle-dark-mode");
    const resultDisplay = document.getElementById("result");
    const operationDisplay = document.getElementById("operation");
    const historyList = document.getElementById("history-list");
    let currentOperation = "";
    let isEvaluated = false; // New flag to track evaluation status
  
    toggleBtn.addEventListener("click", () => {
      document.body.classList.toggle("dark-mode");
    });
  
    buttonContainer.addEventListener("click", (event) => {
      const target = event.target;
      const value = target.getAttribute("data-value");
      const action = target.getAttribute("data-action");
  
      if (action === "clear") {
        clearDisplay();
      } else if (action === "equals") {
        evaluateOperation();
      } else if (action === "backspace") {
        removeLastValue();
      } else if (value) {
        if (isEvaluated) {
          // Reset operation and result if new input comes after evaluation
          clearDisplay();
        }
        appendValue(value);
      }
    });
  
    // Functions
    function clearDisplay() {
      currentOperation = "";
      resultDisplay.textContent = "0";
      operationDisplay.textContent = "";
      isEvaluated = false; // Reset evaluation flag on clear
    }
  
    function appendValue(value) {
      // List of operators
      const operators = ["+", "-", "*", "/"];
  
      if (operators.includes(value)) {
        if (operators.includes(currentOperation.slice(-1))) {
          currentOperation = currentOperation.slice(0, -1) + value;
        } else {
          currentOperation += value;
        }
      } else {
        currentOperation += value;
      }
  
      operationDisplay.textContent = currentOperation;
    }

    function removeLastValue() {
        currentOperation = currentOperation.slice(0, -1);

        operationDisplay.textContent = currentOperation || "0";
    }
  
    function evaluateOperation() {
      try {
        const result = eval(currentOperation); // Basic evaluation (consider replacing with a safer parser in production)
        resultDisplay.textContent = result;
        addHistoryEntry(currentOperation, result);
        currentOperation = result.toString();
        isEvaluated = true; // Set the flag after evaluation
      } catch (error) {
        resultDisplay.textContent = "Error";
      }
    }
  
    function addHistoryEntry(operation, result) {
      const historyItem = document.createElement("li");
      historyItem.textContent = `${operation} = ${result}`;
      historyList.appendChild(historyItem);
    }
    
  });
  