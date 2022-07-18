let firstNumber = '0';
let secondNumber = '0';
let sign = '';





function addNumber(number) {

  switch (true) {

    case (numberCount(secondNumber) >= 10):
      break;

    case (secondNumber == '0'):
      secondNumber = number;
      break;

    default:
      secondNumber += number;
      break;

  }

  displayCounter(secondNumber);

}


function addComma() {

  switch (true) {

    case (secondNumber.includes('.')):
    case (numberCount(secondNumber) >= 10):
      break;

    case (secondNumber == '0'):
      secondNumber = '0.';
      break;

    default:
      secondNumber += '.';
      break;
  }

  displayCounter(secondNumber);
}



function negate() {
  switch (true) {

    case (secondNumber == '0'):
    case (secondNumber == '0.'):
      break;

    default:

      secondNumber = String(secondNumber * (-1));
      break;

  }
  displayCounter(secondNumber);

}




function setHighlight(x) {

  removeHighlight(); 

      let changeClass = x.currentTarget.classList
      changeClass.add("operatorHighlighted");

}

function removeHighlight() {
  let changeClass = document.getElementsByClassName('operationButton');
  for (let i = 0; i < changeClass.length; i++) {
    changeClass[i].classList.remove('operatorHighlighted')
  }
  
}

function eraseValue() {

  document.getElementById('Result_Screen').value = "";
  removeHighlight();
  firstNumber = "0";
  secondNumber = "0";
  sign = "";

}

function displayCounter(x) {

  document.getElementById('Result_Screen').value = x.replace(".", ",");

}

function setSign(x) {

  sign = x;
  if(firstNumber=='0')
  {firstNumber=secondNumber;
  secondNumber='0';}

}


function equal() {
  removeHighlight();
  operation(sign);
  sign='';
  secondNumber='0'

}

function operation(sign) {

  switch (sign) {
    case '+':
      
    firstNumber = +(parseFloat(firstNumber) + parseFloat(secondNumber)).toFixed(10);
    firstNumber=String(firstNumber);
    console.log(firstNumber);
      break;
    
    case '-':
      firstNumber = +(parseFloat(firstNumber) - parseFloat(secondNumber)).toFixed(10);
    firstNumber=String(firstNumber);
    console.log(firstNumber);
      break;
      
    case '*':
      firstNumber = +(parseFloat(firstNumber) * parseFloat(secondNumber)).toFixed(10);
    firstNumber=String(firstNumber);
    console.log(firstNumber);
      break;

    case '/':
      firstNumber = +(parseFloat(firstNumber) / parseFloat(secondNumber)).toFixed(10);
    firstNumber=String(firstNumber);
    console.log(firstNumber);
      break;


  }

  check(firstNumber)
    
    
}


function check(number){

  switch(true){
    case (numberCount(number) >= 10):
      firstNumber='ERROR'
      break;


  }


  displayCounter(firstNumber);
}




function numberCount(numbers) {
  return numbers.replace(/[^0-9]/g, '').length;
}

window.addEventListener("keydown", function (event) {

  //console.log(event.key);
  switch (event.key) {


    case ",":
      console.log(50);
      setHighlight(",");

      break;

    case "+":
      console.log(10);
      // code for "add" key press.
      break;

    case "-":
      console.log(20);
      // code for "subtract" key press.
      break;

    case "*":
      console.log(30);
      // code for "multiply" key press.
      break;

    case "/":
      console.log(40);
      // code for "divide" key press.
      break;

    case (parseInt(event.key) >= 0 && parseInt(event.key) <= 10):
      console.log(60);

      break;


    default:
      return; // Quit when this doesn't handle the key event.
  }

  // Cancel the default action to avoid it being handled twice
  event.preventDefault();
}, true);
  // the last option dispatches the event to the listener first,
  // then dispatches event to window