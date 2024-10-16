document.addEventListener('DOMContentLoaded', (event) => { //loades instantly onece HTML is open
    let words = document.getElementById("words").textContent.split(" "); //calls "words" from html
    let userInput = document.getElementById("userInput");

    userInput.addEventListener("input", () => {
        let typed = userInput.value.trim(); //retrives the value from the input
        let currentWord = words[0];  // Get the first word in the array

        if (typed === currentWord) {
            // Remove the word from the list and update the display
            words.shift();  // Remove the first word from the array
            document.getElementById("words").textContent = words.join(" ");  // Updates displayed words
            userInput.value = "";  // Clear the input field
        }
    });
});