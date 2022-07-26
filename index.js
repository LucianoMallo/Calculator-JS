let previousOperandTextElement = "";
let currentOperandTextElement = "";
let sign = "";
const MAX_DIGITS_IN_THE_DISPLAY = 10;

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
  disableButtons();
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

  disableButtons();
}

function removeZerosFromRight(number) {
  return +number;
}

function addNegate() {
  if (
    getDisplay() != "ERROR" &&
    removeZerosFromRight(getDisplay().replace(",", ".")) != 0
  ) {
    if (previousOperandTextElement == "" && currentOperandTextElement == "") {
      if (getDisplay() != "") {
        currentOperandTextElement = getDisplay().replace(",", ".");
      }
    }

    if (
      ["0", "0.", "", ","].includes(currentOperandTextElement) &&
      previousOperandTextElement != ""
    ) {
      previousOperandTextElement = String(previousOperandTextElement * -1);
      setDisplay(currentOperandTextElement);
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

  disableButtons();
}

function setHighlight(x) {
  removeHighlight();
  x.classList.add("operatorHighlighted");
}

function removeHighlight() {
  let changeClass = document.getElementsByClassName("operationButton");
  for (let i = 0; i < changeClass.length; i++) {
    changeClass[i].classList.remove("operatorHighlighted");
  }
}

function eraseValue() {
  removeHighlight();
  previousOperandTextElement = "";
  currentOperandTextElement = "";
  sign = "";
  setDisplay(previousOperandTextElement);
  disableButtons();
}

function setDisplay(x) {
  document.getElementById("Result_Screen").value = x.replace(".", ",");
}

function setSign(x) {
  if (previousOperandTextElement == "" && currentOperandTextElement == "") {
    sign = x;
    previousOperandTextElement = String(getDisplay().replace(",", "."));
    if (previousOperandTextElement == "") {
      previousOperandTextElement = "0";
    }
  }

  if (previousOperandTextElement != "" && currentOperandTextElement == "") {
    sign = x;
    currentOperandTextElement = "";
  }

  if (previousOperandTextElement != "" && currentOperandTextElement != "") {
    makeAnOperation(sign);
    setDisplay(previousOperandTextElement);
    sign = x;
    currentOperandTextElement = "";
  }

  if (previousOperandTextElement == "" && currentOperandTextElement != "") {
    makeAnOperation(sign);
    previousOperandTextElement = currentOperandTextElement;
    currentOperandTextElement = "";
    sign = x;
  }

  disableButtons();
}

function equal() {
  removeHighlight();

  if (previousOperandTextElement != "ERROR" && sign != "") {
    makeAnOperation(sign);
    setDisplay(previousOperandTextElement);
    previousOperandTextElement = "";
    currentOperandTextElement = "";
    sign = "";
  }
  disableButtons();
}

function makeAnOperation(sign) {
  switch (sign) {
    case "+":
      previousOperandTextElement = removeZerosFromRight(
        (
          parseFloat(previousOperandTextElement) +
          parseFloat(currentOperandTextElement)
        ).toFixed(10)
      );
      previousOperandTextElement = String(previousOperandTextElement);

      break;

    case "-":
      previousOperandTextElement = removeZerosFromRight(
        (
          parseFloat(previousOperandTextElement) -
          parseFloat(currentOperandTextElement)
        ).toFixed(10)
      );
      previousOperandTextElement = String(previousOperandTextElement);

      break;

    case "*":
      previousOperandTextElement = removeZerosFromRight(
        (
          parseFloat(previousOperandTextElement) *
          parseFloat(currentOperandTextElement)
        ).toFixed(9)
      );
      previousOperandTextElement = String(previousOperandTextElement);

      break;

    case "/":
      previousOperandTextElement = removeZerosFromRight(
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
  disableButtons();
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
    disableButtons();
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
    disableButtons();
  }
}

function digitNumberCount(numbers) {
  return numbers.replace(/[^0-9]/g, "").length;
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
        document.querySelectorAll("button").forEach((i) => {
          if (i.value == name) {
            setHighlight(i);
          }
        });
        setSign(name);
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

function unableButtons(buttons) {
  buttons.forEach((element) => {
    element.classList.remove("disable");
  });
}

function disableButtons() {
  const allButtons = document.querySelectorAll("button");
  unableButtons(allButtons);

  if (
    digitNumberCount(currentOperandTextElement) >= MAX_DIGITS_IN_THE_DISPLAY
  ) {
    allButtons.forEach((element) => {
      if (element.classList.contains("numButton")) {
        element.classList.add("disable");
      }
    });
  }

  if (getDisplay() == "ERROR") {
    allButtons.forEach((element) => {
      element.classList.add("disable");
    });
    document.getElementById("C").classList.remove("disable");
  }

  if (removeZerosFromRight(getDisplay().replace(",", ".")) == 0) {
    if (previousOperandTextElement == "") {
      document.getElementById("negPos").classList.add("disable");
    }
    if (!currentOperandTextElement.includes(".")) {
      document.getElementById("b0").classList.add("disable");
    }
  }

  if (currentOperandTextElement.includes(".")) {
    document.getElementById("bComma").classList.add("disable");
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

function getDisplay() {
  return document.getElementById("Result_Screen").value;
}

window.onload = function () {
  disableButtons();
};
