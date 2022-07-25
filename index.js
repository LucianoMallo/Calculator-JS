let firstNumber = '';
let secondNumber = '';
let sign = '';
const MAX_DIGITS_IN_THE_DISPLAY = 10;

function addNumber(number) {
     if (getDisplay() != 'ERROR' && digitNumberCount(secondNumber) < MAX_DIGITS_IN_THE_DISPLAY){

    if (secondNumber == '' || secondNumber == '0'){
      secondNumber = number;
      setDisplay(secondNumber);
    }
  
    else {
      secondNumber += number;
      setDisplay(secondNumber);
    }
  }
  disableButtons();
}

function addComma() {
  switch (true) {
    case secondNumber == 'ERROR':
    case secondNumber.includes('.'):
    case digitNumberCount(secondNumber) >= MAX_DIGITS_IN_THE_DISPLAY:
      break;

    case secondNumber == '':
      secondNumber = '0';

    default:
      secondNumber += '.';
      break;
  }
  disableButtons();

  if (getDisplay() != 'ERROR') {
    setDisplay(secondNumber);
  }
}

function removeZerosFromRight(number) {
  return +number;
}

function addNegate() {
  switch (true) {
    case getDisplay() == 'ERROR':
    case removeZerosFromRight(secondNumber) == 0 && firstNumber != 0:
      break;

    case firstNumber == '' && secondNumber == '' && getDisplay() != 'ERROR': //If that permits to negate the result of a operation to continue calculating
      if (getDisplay() != '') {
        secondNumber = getDisplay().replace(',', '.');
        addNegate();
      }
      break;

    case ['0', '0.', '', ','].includes(secondNumber) && firstNumber != '':
      firstNumber = String(firstNumber * -1);
      break;

    case secondNumber.charAt(secondNumber.length - 1) == '.':
      secondNumber = String(secondNumber * -1);
      secondNumber += '.';
      break;

    default:
      secondNumber = String(secondNumber * -1);
      break;
  }
  disableButtons();

  if (getDisplay() != 'ERROR') {
    setDisplay(secondNumber);
  }
}

function setHighlight(x) {
  removeHighlight();
  x.classList.add('operatorHighlighted');
}

function removeHighlight() {
  let changeClass = document.getElementsByClassName('operationButton');
  for (let i = 0; i < changeClass.length; i++) {
    changeClass[i].classList.remove('operatorHighlighted');
  }
}

function eraseValue() {
  removeHighlight();
  firstNumber = '';
  secondNumber = '';
  sign = '';
  setDisplay(firstNumber);
  disableButtons();
}

function setDisplay(x) {
  document.getElementById('Result_Screen').value = x.replace('.', ',');
}

function setSign(x) {
  switch (true) {
    case firstNumber == 'ERROR':
      break;

    case firstNumber == '' && secondNumber == '':
      sign = x;
      firstNumber = String(getDisplay().replace(',', '.'));
      if (firstNumber == '') {
        firstNumber = '0';
      }
      break;

    case firstNumber != '' && secondNumber == '':
      sign = x;
      secondNumber = '';
      break;

    case firstNumber != '' && secondNumber != '':
      makeAnOperation(sign);
      setDisplay(firstNumber);
      sign = x;
      secondNumber = '';
      break;

    case firstNumber == '' && secondNumber != '':
      makeAnOperation(sign);
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
    case firstNumber != 'ERROR' && sign == '':
      break;

    case firstNumber != 'ERROR' && sign != '':
      makeAnOperation(sign);
      setDisplay(firstNumber);
      firstNumber = '';
      secondNumber = '';
      sign = '';
      break;
  }
  disableButtons();
}

function makeAnOperation(sign) {
  switch (sign) {
    case '+':
      firstNumber = removeZerosFromRight(
        (parseFloat(firstNumber) + parseFloat(secondNumber)).toFixed(10)
      );
      firstNumber = String(firstNumber);

      break;

    case '-':
      firstNumber = removeZerosFromRight(
        (parseFloat(firstNumber) - parseFloat(secondNumber)).toFixed(10)
      );
      firstNumber = String(firstNumber);

      break;

    case '*':
      firstNumber = removeZerosFromRight(
        (parseFloat(firstNumber) * parseFloat(secondNumber)).toFixed(9)
      );
      firstNumber = String(firstNumber);

      break;

    case '/':
      firstNumber = removeZerosFromRight(
        (parseFloat(firstNumber) / parseFloat(secondNumber)).toFixed(9)
      );
      firstNumber = String(firstNumber);

      break;

    default:
      break;
  }

  firstNumber = exponentialToDecimal(firstNumber);
  checkResult(firstNumber);
  disableButtons();
}

function checkResult(number) {
  switch (true) {
    case number == 'Infinity' ||
      number == '-Infinity' ||
      number == 'NaN' ||
      number == 'undefined':
      firstNumber = 'ERROR';
      secondNumber = '';
      disableButtons();
      break;

    case digitNumberCount(number) > MAX_DIGITS_IN_THE_DISPLAY:
      if (number.includes('.')) {
        do {
          number = number.slice(0, -1);
        } while (digitNumberCount(number) > MAX_DIGITS_IN_THE_DISPLAY && number.includes('.'));
        firstNumber = number;
      }

      if (digitNumberCount(number) > MAX_DIGITS_IN_THE_DISPLAY) {
        firstNumber = 'ERROR';
        secondNumber = '';
        disableButtons();
        break;
      }
      break;

    default:
      break;
  }
}

function digitNumberCount(numbers) {
  return numbers.replace(/[^0-9]/g, '').length;
}

window.addEventListener(
  'keydown',
  function (event) {
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
        addNegate();
        break;
        123;

      default:
        return;
    }
  },
  true
);

function unableButtons(buttons) {
  buttons.forEach((element) => {
    element.classList.remove('disable');
  });
}

function disableButtons() {
  const allButtons = document.querySelectorAll('button');
  unableButtons(allButtons);

  if (digitNumberCount(secondNumber) >= MAX_DIGITS_IN_THE_DISPLAY) {
    allButtons.forEach((element) => {
      if (element.classList.contains('numButton')) {
        element.classList.add('disable');
      }
    });
  }

  if (getDisplay() == 'ERROR' || firstNumber == 'ERROR') {
    allButtons.forEach((element) => {
      element.classList.add('disable');
    });
    document.getElementById('C').classList.remove('disable');
  }

  if (['0', '0.', ''].includes(secondNumber)) {
    if (firstNumber != '') {
      document.getElementById('negPos').classList.add('disable');
    }
    if (!secondNumber.includes('.')) {
      document.getElementById('b0').classList.add('disable');
    }
  }

  if (secondNumber.includes('.')) {
    document.getElementById('bComma').classList.add('disable');
  }
}

function exponentialToDecimal(x) {
  if (Math.abs(x) < 1.0) {
    var e = parseInt(x.toString().split('e-')[1]);
    if (e) {
      x *= Math.pow(10, e - 1);
      x = '0.' + new Array(e).join('0') + x.toString().substring(2);
    }
  } else {
    var e = parseInt(x.toString().split('+')[1]);
    if (e > 20) {
      e -= 20;
      x /= Math.pow(10, e);
      x += new Array(e + 1).join('0');
    }
  }
  return x;
}

function getDisplay() {
  return document.getElementById('Result_Screen').value;
}

window.onload = function () {
  disableButtons();
};
