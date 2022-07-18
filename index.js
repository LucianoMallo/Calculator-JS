let firstNumber='0';
let secondNumber='0';
let sign='';




function addNumber(number){

    switch(true){

    case (numberCount(firstNumber)>=10):
        break;

    case (firstNumber=='0'):
        firstNumber=number;
        break;
    
    default:
        firstNumber+=number;
        break;
    
}

displayCounter(firstNumber);

}


function addComma(){

    switch(true){

        case (firstNumber.includes('.')):
        case (numberCount(firstNumber)>=10):
        break;
    
        case (firstNumber=='0'):
        firstNumber='0.';
        break;
    
        default:
        firstNumber+='.';
        break;
    }

displayCounter(firstNumber);
}

function changeSign(){
    switch(true){

        case (firstNumber=='0'):
        case (firstNumber=='0.'):
            break;
        
        default:
            
            firstNumber= String(firstNumber * (-1));
            break;

    }
    displayCounter(firstNumber);

}


function setSign(x){

sign=x;
console.log(sign);

}

function setHighlight(x){

    removeHighlight();
    let changeClass = x.currentTarget.classList
    changeClass.add("operatorHighlighted");

}

function removeHighlight(){
    let changeClass = document.getElementsByClassName('operationButton');
    for(let i=0; i< changeClass.length; i++)
    {
        changeClass[i].classList.remove('operatorHighlighted')
    }
}

function eraseValue(){

    document.getElementById('Result_Screen').value="";
    removeHighlight();
    firstNumber="0";
    secondNumber="0";
    sign="";

}

function displayCounter(x){
//console.log(firstNumber);
    document.getElementById('Result_Screen').value = x.replace(".",",");

}

function equal(){
    removeHighlight();
    operation(sign);

}

function operation(){

}







  function numberCount(numbers){
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

      case (parseInt(event.key)>=0 && parseInt(event.key)<=10):
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