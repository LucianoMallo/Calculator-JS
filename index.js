let firstNumber = '';
let secondNumber = '';
let sign = '';




function addNumber(number) {

  switch (true) {

    case (firstNumber == 'ERROR'):
    case (document.getElementById('Result_Screen').value == 'ERROR'):
    case (numberCount(secondNumber) >= 10):
      break;

    case (secondNumber == ''):
    case (secondNumber == '0'):
      secondNumber = number;
      break;

    default:
      secondNumber += number;
      break;

  }
  if (document.getElementById('Result_Screen').value != 'ERROR') {

    displayCounter(secondNumber);
  }
  disableButtons();
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

  if (document.getElementById('Result_Screen').value != 'ERROR') {

    displayCounter(secondNumber);
  }
}

function negate() {
    switch (true) {

    case (document.getElementById('Result_Screen').value == 'ERROR'):
      
      break;

    case (firstNumber == '' && secondNumber == '' && document.getElementById('Result_Screen').value != 'ERROR'): //If that permits to negate the result of a operation to continue calculating
      
      if (document.getElementById('Result_Screen').value != '') {
        secondNumber = document.getElementById('Result_Screen').value.replace(",", ".");
        negate();
      }
      else { blockCeroAndNegButton(); }
      break;

    case (['0', '0.', '', ','].includes(secondNumber)):
      
      blockCeroAndNegButton();
      break;

    case (secondNumber.charAt(secondNumber.length - 1) == '.'):
    
      unlockButtons();
      secondNumber = String(secondNumber * (-1));
      secondNumber += '.'
      break;

    default:
      unlockButtons();
      secondNumber = String(secondNumber * (-1));
      break;

  }

  if (document.getElementById('Result_Screen').value != 'ERROR') {

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


  removeHighlight();
  unlockButtons();
  firstNumber = '';
  secondNumber = '';
  sign = '';
  displayCounter(firstNumber);
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

  disableButtons();
}

function equal() {

  removeHighlight();

  switch (true) {

    case (firstNumber != 'ERROR' && sign == ''):
      break;

    case (firstNumber != 'ERROR' && sign != ''):
      operation(sign);
      displayCounter(firstNumber);
      firstNumber = '';
      secondNumber = '';
      sign = '';
      break;

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
      firstNumber = +(parseFloat(firstNumber) * parseFloat(secondNumber)).toFixed(9);
      firstNumber = String(firstNumber);

      break;

    case '/':
      firstNumber = +(parseFloat(firstNumber) / parseFloat(secondNumber)).toFixed(9);
      firstNumber = String(firstNumber);

      break;

    default:
      break;

  }

  firstNumber = RevealDecimals(firstNumber);
  check(firstNumber);
  console.log(firstNumber);
}

function check(number) {


  switch (true) {

    case (number == 'Infinity' || number == '-Infinity' || number == 'NaN' || number == 'undefined'):
      firstNumber = 'ERROR'
      secondNumber = '';
      disableButtons();
      break;


    case (numberCount(number) > 10):
      if (number.includes('.')) {
         do {

          number = number.slice(0, -1);

        }while (numberCount(number) > 10 && number.includes('.'))
        firstNumber = number;
      }

      if (numberCount(number) > 10) {
        firstNumber = 'ERROR'
        secondNumber = '';
        disableButtons();
        break;
      }
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

    case [',', '.'].includes(name):
      addComma();
      break;

    case ['Control'].includes(name):
      negate();
      break;
      123

    default:
      return;
  }

}, true);


/*function blockAllButtonsExceptC() {
  unlockButtons();
  const buttons = document.querySelectorAll('button');
  buttons.forEach(element => {

    if (!element.classList.contains("cButton")) {
      element.classList.add("blockButtons");
    }

  });

}

function blockCeroAndNegButton() {
  if (document.getElementById("Result_Screen").value != 'ERROR' && document.getElementById("Result_Screen").value != '') {
    unlockButtons();
  }

  let negPosbutton = document.getElementById('negPos');
  if (!negPosbutton.classList.contains("cButton")) {
    negPosbutton.classList.add("blockButtons");
  }
  let CeroButton = document.getElementById('b0');
  if (!CeroButton.classList.contains("cButton")) {
    CeroButton.classList.add("blockButtons");
  }
}

function blockAllNumbersButtons() {

  unlockButtons();
  const buttons = document.getElementsByClassName('numButton');
  Array.from(buttons).forEach(element => {
    element.classList.add("blockButtons");
  });
}*/


function unableButtons(buttons) {
  buttons.forEach(element => {element.classList.remove("disable");
  });
}


function disableButtons() {
  const allButtons = document.querySelectorAll('button');

    unableButtons(allButtons);

  switch (true) {
    case ((numberCount(secondNumber)) >= 10):
      allButtons.forEach(element => {
        if (element.classList.contains('numButton')) {
          element.classList.add("disable");
        }
      });
      break;

    case (document.getElementById('Result_Screen').value == 'ERROR'||firstNumber=='ERROR'):
      allButtons.forEach(element => {
        element.classList.add("disable");
      });
      document.getElementById('C').classList.remove("disable");
      break;

    case ['0', '0.', '', ','].includes(secondNumber):
      (document.getElementById('negPos')).classList.add("disable");
      if (secondNumber != '0.') { (document.getElementById('b0')).classList.add("disable"); }
      break;

  }


}


function unlockButtons() {

  let changeClass = document.querySelectorAll('button');
  for (let i = 0; i < changeClass.length; i++) {
    changeClass[i].classList.remove('blockButtons')
  }

}

function RevealDecimals(x) {
  if (Math.abs(x) < 1.0) {
    var e = parseInt(x.toString().split('e-')[1]);
    if (e) {
      x *= Math.pow(10, e - 1);
      x = '0.' + (new Array(e)).join('0') + x.toString().substring(2);
    }
  } else {
    var e = parseInt(x.toString().split('+')[1]);
    if (e > 20) {
      e -= 20;
      x /= Math.pow(10, e);
      x += (new Array(e + 1)).join('0');
    }
  }
  return x;
}


window.onload = function(){disableButtons();};