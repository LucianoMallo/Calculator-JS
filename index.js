const MAX_DIGITS_IN_THE_DISPLAY = 10;
let previousOperandTextElement = "";
let currentOperandTextElement = "";
let operator = "";

window.onload = function () {
  setButtonsStatus();
};

function getDisplay() {
  return document.getElementById("Result_Screen").value.replace(",", ".");
}

function setDisplay(number) {
  document.getElementById("Result_Screen").value = number.replace(".", ",");
}

function stringToNumber(str) {
  return +str;
}

function digitNumberCount(numbers) {
  return numbers.replace(/[^0-9]/g, "").length;
}

function addNumber(number) {
  if (
    getDisplay() != "ERROR" &&
    digitNumberCount(currentOperandTextElement) < MAX_DIGITS_IN_THE_DISPLAY
  ) {
    if (currentOperandTextElement == "" || currentOperandTextElement == "0") {
      currentOperandTextElement = number;
      setDisplay(currentOperandTextElement);
    } else {
      currentOperandTextElement += number;
      setDisplay(currentOperandTextElement);
    }
  }
  setButtonsStatus();
}

function addComma() {
  if (
    getDisplay() != "ERROR" &&
    !currentOperandTextElement.includes(".") &&
    digitNumberCount(currentOperandTextElement) < MAX_DIGITS_IN_THE_DISPLAY
  ) {
    if (currentOperandTextElement == "") {
      currentOperandTextElement = "0";
      addComma();
      setDisplay(currentOperandTextElement);
    } else {
      currentOperandTextElement += ".";
      setDisplay(currentOperandTextElement);
    }
  }

  setButtonsStatus();
}

function addNegate() {
  if (getDisplay() != "ERROR" && stringToNumber(getDisplay()) != 0) {
    if (previousOperandTextElement == "" && currentOperandTextElement == "") {
      if (getDisplay() != "") {
        currentOperandTextElement = getDisplay();
      }
    }

    if (
      stringToNumber(currentOperandTextElement) == 0 &&
      previousOperandTextElement != "" && operator==''
    ) {
      previousOperandTextElement = String(previousOperandTextElement * -1);
      setDisplay(previousOperandTextElement);
    }

    if (
      currentOperandTextElement.charAt(currentOperandTextElement.length - 1) ==
      "."
    ) {
      currentOperandTextElement = String(currentOperandTextElement * -1);
      currentOperandTextElement += ".";
      setDisplay(currentOperandTextElement);
    } else if (currentOperandTextElement != "" && getDisplay() != "") {
      currentOperandTextElement = String(currentOperandTextElement * -1);
      setDisplay(currentOperandTextElement);
    }
  }

  setButtonsStatus();
}

function setButtonEnabled(x) {}

function setButtonHighlight(button) {
  console.log(button);
  removeButtonHighlight();
  button.classList.add("operatorHighlighted");
}

function removeButtonHighlight() {
  let changeClass = document.querySelectorAll(
    "Calculator_Body,.operationButton"
  );
  for (let i = 0; i < changeClass.length; i++) {
    changeClass[i].classList.remove("operatorHighlighted");
  }
}

function eraseValue() {
  removeButtonHighlight();
  previousOperandTextElement = "";
  currentOperandTextElement = "";
  operator = "";
  setDisplay(previousOperandTextElement);
  setButtonsStatus();
}

function setOperator(OperatorStrg) {
  if (previousOperandTextElement == "" && currentOperandTextElement == "") {
    operator = OperatorStrg;
    previousOperandTextElement = String(getDisplay());
    if (previousOperandTextElement == "") {
      previousOperandTextElement = "0";
    }
  }

  if (previousOperandTextElement != "" && currentOperandTextElement == "") {
    operator = OperatorStrg;
    currentOperandTextElement = "";
  }

  if (previousOperandTextElement != "" && currentOperandTextElement != "") {
    makeAnOperation(operator);
    setDisplay(previousOperandTextElement);
    operator = OperatorStrg;
    currentOperandTextElement = "";
  }

  if (previousOperandTextElement == "" && currentOperandTextElement != "") {
    operator = OperatorStrg;
    previousOperandTextElement = currentOperandTextElement;
    currentOperandTextElement = "";
  }

  setButtonsStatus();
}

function equal() {
  removeButtonHighlight();

  if (getDisplay != "ERROR" && operator != "") {
    makeAnOperation(operator);
    setDisplay(previousOperandTextElement);
    //previousOperandTextElement = "";
    currentOperandTextElement = "";
    operator = "";
  }
  setButtonsStatus();
}

function makeAnOperation(operator) {
  switch (operator) {
    case "+":
      previousOperandTextElement = stringToNumber(
        (
          parseFloat(previousOperandTextElement) +
          parseFloat(currentOperandTextElement)
        ).toFixed(10)
      );
      previousOperandTextElement = String(previousOperandTextElement);

      break;

    case "-":
      previousOperandTextElement = stringToNumber(
        (
          parseFloat(previousOperandTextElement) -
          parseFloat(currentOperandTextElement)
        ).toFixed(10)
      );
      previousOperandTextElement = String(previousOperandTextElement);

      break;

    case "*":
      previousOperandTextElement = stringToNumber(
        (
          parseFloat(previousOperandTextElement) *
          parseFloat(currentOperandTextElement)
        ).toFixed(9)
      );
      previousOperandTextElement = String(previousOperandTextElement);

      break;

    case "/":
      previousOperandTextElement = stringToNumber(
        (
          parseFloat(previousOperandTextElement) /
          parseFloat(currentOperandTextElement)
        ).toFixed(9)
      );
      previousOperandTextElement = String(previousOperandTextElement);

      break;

    default:
      break;
  }

  previousOperandTextElement = exponentialToDecimal(previousOperandTextElement);
  checkResult(previousOperandTextElement);
  setButtonsStatus();
}

function checkResult(number) {
  if (
    number == "Infinity" ||
    number == "-Infinity" ||
    number == "NaN" ||
    number == "undefined"
  ) {
    previousOperandTextElement = "ERROR";
    currentOperandTextElement = "";
    setButtonsStatus();
  }

  if (digitNumberCount(number) > MAX_DIGITS_IN_THE_DISPLAY) {
    if (number.includes(".")) {
      do {
        number = number.slice(0, -1);
      } while (
        digitNumberCount(number) > MAX_DIGITS_IN_THE_DISPLAY &&
        number.includes(".")
      );
      previousOperandTextElement = number;
    }
  }

  if (digitNumberCount(number) > MAX_DIGITS_IN_THE_DISPLAY) {
    previousOperandTextElement = "ERROR";
    currentOperandTextElement = "";
    setButtonsStatus();
  }
}

window.addEventListener(
  "keydown",
  function (event) {
    const name = event.key;

    event.preventDefault();

    switch (name) {
      case "+":
      case "-":
      case "/":
      case "*":
        //This must to be done because the keyboard it's not related with the buttons
        document.querySelectorAll("button,.operationButton").forEach((i) => {
          if (i.value == name) {
            setButtonHighlight(i);
          }
        });
        setOperator(name);
        break;

      case "1":
      case "2":
      case "3":
      case "4":
      case "5":
      case "6":
      case "7":
      case "8":
      case "9":
      case "0":
        addNumber(name);
        break;

      case "Enter":
        equal();
        break;

      case "Escape":
        eraseValue();
        break;

      case ",":
      case ".":
        addComma();
        break;

      case "Control":
        addNegate();
        break;
        123;

      default:
        return;
    }
  },
  true
);

function enableButtons() {
  const allButtons = document.querySelectorAll("Calculator_Body,button");
  allButtons.forEach((button) => {
    button.classList.remove("disable");
  });
}

function setButtonsStatus() {
  enableButtons();

  if (getDisplay() == "ERROR") {
    document.querySelectorAll("button").forEach((button) => {
      button.classList.add("disable");
    });
    document.getElementById("C").classList.remove("disable");
  } else {
    if (
      digitNumberCount(currentOperandTextElement) >= MAX_DIGITS_IN_THE_DISPLAY
    ) {
      document.querySelectorAll(".numButton").forEach((button) => {
        button.classList.add("disable");
      });
    } else {
      if (disableNegPosButton()) {
        {
          document.getElementById("negPos").classList.add("disable");
        }
        if (
          !currentOperandTextElement.includes(".") &&
          previousOperandTextElement == ""
        ) {
          document.getElementById("b0").classList.add("disable");
        }
      }

      if (currentOperandTextElement.includes(".")) {
        document.getElementById("bComma").classList.add("disable");
      }
    }
  }
}

function exponentialToDecimal(x) {
  if (Math.abs(x) < 1.0) {
    var e = parseInt(x.toString().split("e-")[1]);
    if (e) {
      x *= Math.pow(10, e - 1);
      x = "0." + new Array(e).join("0") + x.toString().substring(2);
    }
  } else {
    var e = parseInt(x.toString().split("+")[1]);
    if (e > 20) {
      e -= 20;
      x /= Math.pow(10, e);
      x += new Array(e + 1).join("0");
    }
  }
  return x;
}

function disableNegPosButton() {
  return (
    (stringToNumber(currentOperandTextElement) == 0 &&operator == "" && stringToNumber(previousOperandTextElement) == 0) 
    ||
    (operator != "" &&stringToNumber(previousOperandTextElement) != 0 &&stringToNumber(currentOperandTextElement) == 0)
  );
}
