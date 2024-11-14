var WordCount = parseInt(localStorage.getItem("WordCount")) || 0;
var CharactersCount = parseInt(localStorage.getItem("characters")) || 0;
var WpmCount = parseInt(localStorage.getItem("WpmCount")) || 0;
window.onload = () => {
    let countdownElement = document.getElementById('countdown');
    UpdateWordCount();
    updateWpmCount();
    localStorage.setItem('UserIsReady', 'yes')
    UpdateCharactersCount();
    countdownElement.innerHTML = "15 seconds ";
    const userInput = document.getElementById('userInput');
    userInput.onpaste = e => e.preventDefault();
    CheckCookies();
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
        let currentLength = words[0].length;
        let removedWord = document.getElementById("words");
        let start = e.inputType === "insertText"
        let color = document.getElementById("userInput");
        let game = document.getElementById("userInput");

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
            GameColor();
            WordCount += 1; 
            UpdateWordCount();
            CharactersCount += typed.length;
            UpdateCharactersCount();
            WpmCount += typed.length/5 * 4;
            updateWpmCount();
        } else {
            game.style.backgroundColor = "rgba(0, 0, 0, 0.124";
        }
        if (e.inputType === "insertText" && e.data === " " && typed.length < currentLength) {
            userInput.value = ""; 
            color.style.color = "red";
            game.style.backgroundColor = "rgba(229, 12, 12, 0.075)";
        } else {
            color.style.color = "white";
        }
        if (e.inputType === "insertText") {
            UserReady();
        }
    });
});

function UserReady() {
    if (value = localStorage.getItem('UserIsReady')) {
        startCountdown();
        localStorage.removeItem('UserIsReady');
    } 
}

function GameColor() {
    let game = document.getElementById("userInput");

    game.style.backgroundColor = "rgba(45, 229, 12, 0.075)";
    game.style.transform = "opacity 0.001s ease-in-out";
    game.style.transition = "background-color 0.001s ease-in-out";
}

function timeuse() {
    let useage = timeLeft/60
}

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
    let score = document.getElementById("score");
    let mainContent = document.querySelector('.main-content'); // Select the content to blur

    if (score.classList.contains("show")) {
        // Fade out the image and remove blur
        score.style.opacity = '0';
        setTimeout(function() {
            score.classList.remove("show");
            score.style.visibility = 'hidden';
            mainContent.classList.remove("blur-background");
        }, 500); // Matches the transition duration
    } else {
        // Fade in the image and add blur
        score.style.visibility = 'visible';
        score.classList.add("show");
        score.style.opacity = '1';
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
    console.log(WpmCount.toFixed(0));
    var paragraph = document.getElementById("WpmCount"); 
    paragraph.textContent = "wpm: " + WpmCount.toFixed(0);
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

function CheckCookies() {
    let cookiesDisplay = document.getElementById("cookies");

    if (value = localStorage.getItem('cookies')) {
        console.log("cookies are enabled");
        cookiesDisplay.style.display = "none";
    } else {
        cookies();
    }    
}

function cookies() {
    localStorage.setItem('cookies', 'removed');
    let cookies = document.getElementById("cookies");
    let mainContent = document.querySelector('.main-content'); // Select the content to blur
    let CookieOption = document.getElementById("CookieOption");

    if (cookies.classList.contains("show")) {
        // Fade out the image and remove blur
        cookies.style.opacity = '0';
        setTimeout(function() {
            cookies.classList.remove("show");
            cookies.style.visibility = 'hidden';
            mainContent.classList.remove("blur-background");
            CookieOption.style.gap = '0%';
        }, 500); // Matches the transition duration
    } else {
        // Fade in the image and add blur
        cookies.style.visibility = 'visible';
        cookies.classList.add("show");
        cookies.style.opacity = '1';
        mainContent.classList.add("blur-background");
    }
}