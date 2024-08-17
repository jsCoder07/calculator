class Calculator {
  constructor(previousText, currentText) {
    this.currentText = currentText;
    this.previousText = previousText;
    this.clear();
  }
  clear() {
    this.currentOperand = "";
    this.previousOperand = "";
    this.operation = undefined;
  }
  delete() {
    this.currentOperand=this.currentOperand.toString().slice(0,-1)
   
  }
  appendNumber(number) {
    if (number === "." && this.currentOperand.includes(".")) return;
    this.currentOperand = this.currentOperand.toString() + number.toString();
  }
  selectOperation(operation) {
    if (this.currentOperand === "") return;
    if (this.previousOperand !== "") {
      this.compute();
    }
    this.operation = operation;
    this.previousOperand = this.currentOperand;
    this.currentOperand = "";
  }
  compute() {
    let computation;
    const previous = parseFloat(this.previousOperand);
    const current = parseFloat(this.currentOperand);
    if (isNaN(previous) || isNaN(current)) return;
    switch (this.operation) {
      case "+":
        computation = previous + current;
        break;
      case "-":
        computation = previous - current;
        break;
      case "/":
        computation = previous / current;
        break;
      case "x":
        computation = previous * current;
        break;
      case "%":
        computation = previous % current;
        break;
      default:
        return;
    }
    this.currentOperand=computation
    this.operation=undefined
    this.previousOperand=''
  }
  getNumber(number){
    const stringNum=number.toString()
    const intSection=parseFloat(stringNum.split('.')[0])
    const decSection=stringNum.split('.')[1]
    const floatNum=parseFloat(number)
    let intDisplay
    if(isNaN(intSection)){
        intDisplay=''
    }
    else intDisplay=intSection.toLocaleString('en', {maximumFractionDigits:0})
    if(decSection !=null){
        return `${intDisplay}.${decSection}`
        
    }
    else{
        return intDisplay
    }
  }
  updateScreen() {
    this.currentText.innerText = this.getNumber(this.currentOperand);
    if(this.operation !=null){
        this.previousText.innerText=`${this.getNumber(this.previousOperand)} ${this.operation}`
    }
    else{
        this.previousText.innerText=''
    }
    
  }
}
const numberButtons = document.querySelectorAll("[data-number]");
const operationButtons = document.querySelectorAll("[data-operation]");
const equalButton = document.querySelector("[data-equals]");
const deleteButton = document.querySelector("[data-delete]");
const acButton = document.querySelector("[data-allclear]");
const previousText = document.querySelector("[data-previous]");
const currentText = document.querySelector("[data-current]");
const calculator = new Calculator(previousText, currentText);
numberButtons.forEach((button) => {
  button.addEventListener("click", () => {
    calculator.appendNumber(button.innerText);
    calculator.updateScreen();
  });
  //
});
acButton.addEventListener("click", () => {
  calculator.clear();
  calculator.updateScreen();
});
operationButtons.forEach((button) => {
  button.addEventListener("click", () => {
    calculator.selectOperation(button.innerText);
    calculator.updateScreen();
  });
});

equalButton.addEventListener("click", () => {
  calculator.compute();
  calculator.updateScreen();
});
deleteButton.addEventListener("click", () => {
  calculator.delete();
  calculator.updateScreen();
});
