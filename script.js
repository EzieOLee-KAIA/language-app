// languages object
const languages = {
    spanish : [
        {word: "hola", meaning: "hello"},
        {word: "gracias", meaning: "thank you"},
        {word: "adiós", meaning: "goodbye"},
        {word: "sí", meaning: "yes"},
        {word: "no", meaning: "no"},
        {word: "por favor", meaning: "please"},
        {word: "agua", meaning: "water"},
        {word: "buenos días", meaning: "good morning"},
        {word: "buenas noches", meaning: "good night"},
        {word: "lo siento", meaning: "sorry"}
    ],
    german : [
        {word: "hallo", meaning: "hello"},
        {word: "danke", meaning: "thank you"},
        {word: "tschüss", meaning: "goodbye"},
        {word: "ja", meaning: "yes"},
        {word: "nein", meaning: "no"},
        {word: "bitte", meaning: "please"},
        {word: "Wasser", meaning: "water"},
        {word: "Guten Morgen", meaning: "good morning"},
        {word: "Gute Nacht", meaning: "good night"},
        {word: "Entschuldigung", meaning: "sorry"}
    ],
    afrikaans : [
        {word: "hallo", meaning: "hello"},
        {word: "dankie", meaning: "thank you"},
        {word: "totsiens", meaning: "goodbye"},
        {word: "ja", meaning: "yes"},
        {word: "nee", meaning: "no"},
        {word: "asseblief", meaning: "please"},
        {word: "water", meaning: "water"},
        {word: "goeiemôre", meaning: "good morning"},
        {word: "goeienag", meaning: "good night"},
        {word: "jammer", meaning: "sorry"}
    ]
};
let currentLanguage = "spanish"; //initialises currentLanguage
let currentCards = languages[currentLanguage]; //inititialises currentCards
let currentVoice = "es-ES";

let currentIndex = 0; //initialises currentIndex before being used
let score = 0;
let answeredCorrectly = false;

//lookups
const cardText = document.getElementById("card-text");
const answerInput = document.getElementById("answer-input");
const feedback = document.getElementById("feedback");
const scoreDisplay = document.getElementById("score-display");
const savedScore = localStorage.getItem("score");
const resetButton = document.getElementById("reset-btn");

if ( savedScore !== null ) {
    score = Number(savedScore);
    scoreDisplay.textContent = `Score: ${score}`;
}

//card, nextButton function, showCard function, languageButtons for loop,  and flipCard function

const card = document.getElementById("card");

let showingWord = true;

function showCard() {
    cardText.textContent = currentCards[currentIndex].word;
    showingWord = true;
    answerInput.value = "";
    feedback.textContent = "";
    answeredCorrectly = false;
}



function flipCard() {
    if (showingWord) {
        cardText.textContent = currentCards[currentIndex].meaning;
        showingWord = false;
    } else {
        cardText.textContent = currentCards[currentIndex].word;
        showingWord = true;
    }
}
const nextButton = document.getElementById("next-btn");
function nextCard() {
    currentIndex = currentIndex + 1;
    if (currentIndex === currentCards.length) {
        currentIndex = 0;
    }
    showCard();
}

const speakButton = document.getElementById("speak-btn");

function speakWord() {
    const message = new SpeechSynthesisUtterance(currentCards[currentIndex].word);
    message.lang = currentVoice;
    message.rate = 0.8;
    speechSynthesis.speak(message);
}


const checkButton = document.getElementById("check-btn");


function checkAnswer() {
    if (answeredCorrectly) {
        return;
    }
    const typed = answerInput.value.trim().toLowerCase();
    const correct = currentCards[currentIndex].meaning.toLowerCase();
    if (typed ===  correct) {
        feedback.textContent = "Correct!";
        score++;
        scoreDisplay.textContent = `Score: ${score}`;
        localStorage.setItem("score", score);
        answeredCorrectly = true;
    } else {
        feedback.textContent = "Not quite, the answer is " + currentCards[currentIndex].meaning.toLowerCase();
    }
}

 function resetScore() {
    if (confirm("Reset your score to 0?")) {
        score = 0;
        scoreDisplay.textContent = `Score: ${score}`;
        localStorage.removeItem("score");
    }
 }

const languageButtons = document.querySelectorAll(".lang-btn");
for (const button of languageButtons) {
    button.addEventListener("click", function() {
        for (const other of languageButtons) {
            other.classList.remove("active");
        }
        button.classList.add("active");
        currentLanguage = button.dataset.language;
        currentCards = languages[currentLanguage];
        currentIndex = 0;
        currentVoice = button.dataset.voice;
        showCard();
    });
}



nextButton.addEventListener("click", nextCard);
card.addEventListener("click", flipCard);
speakButton.addEventListener("click", speakWord);
checkButton.addEventListener("click", checkAnswer);
resetButton.addEventListener("click", resetScore);
showCard();