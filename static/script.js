var WordCount = parseInt(localStorage.getItem("WordCount")) || 0;
var CharactersCount = parseInt(localStorage.getItem("characters")) || 0;
var WpmCount = parseInt(localStorage.getItem("WpmCount")) || 0;
window.onload = () => { // loads on reload
    let countdownElement = document.getElementById('countdown');
    UpdateWordCount();
    updateWpmCount();
    localStorage.setItem('UserIsReady', 'yes')
    UpdateCharactersCount();
    countdownElement.innerHTML = "15 seconds ";
    const userInput = document.getElementById('userInput');
    userInput.onpaste = e => e.preventDefault();
    CheckCookies();
    TimeOption();
   }

function home(url) {  // url to home page
    window.location.href = url; 
}

function about(url) {
    window.location.href = url; 
}

function leaderboard_url(url) {
    window.location.href = url; 
}

document.addEventListener("keydown", function (event) {
    if (event.key === "Tab") {
        event.preventDefault(); // Prevents the default tab behavior (e.g., moving focus)
        location.reload(); // Reloads the page
        window.location.href = "#game"; // scrrols to the element with id="game"
        window.location.href = "#userInput";
    }
});


function profile() { //open profile
    let profile = document.getElementById("profile");

    if (profile.classList.contains("show")) {
        // Fades out the image and removes blur
        profile.style.opacity = '0';
        setTimeout(function() {
            profile.classList.remove("show");
            profile.style.visibility = 'hidden';
        }, 500); // Matches the transition duration
    } else {
        // Fade in the image and add blur
        profile.style.visibility = 'visible';
        profile.classList.add("show");
        profile.style.opacity = '1';
    }
}

function settings() {
    let settings = document.getElementById("settings");

    if (settings.classList.contains("show")) {
        settings.style.opacity = '0';
        setTimeout(function() {
            settings.classList.remove("show");
            settings.style.visibility = 'hidden';
        }, 500);
    } else {
        settings.style.visibility = 'visible';
        settings.classList.add("show");
        settings.style.opacity = '1';
    }
}


document.addEventListener('DOMContentLoaded', () => {
    const words = Array.from(document.querySelectorAll('.word')); // selects all words that are displayed
    const userInput = document.getElementById('userInput'); // Input field

    let currentIndex = 0; // Tracks the current word
    let timeLeft = countdownDuration;

    // Set the first word as active
    words[currentIndex].classList.add('active');

    userInput.addEventListener('keydown', (event) => {
        if (event.key === ' ') {
            event.preventDefault(); // Prevent adding a space to the input field
            const typedValue = userInput.value.trim(); // checks is user typed right word without spaces
            const currentWord = words[currentIndex].textContent;

            if (typedValue === currentWord) {
                // If the Word typed was correct
                words[currentIndex].classList.remove('active');
                words[currentIndex].classList.add('correct');
                UserReady();
                WordCount += 1;
                update_total_words();
                UpdateWordCount();
                CharactersCount += typedValue.length;
                update_total_Characters();
                UpdateCharactersCount();
                Convert = 60/timeLeft
                WpmCount += typedValue.length/5 * Convert;
                console.log(Convert);
                updateWpmCount();
                currentIndex++; // Moves to the next word
            } else {
                // If Word typed incorrectly
                words[currentIndex].classList.remove('active');
                words[currentIndex].classList.add('incorrect');
                currentIndex++;
            }

            userInput.value = ''; // Clear input field

            if (currentIndex < words.length) {
                words[currentIndex].classList.add('active'); // Highlight the next word
            }
        }
    });

    userInput.addEventListener('input', () => {
        const typedValue = userInput.value.trim(); // Remove leading/trailing spaces
        const currentWord = words[currentIndex].textContent;

        if (currentWord.startsWith(typedValue)) {
            // Remove incorrect class if part of the word matches
            words[currentIndex].classList.remove('incorrect');
            words[currentIndex].classList.add('correct');
        } else {
            // Word typed incorrectly
            words[currentIndex].classList.add('incorrect');
        }
    });
});

let countdownDuration = 15; // Default duration in seconds
let countdownElement = document.getElementById('countdown');

document.getElementById('timeForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent the form from refreshing the page

    // Get the value from the input field
    let timeInput = document.getElementById("TimeChanger").value;

    // Parse the input as a number
    let customTime = parseInt(timeInput);

    if (!isNaN(customTime) && customTime > 0) {
        // If the input is valid, update the countdownDuration
        countdownDuration = customTime;
        countdownElement.innerHTML = `Countdown set to ${countdownDuration} seconds`;
    } else {
        // Display an error message if the input is invalid
        countdownElement.innerHTML = "Please enter a valid positive number.";
    }
});

function startCountdown() {
    let timeLeft = countdownDuration;
    let ButtonAddTime = document.getElementById("ButtonAddTime");
    let CountDownStyle = document.getElementById("countdown");

    // Update the countdown every second
    let timer = setInterval(function () {
        if (timeLeft <= 0) {
            clearInterval(timer);
            countdownElement.innerHTML = "Time's up!";
            score();
        } else {
            countdownElement.innerHTML = timeLeft + " seconds remaining";
            ButtonAddTime.style.display = 'none';
            CountDownStyle.style.marginBottom = '18px';
        }
        timeLeft--;
    }, 1000);
}


function UserReady() { //starts timer once user is ready
    if (value = localStorage.getItem('UserIsReady')) {
        startCountdown();
        localStorage.removeItem('UserIsReady');
    } 
}


function TimeOption() {
    let TimeChanger = document.getElementById("TimeChanger");
    let TimeChanger2 = document.getElementById("TimeChanger2");
    let Button = document.getElementById("ButtonAddTime")
    let CountDownStyle = document.getElementById("countdown");
    if (TimeChanger.style.display === "none") {
        TimeChanger.style.display = "block";
        TimeChanger2.style.display = "block";
        Button.style.display = 'none';
    } else {
        TimeChanger.style.display = "none";
        TimeChanger2.style.display = "none";
        CountDownStyle.style.marginBottom = '18px';
    }
}

function score() {
    let input = document.getElementById("userInput");
    let score = document.getElementById("score");
    let mainContent = document.querySelector('.main-content');

    if (score.classList.contains("show")) {
        score.style.opacity = '0';
        setTimeout(function() {
            score.classList.remove("show");
            score.style.visibility = 'hidden';
            mainContent.classList.remove("blur-background");
        }, 500);
    } else {
        score.style.visibility = 'visible';
        score.classList.add("show");
        score.style.opacity = '1';
        input.style.display = 'none';
        mainContent.classList.add("blur-background");
        mainContent.style.filter = "blur(20px)";
        mainContent.style.overflow = 'hidden';
    }
}

function UpdateWordCount() {
    console.log("word count updated");
    var paragraph2 = document.getElementById("WordCountStats");
    paragraph2.textContent = "Total words: " + WordCount;
}

async function update_total_words() {
    try {
        const response = await fetch("/update_total_words", { method: "POST" });
        if (!response.ok) {
            console.error("Failed to update words on the server.");
        }
    } catch (error) {
        console.error("Error:", error);
    }
}

function updateWpmCount() {
    console.log(WpmCount.toFixed(0));
    var paragraph = document.getElementById("WpmCount"); 
    paragraph.textContent = "WPM: " + WpmCount.toFixed(0);
    paragraph.style.color = "crimson";
}

function UpdateCharactersCount() {
    console.log("character count updated");
    var paragraph2 = document.getElementById("CharactersCountStats");
    paragraph2.style.color = "crimson";
    paragraph2.textContent = "Total Characters: " + CharactersCount;
}

async function update_total_Characters() {
    try {
        const response = await fetch("/update_total_Characters", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ characters: CharactersCount }), // Send the character count
        });
        if (!response.ok) {
            console.error("Failed to update characters on the server.");
        }
    } catch (error) {
        console.error("Error:", error);
    }
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

function temporary() {
    let temp = document.getElementById("temporary");
    let mainContent = document.querySelector('.main-content'); // Select the content to blur
    let body = document.querySelector('body');

    if (temp.classList.contains("show")) {
        // Fade out the image and remove blur
        temp.style.opacity = '0';
        setTimeout(function() {
            temp.classList.remove("show");
            temp.style.visibility = 'hidden';
            mainContent.classList.remove("blur-background");
            CookieOption.style.gap = '0%';
        }, 500); // Matches the transition duration
    } else {
        // Fade in the image and add blur
        temp.style.visibility = 'visible';
        temp.classList.add("show");
        temp.style.opacity = '1';
        mainContent.classList.add("blur-background");
        mainContent.style.filter = "blur(100px)";
        mainContent.style.backgroundColor = "rgba(0, 0, 0, 100)";
        mainContent.style.transition = "filter, background-color 7.5s ease-in";
        body.style.overflow = "hidden";
    }
}