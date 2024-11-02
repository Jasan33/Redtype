var WordCount = parseInt(localStorage.getItem("WordCount")) || 0;
var CharactersCount = parseInt(localStorage.getItem("characters")) || 0;
var WpmCount = parseInt(localStorage.getItem("WpmCount")) || 0;
window.onload = () => {
    let countdownElement = document.getElementById('countdown');
    WordCount += -1;
    UpdateWordCount();
    updateWpmCount();
    UpdateCharactersCount();
    countdownElement.innerHTML = "15 seconds ";
    const userInput = document.getElementById('userInput');
    userInput.onpaste = e => e.preventDefault();
   }


function profile() {
    let y = document.getElementById("profile");
    let mainContent = document.querySelector('.main-content'); // Select the content to blur

    if (y.classList.contains("show")) {
        // Fade out the image and remove blur
        y.style.opacity = '0';
        setTimeout(function() {
            y.classList.remove("show");
            y.style.visibility = 'hidden';
        }, 500); // Matches the transition duration
    } else {
        // Fade in the image and add blur
        y.style.visibility = 'visible';
        y.classList.add("show");
        y.style.opacity = '1';
    }
}

document.addEventListener('DOMContentLoaded', (event) => {
    let words = document.getElementById("words").textContent.split(" ");
    let userInput = document.getElementById("userInput");

    userInput.addEventListener("input", (e) => {
        let typed = userInput.value.trim(); // Retrieve the trimmed value from the input
        let currentWord = words[0];  // Get the first word in the table
        let removedWord = document.getElementById("words");
        let start = e.inputType === "insertText"

        // Check if the user pressed space (keyCode 32) and the typed word matches the current word
        // e.inputType === "insertText" checks if input was modified
        // e.data === " " checks is user pressed space
        // typed === currentWord ensures that the typed word matches the current word
        if (e.inputType === "insertText" && e.data === " " && typed === currentWord) {
            // Remove the word from the list and update the display
            words.shift();  // Remove the first word from the table
            userInput.value = "";  // Clear the input
            removedWord.textContent = words.join(" ");  // Updates displayed words
            console.log("+1 point");
            WordCount += 1; 
            UpdateWordCount();
            CharactersCount += typed.length;
            UpdateCharactersCount();
            WpmCount += typed.length/5 * 4;
            updateWpmCount();
        }
    });
});

let countdownDuration = 15; // seconds
let countdownElement = document.getElementById('countdown');

function startCountdown() {
    WordHighLight();
    let input = document.getElementById("userInput");
    let timeLeft = countdownDuration;
    let countdownElement = document.getElementById('countdown');
    let ButtonAddTime = document.getElementById("ButtonAddTime")

    // Update the countdown every second
    let timer = setInterval(function() {
        if (timeLeft <= 0) {
            clearInterval(timer);
            countdownElement.innerHTML = "Time's up!";
            score();
        }
        else {
            countdownElement.innerHTML = "Time: " + timeLeft + " seconds remaining";
            ButtonAddTime.style.display = 'none';
        }
        timeLeft--;
    }, 1000);
}

function TimeOption() {
    let TimeChanger = document.getElementById("TimeChanger");
    let Button = document.getElementById("ButtonAddTime")
    if (TimeChanger.style.display === "none") {
        TimeChanger.style.display = "block";
        Button.style.display = 'none';
    } else {
        TimeChanger.style.display = "none";
    }
}

function WordHighLight() {
    let word = document.getElementById("words");
    word.style.textShadow = '1px 1px';
}

function score() {
    let input = document.getElementById("userInput");
    let y = document.getElementById("score");
    let mainContent = document.querySelector('.main-content'); // Select the content to blur

    if (y.classList.contains("show")) {
        // Fade out the image and remove blur
        y.style.opacity = '0';
        setTimeout(function() {
            y.classList.remove("show");
            y.style.visibility = 'hidden';
            mainContent.classList.remove("blur-background");
        }, 500); // Matches the transition duration
    } else {
        // Fade in the image and add blur
        y.style.visibility = 'visible';
        y.classList.add("show");
        y.style.opacity = '1';
        input.style.display = 'none';
        mainContent.classList.add("blur-background");
    }
}

function UpdateWordCount() {
    console.log("word count updated");
    var paragraph = document.getElementById("WordCount"); 
    paragraph.textContent = "Words: " + WordCount;
    var paragraph2 = document.getElementById("WordCountStats");
    paragraph2.style.color = "crimson";
    paragraph2.style.hover = "crimson";
    paragraph2.textContent = "Total words: " + WordCount;
}

function updateWpmCount() {
    WpmCount * 4;
    console.log(WpmCount);
    var paragraph = document.getElementById("WpmCount"); 
    paragraph.textContent = "wpm: " + WpmCount;
    paragraph.style.color = "crimson";
}

function UpdateCharactersCount() {
    console.log("character count updated");
    var paragraph = document.getElementById("CharactersCount"); 
    paragraph.textContent = "Characters: " + CharactersCount;
    var paragraph2 = document.getElementById("CharactersCountStats");
    paragraph2.style.color = "crimson";
    paragraph2.textContent = "Total Characters: " + CharactersCount;
}