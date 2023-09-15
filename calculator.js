let header = document.querySelector('#header')
let h3 = document.createElement('h3');
h3.textContent = 'Calculator'
header.append(h3);


//Variables


let displayValue = 0;
let operandOne="";
let operandTwo="";
let result=false;
let operation="";
let operationCheck=false;
let newValue;


function resetValues(){

displayValue = 0;
operandOne="";
operandTwo="";
result="";
operation="";
operationCheck=false;

}
// let buttonClicked="";

//Functions

setCalculator();

function setDisplay(){
    const display = document.getElementById('display');
    display.innerText = displayValue;
    
}
//Functions for the calculator's operations

//Addition

function add(a, b) {

    let result = a + b;

    return result;

}

//Subtraction

function subtract(a, b) {

    let result = a - b;

    return result;

}

//Multiplication

function multiply(a, b) {

    let result = a * b;
    if (result.toString().length > 5){
        result = result.toExponential(4);
    }
    return result;

}

//Division

function divide(a, b) {

    let result = 0.0;

    if (b == 0) {
        alert('Error - cannot divide by zero'); //cannot divide by zero!!
    }
    else {
        result = Math.round(a / b * 100000000) / 100000000; 
        //round this!! https://stackoverflow.com/questions/11832914/how-to-round-to-at-most-2-decimal-places-if-necessary
    }
    return result;
}

//Function to make the calculations

function operate(operation, number1, number2) {

    if (operation == '+') {

        return add(number1, number2)
    }


    if (operation == '-') {

        return subtract(number1, number2)
    }

    if (operation == '*') {

        return multiply(number1, number2)
    }

    if (operation == '/') {

        return divide(number1, number2)
    }

}

//Can I handle negative numbers?
//Decimal - max one.


//Calculator display and bottons - located in div id main.

function setCalculator() {

    //display on top

    let main = document.getElementById('main')
    let calculator = document.createElement('div');
    calculator.className = 'calculator';
    // display.textContent = 'TEST';
    main.append(calculator);


    // 5 rows of equally size buttons - of 5 = 25 in total

    let DivRow = document.createElement('div');
    DivRow.id = 'r';
    DivRow.className = 'divRow';
    calculator.append(DivRow);


    let display = document.createElement('div');
    display.id = 'display';
    display.className = 'display';
    // DivCol.textContent = 'Col'
    DivRow.append(display);


    for (let i = 0; i < 5; i++) {


        let DivRow = document.createElement('div');
        DivRow.id = 'r'+i;
        DivRow.className = 'divRow';
        // DivRow.textContent = 'Row'
        calculator.append(DivRow);


        for (let j = 0; j < 4; j++) {

            let button = document.createElement('div');
            button.id = 'c'+i+j;
            button.className = 'button';
            
            DivRow.append(button);
        }
    }
    
    function updateDisplay(newValue, buttonClicked){

        if (buttonClicked == 'number'){

            if (operationCheck==false && operandTwo ==""){

                //checking length.
                let lengthCheck = `${displayValue}${newValue}`;

                if (lengthCheck.length == 10){
                    // alert('reach max number length ')
                }
                else{
                    if (displayValue == 0){
                        displayValue = newValue
                    }
                    else{
                    operandOne = `${displayValue}${newValue}`;
                    displayValue = operandOne;
                    console.log(displayValue);
                    }
                }

            }

            else if (operationCheck==false && operandTwo !=""){

                let lengthCheck = `${operandTwo}${newValue}`;

                if (lengthCheck.length == 10){
                    // alert('reach max number length ')
                }
                else{

                operandTwo = `${operandTwo}${newValue}`;
                displayValue = operandTwo;
                console.log(displayValue);
                }
            }

            else if (operationCheck==true && operandTwo ==""){

                operandOne = operandOne;
                operandTwo = newValue;
                displayValue = operandTwo;                
                operationCheck=false;
                console.log(displayValue);

            }
            else if (operationCheck==true && operandTwo !=""){

                displayValue = `${operandOne}+${operandTwo}`;
                operationCheck=false;
            }
            else{displayValue = 'something went wrong'};
        }
        else if (buttonClicked == 'operation'){
            //did not add operand one as it will always have a value (zero or other), but if operation is clicked, this value will be used in calculation.
            
            if (operandTwo == ""){
                operation = newValue;
                console.log(operation);
                operationCheck = true;
                operandOne=displayValue;                
            }
            else//independent of operation given we are going to make the calculation.
            {                
                displayValue = operate(operation, Number(operandOne), Number(operandTwo));
                operation=newValue;
                operandOne=displayValue;
                operationCheck = true;
                operandTwo="";           
            }
        }
        else if (buttonClicked == 'result'){

            if (operandTwo == ""){

            }
            else{
            console.log(operation);
            displayValue = operate(operation, Number(operandOne), Number(operandTwo));
            operandOne=displayValue;
            operandTwo="";
            }

        }

    }

    setDisplay();

    let buttons = document.querySelectorAll('div.button');
    let btns = [];
    btns = Array.from(buttons);
    // button.map((b)=>console.log(b));

    let buttonText = ['A/C','+/-','%','/','7','8','9','*','4','5','6','-','1','2','3','+','0','<--','.','='];
    let keyCode = ['A/C','+/-','%','/','7','8','9','*','4','5','6','-','1','2','3','+','0','<--','.','='];
        
    for (let i=0;i<buttonText.length;i++)
    {
        btns[i].textContent = buttonText[i];
    }

    
    btns[0].addEventListener('click', ()=>{displayValue = "0"; resetValues(); setDisplay();});
    btns[1].addEventListener('click', ()=>{displayValue = -displayValue; setDisplay();})        
    btns[2].addEventListener('click', ()=>{displayValue = displayValue/100; setDisplay();})     
    btns[3].addEventListener('click', ()=>{updateDisplay('/','operation'); setDisplay();})                                                   
    btns[4].addEventListener('click', ()=>{updateDisplay('7','number'); setDisplay();})
    btns[5].addEventListener('click', ()=>{updateDisplay('8','number'); setDisplay();})
    btns[6].addEventListener('click', ()=>{updateDisplay('9','number'); setDisplay();})
    btns[7].addEventListener('click', ()=>{updateDisplay('*','operation'); setDisplay();})
    btns[8].addEventListener('click', ()=>{updateDisplay('4','number'); setDisplay();})
    btns[9].addEventListener('click', ()=>{updateDisplay('5','number'); setDisplay();})
    btns[10].addEventListener('click', ()=>{updateDisplay('6','number'); setDisplay();})
    btns[11].addEventListener('click', ()=>{updateDisplay('-','operation'); setDisplay();})
    btns[12].addEventListener('click', ()=>{updateDisplay('1','number'); setDisplay();})
    btns[13].addEventListener('click', ()=>{updateDisplay('2','number'); setDisplay();})
    btns[14].addEventListener('click', ()=>{updateDisplay('3','number'); setDisplay();})
    btns[15].addEventListener('click', ()=>{updateDisplay('+','operation'); setDisplay();})
    btns[16].addEventListener('click', ()=>{updateDisplay('0','number'); setDisplay();})
    btns[17].addEventListener('click', ()=>{if (displayValue.length>1){displayValue = displayValue.slice(0,-1)}else{displayValue=0}; setDisplay();})
    btns[18].addEventListener('click', ()=>{displayValue = displayValue + '.'; setDisplay();})
    btns[19].addEventListener('click', ()=>{updateDisplay('=','result'); setDisplay();})
    
    
    


}









