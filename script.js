let operator = '';
var firstNum = 0;
var secondNum = 0;


//-------------------Calculator Functions ----------------------//

function add (a,b) {
	return a + b;
}

function subtract (a,b) {
    return a-b;
}

function multiply (a,b){
    return a * b;
}

function divide (a,b){
    return a / b;
}

function mod(a,b){
    return a%b;
}

function operate (a, x, b){
    if ( x === 'addition') return add(a,b);
    if ( x === 'subtraction' ) return subtract(a,b);
    if (x === 'multiplication') return multiply(a,b);
    if (x === 'division') return divide(a,b);
    if (x === 'modulo') return mod(a,b);
}




//----------------------------------Calulator Button Clicks--------------------------------//


const calculator = document.querySelector('.calculator');
const keys = calculator.querySelectorAll('.calculator_keys');
const display = document.querySelector('.display');
const clear = document.querySelector('#clear');

keys.forEach( (button) => { button.addEventListener('click', e => {
    if(e.target.matches('button')){
        const key = e.target;
        const action = key.dataset.action;
        const keyContent = key.textContent;
        const displayedNumber = display.textContent;
        const previousKeyType = calculator.dataset.previousKey;
        const isNegative = calculator.dataset.negative;

        Array.from(key.parentNode.children).forEach(k => k.classList.remove('pressed'));

        //----------------------------------Number Click--------------------------------//
        if(!action){
            if ((displayedNumber === '0' || previousKeyType === 'operator')&& isNegative!='negative'){
                display.textContent = keyContent; 
            } else {
                display.textContent = displayedNumber + keyContent;
            }
            calculator.dataset.previousKey = 'number';
            clear.textContent = 'CE';
            clear.classList.add('CE');
        //----------------------------------Operator Click--------------------------------//
        } else if (
            action === 'addition' ||
            action === 'subtraction' ||
            action === 'multiplication' ||
            action === 'division' ||
            action === 'modulo'
          ) {
            if ((operator === 'multiplication' || operator === 'division' || operator === 'modulo') & action === 'subtraction') {
                display.textContent = '-';
                calculator.dataset.negative = 'negative';
                return;
                //need to add negative function
            } else if (operator != '' && previousKeyType != 'equals'){ 
                secondNum = parseFloat(display.textContent);
                display.textContent = operate(firstNum, operator, secondNum);
                firstNum = parseFloat(display.textContent);
                operator = action;
            } else {
            firstNum = parseFloat(displayedNumber);
            operator = action;
            }
            calculator.dataset.previousKey = 'operator';
            key.classList.add("pressed");
        //----------------------------------Decimal Click--------------------------------// 
          } else if (action === 'decimal'){
            let myStr = displayedNumber.toString();
            if (previousKeyType === 'operator'){
                display.textContent = '0.';               
            } else if (!myStr.includes('.')){
                display.textContent = displayedNumber + '.';
            } else {
              return;
            }
            calculator.dataset.previousKey = 'decimal';
        //----------------------------------Equals Click--------------------------------//
          } else if (action === 'equals'){
              if(operator === ''){
                  return;
              } else if(previousKeyType === 'equals'){
                  display.textContent = operate(firstNum, operator, secondNum);
                  firstNum = parseFloat(display.textContent);
              } else {
                secondNum = parseFloat(display.textContent);
                display.textContent = operate(firstNum, operator, secondNum);
                firstNum = parseFloat(display.textContent);
              }
                calculator.dataset.previousKey = 'equals';
                clear.textContent = 'AC';
                clear.classList.remove('CE');
        //----------------------------------Clear Click--------------------------------//
          } else if (action === 'clear'){
              if (clear.textContent === 'CE'){
                display.textContent = firstNum;
                clear.textContent = 'AC';
              } else {
                  firstNum = 0;
                  secondNum = 0;
                  operator = '';
                  display.textContent = 0;
              }
              calculator.dataset.previousKey = 'clear';
              calculator.dataset.negative = '';
          }

    }
})
})