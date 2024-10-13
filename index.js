// Выбираем элементы DOM
const display = document.querySelector(".counter-display");
const plusButton = document.querySelector(".onPlus");
const minusButton = document.querySelector(".onMinus");
const systemChoice = document.querySelector("#choice-system");
const resetButton = document.querySelector("#reset-clicker");
const plus32button = document.querySelector("#plus-32");
const plus128button = document.querySelector("#plus-128");
const plus512button = document.querySelector("#plus-512");
const startButton = document.querySelector("#start-button");
const allButtons = document.querySelectorAll(".button");
const radios = systemChoice.elements["system"];

let counter = 0;
let modifiedCounter;
let hours = 0;
let minutes = 0;
let seconds = 0;
let timerIntervalId = null;
let timerInfinityIntervalId = null;
let intervalIdHoldPlus = null;
let intervalIdHoldMinus = null;

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
        display.style.textShadow = "0px 0px 8px #FF073A";
    }
    else if (counter === 0 ){
        display.style.color = "#00FFFF";
        display.style.textShadow = "0px 0px 8px #00FFFF";
    }
    else {
        display.style.color = "#00FF00";
        display.style.textShadow = "0px 0px 8px #00FF00";

    }
}

const resetFunction = () => {
    counter = 0;
    modifiedCounter = 0;
    display.textContent = "0";
    display.style.color = "#00FFFF";
    display.style.textShadow = "0px 0px 8px #00FFFF";
    allButtons.forEach(button => button.removeAttribute("disabled", ""));
    clearInterval(timerIntervalId);
    clearInterval(timerInfinityIntervalId);
}

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

const autoPlusFunction = (number) => {
    allButtons.forEach(button => button.setAttribute("disabled", ""));
    let count = 0;
    let intervalId = setInterval(() => {
        if (count < number) {
            plusFunction();
            count++;
        } else {
            clearInterval(intervalId);
            allButtons.forEach(button => button.removeAttribute("disabled"));
        }
    }, 5);
};

const updateTimeInfinity = () => {
    const formattedHours = hours < 10 ? `0${hours}` : hours;
    const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
    const formattedSeconds = seconds < 10 ? `0${seconds}` : seconds;

    display.textContent = `${formattedHours}:${formattedMinutes}:${formattedSeconds}`;

    seconds++;

    if (minutes > 59) {
        minutes = 0;
        hours++;
    }

    if (seconds > 59) {
        seconds = 0;
        minutes++;
    }
}

const timerFunction = () => {
    allButtons.forEach(button => button.setAttribute("disabled", ""));
    resetButton.removeAttribute("disabled");
    hours = Math.floor(counter / 3600);
    minutes = Math.floor((counter % 3600) / 60);
    seconds = counter % 60;

    if (counter < 0) {
       let intervalId = setInterval(() => {
           if (counter < 0) {
               plusFunction();
           }
           else {
               clearInterval(intervalId)
               allButtons.forEach(button => button.removeAttribute("disabled", ""));
           }
       }, 1000)
    }
    else if (counter > 0) {
        display.style.color = "#FFAA33";
        display.style.textShadow = "0px 0px 8px #FFAA33";

        const updateTime = () => {
            const formattedHours = hours < 10 ? `0${hours}` : hours;
            const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
            const formattedSeconds = seconds < 10 ? `0${seconds}` : seconds;
            counter = 0;

            display.textContent = `${formattedHours}:${formattedMinutes}:${formattedSeconds}`;

            seconds--;

            if (minutes < 0) {
                minutes = 59;
                hours--;
            }

            if (seconds < 0) {
                seconds = 59;
                minutes--;
            }

            if (hours === 0 && minutes === 0 && seconds === 0) {
                clearInterval(timerIntervalId);
                display.style.color = "#FF073A";
                display.style.textShadow = "0px 0px 8px #FF073A";
                timerInfinityIntervalId = setInterval(updateTimeInfinity, 1000);
            }
        }
        timerIntervalId = setInterval(updateTime, 1000);
    }
    else {timerInfinityIntervalId = setInterval(updateTimeInfinity, 1000);}
}

let holdTimeoutPlusId = null;
let holdTimeoutMinusId = null;

const startHoldingPlus = () => {
    holdTimeoutPlusId = setTimeout(() => {
        intervalIdHoldPlus = setInterval(() => {
            plusFunction();
        }, 100);
    }, 500);
};

const startHoldingMinus = () => {
    holdTimeoutMinusId = setTimeout (() => {
    intervalIdHoldMinus = setInterval(() => {
        minusFunction();
       }, 100);
    }, 500);
};


const stopHoldingPlus = () => {
    clearTimeout(holdTimeoutPlusId);
    clearInterval(intervalIdHoldPlus);
};

const stopHoldingMinus = () => {
    clearInterval(intervalIdHoldMinus);
    clearTimeout(holdTimeoutMinusId);
}

plusButton.addEventListener("click", plusFunction);
plusButton.addEventListener("mousedown", startHoldingPlus);
plusButton.addEventListener("mouseup", stopHoldingPlus);
plusButton.addEventListener("mouseleave", stopHoldingPlus);
minusButton.addEventListener("click", minusFunction);
minusButton.addEventListener("mousedown", startHoldingMinus);
minusButton.addEventListener("mouseup", stopHoldingMinus);
minusButton.addEventListener("mouseleave", stopHoldingMinus);
resetButton.addEventListener("click", resetFunction);
systemChoice.addEventListener("change", changeSystemFunction);
plus32button.addEventListener("click", () => {autoPlusFunction(32)});
plus128button.addEventListener("click", () => {autoPlusFunction(128)});
plus512button.addEventListener("click", () => {autoPlusFunction(512)});
startButton.addEventListener("click", timerFunction);