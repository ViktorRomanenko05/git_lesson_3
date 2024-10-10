// Выбираем элементы DOM
const display = document.querySelector(".counter-display");
const plusButton = document.querySelector(".onPlus");
const minusButton = document.querySelector(".onMinus");
const systemChoice = document.querySelector("#choice-system");
const resetButton = document.querySelector("#reset-clicker");
const radios = systemChoice.elements["system"];

let counter = 0;
let modifiedCounter = counter;

const changeSystemFunction = () => {
    let selectedRadio = Array.from(radios).find(radio => radio.checked).value;

    switch(selectedRadio) {
        case "binary":
            modifiedCounter = counter.toString(2);
            break;
        case "octal":
            modifiedCounter = counter.toString(8);
            break;
        case "decimal":
            modifiedCounter = counter;
            break;
        case "hexadecimal":
            modifiedCounter = counter.toString(16);
            break;
    }
    display.textContent = modifiedCounter
}

colorDisplayFunction = () => {
    if (counter < 0){
        display.style.color = "#FF073A";
    }
    else if (counter === 0 ){
        display.style.color = "#00FFFF";
    }
    else {
        display.style.color = "#00FF00";
    }
}

const resetFunction = () => {
    counter = 0;
    modifiedCounter = 0;
    display.textContent = "0";
    display.style.color = "#00FFFF";

}

systemChoice.addEventListener("change", changeSystemFunction);

const plusFunction = () => {
    counter++;
    colorDisplayFunction();
    changeSystemFunction();
};

const minusFunction = () => {
    counter--;
    colorDisplayFunction();
    changeSystemFunction();
};

plusButton.addEventListener("click", plusFunction);
minusButton.addEventListener("click", minusFunction);
resetButton.addEventListener("click", resetFunction);