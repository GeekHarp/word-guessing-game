const input  = document.getElementById("input");
const button = document.getElementById("enter-button");
const buttons = document.getElementById("buttons-container");
const restartButton = document.getElementById("restart");
const backButton = document.getElementById("back");

let word;
let wordArr;
let underScoresArr;
let chances = 6;

// func() that only allow letters in the input
function onlyLettersAndSpaces(){
    const regex = new RegExp("^[a-zA-Z]+$");
    const key = String.fromCharCode(!event.charCode ? event.which : event.charCode);
    if (!regex.test(key)) {
        event.preventDefault();
        return false;
    }
}

// Display underscores(according to length of word) to the user
function displayUnderscore(){
    const display = document.getElementById("display");
    underScoresArr = [];
    for (let i = 0; i < word.length; i++) {
        underScoresArr.push("_");
    }
    let underScores = underScoresArr.join(" ");
    display.textContent = underScores;
}

// After user submits the word, shows the buttons and underscores.. remove previous header and input
function submitWordAndStuff(){
    word = input.value.toLowerCase();
    wordArr = word.split("");
    displayUnderscore();
    const body = document.querySelector("body");
    const header = document.querySelector("header");
    const inputs = document.getElementById("think");
    const button = document.getElementById("button-wrapper");
    const homeaTag = document.getElementById("home-atag");
    button.style.visibility  = "visible";
    buttons.style.visibility = "visible";
    display.style.visibility = "visible";
    homeaTag.style.visibility = "hidden";
    body.removeChild(header);
    body.removeChild(inputs);
}

// Happens when user press enter
function submitAnswer(e){
    // if user press "enter" on keyboard and input not empty
    if (e.which === 13 && input.value.length) {
        submitWordAndStuff();
    }
}

// Happens when user click
function submitAnswer2(){
    if (input.value.length) {
        submitWordAndStuff();
    }
}

// Func check if the letter clicked is in the word
function checkLetter(e){
    const playerOptions  = document.getElementById("player-options");
    const chancesDisplay = document.getElementById("player-chances");
    const correctSound = new Audio("./Audio/Correct.wav");
    const wrongSound   = new Audio("./Audio/Wrong.wav");
    const gameWon = new Audio("./Audio/Cheering.wav");
    const gameLost = new Audio("./Audio/Boo.wav");
    const button = document.getElementById("button-wrapper");
    // This will prevent the ul from getting clicked
    if (e.target && e.target.nodeName === "LI") {
        e.target.classList.add("disabled");
        if (word.includes(e.target.textContent)) {
            correctSound.play();
           let indexArray = [];
           for (let i = 0; i < wordArr.length; i++) {
                if (e.target.textContent === wordArr[i]) {
                    indexArray.push(i);
                }
            }
            for (let i = 0; i < underScoresArr.length; i++) {
                for (let j = 0; j < indexArray.length; j++) {
                    underScoresArr[indexArray[j]] = e.target.textContent;
                }
            }
            let updateDisplay = underScoresArr.join(" ");
            display.textContent = updateDisplay;
            // if user got the word
            if (!updateDisplay.includes("_")) {
                gameWon.play();
                button.removeChild(backButton);
                chancesDisplay.textContent = "You got the word!";
                playerOptions.style.visibility = "visible";
                buttons.removeEventListener("click",checkLetter);
            }
            // if letter !included in the word
        } else {
            wrongSound.play();
            chances--;
            chancesDisplay.textContent = "You have "+chances+" chances left";
            if (chances === 0) {
                gameLost.play();
                chancesDisplay.textContent = "You LOSE";
                playerOptions.style.visibility = "visible";
                buttons.removeEventListener("click",checkLetter);
            }
        }
    }
}

input.addEventListener("keypress",submitAnswer);
button.addEventListener("click",submitAnswer2);
input.addEventListener("keypress",onlyLettersAndSpaces);
buttons.addEventListener("click",checkLetter);
restartButton.addEventListener("click",function(){
    location.reload();
})
backButton.addEventListener("click",function(){
    location.reload();
})