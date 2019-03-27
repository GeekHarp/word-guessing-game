// returns a random word from a array
function randomize(){
    // Once player has more than 5 correct, we increase the difficulty
    if (score > 7) {
        let randomNum = Math.floor((Math.random() * arrOfWordsHard.length));
        return arrOfWordsHard[randomNum];
    } else {
        let randomNum = Math.floor((Math.random() * arrOfWordsEasy.length));
        return arrOfWordsEasy[randomNum];
    }
}

// returns a array of randomized index..
function scrambleNumArr(){
    // Create a arr(with a length of wordArr) that stores randomized numbers
    let indexArr = [];
    // While loop is used as we don't know how many times are needed before we get indexArr to have different num
    while(indexArr.length < wordArr.length){
        let index = (Math.floor((Math.random() * wordArr.length)));
        // if indexArr !include index we push it in
        if (!indexArr.includes(index)) {
            indexArr.push(index);
        }
    } //console.log(indexArr);
    // Check if indexArr is in order..
    // Encountered cases when indexArr was in order that would result in the word not randomized..
    if (indexArr[0] === 0 && indexArr[1] === 1 && indexArr[2] === 2) {
        // console.log("inside the if");
        indexArr = [];
        while(indexArr.length < wordArr.length){
            let index = (Math.floor((Math.random() * wordArr.length)));
            // if indexArr !include index we push it in
            if (!indexArr.includes(index)) {
                indexArr.push(index);
            }
        } //console.log(indexArr);
        return indexArr;
    } else {
        return indexArr;
    }
}

// taking in the randomWordArr and indexArr, returns a randomized word(string)
function scramble(wordArr,indexArr){
    // We create a arr to store our randomized arr
    const scrambledArr = [];
    for (let i = 0; i < wordArr.length; i++){
        // We passed in the random index from our indexArr to our wordArr
        // Followed by pushing it in our randomized arr
        scrambledArr.push(wordArr[indexArr[i]]);
    }
    return scrambledArr.join("")
}

// display the randomized word
function displayScrambledWord(){
    // const display = document.getElementById("display");
    display.textContent = scrambledWord;
}

// this func generate new question after user get it right or pass the question..
function generateNewQuestion(){
    randomWord = randomize();
    wordArr = randomWord.split("");
    indexArr = scrambleNumArr();
    scrambledWord = scramble(wordArr,indexArr);
    display.textContent = scrambledWord;
    input.value = "";
}

// This runs when user clicks on "pass"
function passQuestion(){
    // We will display the words in this array after game ends
    passedArr.push(randomWord);
    generateNewQuestion();
}

// What happens when user get it right/wrong
function rightOrWrong(){
    const playerMessage  = document.getElementById("message");
    const playerMessage2 = document.getElementById("message2");
    const scoreDisplay  = document.getElementById("score");
    const correctSound = new Audio("../Audio/Correct.wav");
    const wrongSound   = new Audio("../Audio/Wrong.wav");
    // If user gets it right
    if (input.value === randomWord) {
        correctSound.play();
        input.value = "";
        score++;
        if (score > 7) {
            playerMessage2.textContent = "The Game just got WAYY Harder";
        }
        scoreDisplay.textContent = "Your Score: " + score;
        playerMessage.textContent = "";
        generateNewQuestion();
    // else user gets it WRONG
    } else {
        wrongSound.play();
        input.value = "";
        playerMessage.textContent = "Try again or Pass!"
    }
}

// When user pressed "enter" on keyboard
function checkInput(e){
    if (e.charCode === 13) {
        rightOrWrong();
    }
}

// When user clicks on enter button
function checkInput2(){
    rightOrWrong();
}

// Adds a 100 second timer to the game and some stuff..
function countDown(){
    const body = document.querySelector("body");
    const playerOptions = document.getElementById("player-options");
    const scoreDisplay = document.getElementById("score");
    const gameOver = new Audio("../Audio/Game Over.mp3");

    function addTimer(){
        const displayTimer = document.getElementById("timer");
        seconds--;
        displayTimer.textContent = "You have " + seconds + " seconds left..";
        // Change some content when time is running out
        if (seconds < 16) {
            body.style.backgroundImage = "linear-gradient(to right, red , yellow)";
            displayTimer.textContent = "Remind you that you have " + seconds + " seconds left!!"
        }
        if (seconds === 0) {
            clearInterval(timer);
            gameOver.play();
            const main = document.querySelector("main");
            const playerMessage2 = document.getElementById("message2");
            main.removeChild(display);
            main.removeChild(container);
            playerMessage2.textContent = "";
            displayTimer.textContent = "";
            message.textContent = "Game Over! Your Final Score is " + score ;
            scoreDisplay.textContent = "";
            playerOptions.style.visibility = "visible";
            backButton.style.visibility = "hidden";
            displayPassedWords(passedArr);
        }
    }
    addTimer();
    const timer = setInterval(addTimer,1000);
}

// Removes the button and header from the HTML and make the main content "visible"
function startGame(){
    const body = document.querySelector("body");
    const buttonContainer = document.getElementById("button-container");
    const header = document.querySelector("header");
    buttonContainer.removeChild(startButton);
    body.removeChild(header);
    const main = document.querySelector("main");
    const homeaTag = document.getElementById("home-atag");
    main.style.visibility = "visible";
    homeaTag.style.visibility = "hidden";
    countDown();
}

// Displays passed words after game ended
function displayPassedWords(arr){
    // if (arr.length) {
        const display = document.getElementById("passed-words");
        display.textContent = "These are the words you passed: ";
        for (let i = 0; i < arr.length; i++) {
            display.textContent +=  arr[i] + " ";
        }
        // Adds the last word to the textContent as well..(when time ran out)
        display.textContent += randomWord;
    // }
}

// Selecting ele for "click" listeners
const input = document.getElementById("input");
const enterButton = document.getElementById("enter");
const startButton = document.getElementById("start");
const passButton  = document.getElementById("pass");
const restartButton = document.getElementById("restart");
const backButton = document.getElementById("back");

const arrOfWordsEasy = data.filter(word => word.length > 3 && word.length < 6);
const arrOfWordsHard = data.filter(word => word.length > 4 && word.length < 7);
let score = 0;
let seconds = 5;
const passedArr = [];
// Starts here
let randomWord = randomize();
let wordArr = randomWord.split("");
// returns a array
let indexArr = scrambleNumArr();
let scrambledWord = scramble(wordArr,indexArr);
displayScrambledWord();

startButton.addEventListener("click",startGame);
input.addEventListener("keypress",checkInput);
enterButton.addEventListener("click",checkInput2);
passButton.addEventListener("click",passQuestion);
restartButton.addEventListener("click",function(){
    location.reload();
})
backButton.addEventListener("click",function(){
    location.reload();
})