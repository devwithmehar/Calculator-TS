class Calculator {

  previosOperandTextElement: Element;
  currentOperandTextElement: Element;
  currentOperand: string;
  previosOperand: string;
  operation: any;
  clicktoEqual: boolean;

  constructor(previosOperandTextElement: Element , currentOperandTextElement: Element)
  {
    this.previosOperandTextElement = previosOperandTextElement;
    this.currentOperandTextElement = currentOperandTextElement;
    this.clear();
  }

  clear(){

    this.currentOperand = "";
    this.previosOperand = "";
    this.operation = undefined;
    this.clicktoEqual = false;
  }

  delete(){
    this.currentOperand = this.currentOperand.toString().slice(0,-1);
  }

  appendNumber(number: string){
    if(number == '.' && this.currentOperand.indexOf('.') != -1) return;
    if(this.clicktoEqual)
    {
      this.currentOperand =  number.toString();
      this.clicktoEqual = false;
    }
    else {
      this.currentOperand +=  number.toString();
    }

  }

  chooseOperations(operation: string){
    if(this.currentOperand === "") return;
    if(this.previosOperand !== ""){
      this.compute();
    }
    this.operation = operation;
    this.previosOperand = this.currentOperand;
    this.currentOperand = "";
  }

  compute(){
    let computation: number;
    const prev: number = parseFloat(this.previosOperand);
    const current: number = parseFloat(this.currentOperand);
    if(isNaN(prev) || isNaN(current)) return;
    switch(this.operation.trim()) {
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
        computation = prev/current;
        break;
      case '%':
        computation = (prev/100) * current;
        break;
       default:
       return;
    }

    this.currentOperand = computation.toString();
    this.operation = undefined;
    this.previosOperand = "";
    this.clicktoEqual = true;
  }

  getDisplayNumber(number) {
    const stringNumber: string = number.toString();
    const integerDigits: number = parseFloat(stringNumber.split('.')[0]);
    const decimalDigits: string = stringNumber.split('.')[1];

    let integerDisplay: string;
    if(isNaN(integerDigits)){
      integerDisplay = ''
    }
    else {
      integerDisplay = integerDigits.toLocaleString('en',{
        maximumFractionDigits: 0
      });
    }

    if(decimalDigits != null)
    {
      return `${integerDisplay}.${decimalDigits}`;
    }
    else
    {
      return integerDisplay;
    }

  }


  handleScrollToBottom(element: Element) {
    element?.scrollTo(0, element.scrollHeight);
  }

  handleScrollToTop(element: Element)
  {
    element.scrollTop = 0;
  }

  updateDisplay(){
    this.currentOperandTextElement.innerHTML = this.getDisplayNumber(this.currentOperand);
    this.handleScrollToBottom(this.currentOperandTextElement);
    if(this.operation != null){
      this.handleScrollToTop(this.currentOperandTextElement);
      this.previosOperandTextElement.innerHTML = `${ this.getDisplayNumber(this.previosOperand)} ${this.operation.toLowerCase()}`;

    }
    else {
      this.previosOperandTextElement.innerHTML = '' ;
    }
  }

}





const numberButtons: NodeListOf<Element> = document.querySelectorAll(`[data-number]`);
const operationButtons: NodeListOf<Element> = document.querySelectorAll(`[data-operation]`);
const equalsButton: Element = document.querySelector(`[data-equals]`);
const allClearButton: Element = document.querySelector(`[data-all-clear]`);
const deleteButton: Element = document.querySelector(`[data-delete]`);
const previosOperandTextElement: Element = document.querySelector(`[data-previos-operand]`);
const currentOperandTextElement: any = document.querySelector(`[data-current-operand]`);


const calcuator: Calculator = new Calculator(previosOperandTextElement, currentOperandTextElement);

numberButtons.forEach((button: any)  => {
  button.addEventListener('click',() => {
    calcuator.appendNumber(button.innerText);
    calcuator.updateDisplay();
  });
})



numberButtons.forEach((button: any)  => {
  button.addEventListener('click', clickONNumbers);
})

const clickONNumbers =  (button: any)  => {
  calcuator.appendNumber(button?.innerText);
  calcuator.updateDisplay();
}

operationButtons.forEach((button: any) => {
  button.addEventListener('click', () => {
    calcuator.chooseOperations(button.innerText);
  calcuator.updateDisplay();
  } );
})


equalsButton?.addEventListener('click', (button: any) => {
  calcuator.compute();
  calcuator.updateDisplay();
})

allClearButton?.addEventListener('click', (button: any) => {
  calcuator.clear();
  calcuator.updateDisplay();
})

deleteButton?.addEventListener('click', (button: any) => {
  calcuator.delete();
  calcuator.updateDisplay();
})


