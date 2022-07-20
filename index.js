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
  if (firstNumber != 'ERROR') {

    displayCounter(secondNumber);
  }

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

  if (firstNumber != 'ERROR') {

    displayCounter(secondNumber);
  }
}

function negate() {


  switch (true) {

    case firstNumber == 'ERROR':
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

  if (firstNumber != 'ERROR') {

    displayCounter(secondNumber);
  }

}

function setHighlight(x) {
  removeHighlight();
  x.classList.add("operatorHighlighted");

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
      firstNumber = String(document.getElementById('Result_Screen').value.replace(',', '.'));
      if (firstNumber == '') {
        firstNumber = '0';
      }
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
      operation(sign);
      firstNumber = secondNumber;
      secondNumber = '';
      sign = x;
      break;

  }


}

function equal() {


  removeHighlight();

  if (firstNumber != 'ERROR') {
    operation(sign);
  }

  displayCounter(firstNumber);

  if (firstNumber != 'ERROR') {
    sign = '';
    secondNumber = '';
    firstNumber = '';
  }

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
    case (numberCount(number) > 10):
    case(number=='Infinity'||number=='-Infinity'||number=='NaN'):
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

  const name = event.key;

  event.preventDefault();

  switch (true) {

    case ['+', '-', '/', '*'].includes(name):
      document.querySelectorAll('button').forEach((i) => {
        if (i.value == name) {
          setHighlight(i);
        }
      });
      setSign(name);
      break;

    case ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'].includes(name):
      addNumber(name);
      break;

    case ['Enter'].includes(name):
      equal();
      break;

    case ['Escape'].includes(name):
      eraseValue();
      break;
    
    case [',','.'].includes(name):
      addComma();
      break;

    case ['Control'].includes(name):
      negate();
      break;
123

    default:
      return; // Quit when this doesn't handle the key event.
  }

  // Cancel the default action to avoid it being handled twice

}, true);
// the last option dispatches the event to the listener first,
// then dispatches event to window


function blockButtons() {

  unlockButtons();
  const buttons = document.querySelectorAll('button');
  //const elements = document.getElementsByTagName("button");

  buttons.forEach(element => {


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