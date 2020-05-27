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
    if ( x === 'addition'){
        return add(a,b);
    } else if ( x === 'subtraction' ){
        return subtract(a,b);
    } else if (x === 'multiplication'){
        return multiply(a,b);
    } else if (x === 'division'){
        return divide(a,b);
    } else if (x === 'modulo'){
        return mod(a,b);
    }
}







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

        Array.from(key.parentNode.children).forEach(k => k.classList.remove('pressed'));


        if(!action){
            if (displayedNumber === '0' || previousKeyType === 'operator'){
                display.textContent = keyContent; 
            } else {
                display.textContent = displayedNumber + keyContent;
            }
            calculator.dataset.previousKey = 'number';
            clear.textContent = 'CE';
            clear.classList.add('CE');
        } else if (
            action === 'addition' ||
            action === 'subtraction' ||
            action === 'multiplication' ||
            action === 'division' ||
            action === 'modulo'
          ) {
            if (previousKeyType === 'operator'){  //this is the next step, to get this section to work
                display.textContent = operate(firstNum, operator, secondNum);
                firstNum = display.textContent;
            } else {
            firstNum = parseFloat(displayedNumber);
            operator = action;
            }
            calculator.dataset.previousKey = 'operator';
            key.classList.add("pressed");
            
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
          } else if (action === 'equals'){
              if(previousKeyType === 'equals'){
                  display.textContent = operate(firstNum,operator, secondNum);
                  firstNum = display.textContent;
              } else {
                secondNum = parseFloat(display.textContent);
                display.textContent = operate(firstNum, operator, secondNum);
                firstNum= display.textContent;
              }
                calculator.dataset.previousKey = 'equals';
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
          }

    }
})
})