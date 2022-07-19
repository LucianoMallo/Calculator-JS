let firstNumber = '';
let secondNumber = '';
let sign = '';





function addNumber(number) {

  switch (true) {



    case (firstNumber == 'ERROR'):
    case (numberCount(secondNumber) >= 10):
      break;

    case (secondNumber == '' && firstNumber != 'ERROR'):
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

    case secondNumber == 'ERROR':
    case (secondNumber.includes('.')):
    case (numberCount(secondNumber) >= 10):
      break;

    case (secondNumber == ''):
      secondNumber = '0';

    default:
      secondNumber += '.';
      break;
  }

  displayCounter(secondNumber);
}



function negate() {


  switch (true) {

    case secondNumber == 'ERROR':
    case (secondNumber == '0'):
    case (secondNumber == '0.'):
      break;

    case (secondNumber == ''): //If that permits to negate the result of a operation to continue calculating
      /*if (document.getElementById('Result_Screen').value != '') {
      secondNumber =document.getElementById('Result_Screen').value.replace("," , ".");
      console.log(secondNumber);
      negate();
    }*/
      break;

    case (secondNumber.charAt(secondNumber.length - 1) == '.'):
      secondNumber = String(secondNumber * (-1));
      secondNumber += '.'
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

  document.getElementById('Result_Screen').value = '';
  removeHighlight();
  unlockButtons();
  firstNumber = '';
  secondNumber = '';
  sign = '';

}

function displayCounter(x) {

  document.getElementById('Result_Screen').value = x.replace(".", ",");

}

function setSign(x) {

  switch (true) {


    case (firstNumber == 'ERROR'):
      break;

    case (firstNumber == '' && secondNumber == ''):
      sign = x;

      firstNumber = String(document.getElementById('Result_Screen').value); //Cambiar en el futuro jaja, si veo el futuro...
      secondNumber = '';
      break;

    case (firstNumber != '' && secondNumber == ''):
      sign = x;
      secondNumber = '';
      break;

    case (firstNumber != '' && secondNumber != ''):
      operation(sign);
      displayCounter(firstNumber);
      sign = x;
      secondNumber = '';
      break;

    case (firstNumber == '' && secondNumber != ''):
      firstNumber = secondNumber;
      secondNumber = '';
      sign = x;
      break;

  }


}


function equal() {
  removeHighlight();
  operation(sign);
  displayCounter(firstNumber);

  if (firstNumber != 'ERROR') {
    sign = '';
    secondNumber = '';
    firstNumber = '';
  }

console.log(firstNumber);
console.log(secondNumber);
console.log(si);

}

function operation(sign) {

  switch (sign) {

    case '+':
      firstNumber = +(parseFloat(firstNumber) + parseFloat(secondNumber)).toFixed(10);
      firstNumber = String(firstNumber);

      break;

    case '-':
      firstNumber = +(parseFloat(firstNumber) - parseFloat(secondNumber)).toFixed(10);
      firstNumber = String(firstNumber);

      break;

    case '*':
      firstNumber = +(parseFloat(firstNumber) * parseFloat(secondNumber)).toFixed(10);
      firstNumber = String(firstNumber);

      break;

    case '/':
      firstNumber = +(parseFloat(firstNumber) / parseFloat(secondNumber)).toFixed(10);
      firstNumber = String(firstNumber);

      break;

    default:
      break;

  }

  check(firstNumber)


}


function check(number) {

  switch (true) {
    case (numberCount(number) >= 10):
      firstNumber = 'ERROR'
      blockButtons();
      break;

    default:
      break;
  }



}




function numberCount(numbers) {
  return numbers.replace(/[^0-9]/g, '').length;
}

window.addEventListener("keydown", function (event) {

  //console.log(event.key);
  switch (event.key) {


    case ",":
      setHighlight(event);

      break;

    case "+":
      // code for "add" key press.
      setHighlight(event);
      break;

    case "-":
      setHighlight(event);
      // code for "subtract" key press.
      break;

    case "*":
      setHighlight(event);
      // code for "multiply" key press.
      break;

    case "/":
      setHighlight(event);
      // code for "divide" key press.
      break;

    case (parseInt(event.key) >= 0 && parseInt(event.key) <= 10):

      break;


    default:
      return; // Quit when this doesn't handle the key event.
  }

  // Cancel the default action to avoid it being handled twice
  event.preventDefault();
}, true);
// the last option dispatches the event to the listener first,
// then dispatches event to window


function blockButtons() {

  unlockButtons();

  console.log('Entra');

  const buttons = document.querySelectorAll('button');
  //const elements = document.getElementsByTagName("button");

  buttons.forEach(function (element) {


    if (!element.classList.contains("cButton")) {

      element.classList.add("blockButtons");

    }

  });

}


function unlockButtons() {

  let changeClass = document.querySelectorAll('button');
  for (let i = 0; i < changeClass.length; i++) {
    changeClass[i].classList.remove('blockButtons')
  }

}