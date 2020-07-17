// notes
// Clicking equals while the last press was operator should do nothing/ alert user somehow
// Round decimals with long answers
// Display error if divided by 0
// After equals pressed, display input on top line, and answer on bottom,
//      then allow another operator to be used following answer, or cleared if number pressed


// Starting screen 1 and 2 text can be manipulated anywhere
let screen1Text = "";

let screen2Text = "";



// Update the Screen in appropriate manner so that calculations can be performed on it
function updateScreen(text) {
    // Get screen elements
    const screen1 = document.getElementById("screen1");
    const screen2 = document.getElementById("screen2");

    // Set operators
    let operators = [" + ", " x ", " ÷ "]

    // split string on spaces for better control over screen display
    let splitText = screen1Text.split(" ");
    for (let i = 0)
    console.log(splitText)

    // Handle DEL button
    if (text === "CE") {
        if (screen1Text.slice(screen1Text.length - 1) === " ") {
            // Delete space gaps if operator was used
            screen1Text = screen1Text.slice(0, screen1Text.length - 3);
            screen2Text = screen2Text.slice(0, screen2Text.length - 3);

        } else {
            screen1Text = screen1Text.slice(0, screen1Text.length - 1);
            screen2Text = screen2Text.slice(0, screen2Text.length - 1);
        }
    // Handle AC button
    } else if (text === "AC") {
        screen1Text = "";
        screen2Text = "";
      
    // Handle decimal, allow only one per number
    } else if (text === ".") {
        // If their is not a decimal in the last number entered allow adding it
        if (splitText[splitText.length - 1].indexOf(text) === -1) {
            screen1Text += text;
            screen2Text += text;
        }

    // Handle subtract/negative
    } else if (text === " - ") {
        // Allow negative numbers
        if (screen2Text === "") {
            screen1Text += text.slice(1);
            screen2Text += text.slice(1);
        } else if (splitText[splitText.length - 1] !== "") {
            screen1Text += text;
            screen2Text = "";
        }

    // Handle other operators
    } else if (operators.indexOf(text) !== -1) {
        // If no text on screen
        if (screen1Text === "") {

        } else if (splitText[splitText.length - 1] === "") {

        } else {
            screen1Text += text;
            screen2Text = "";
        }
        
        
    

    // Handles all other keys, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9
    } else {
        screen1Text += text;
        screen2Text += text;
    }



    screen1.textContent = screen1Text;
    screen2.textContent = screen2Text;
}


// Add listener to do the following when a button is pressed
const buttons = document.querySelectorAll('button');
buttons.forEach((button) => {
    button.addEventListener('click', () => {
        let buttonText = button.textContent;

        updateScreen(buttonText);

        // Add animation class
        button.classList.add("button-after");
    })


    button.addEventListener('mousedown', () => {
        button.classList.toggle("button-after")
    })

    button.addEventListener('mouseup', () => {
        button.classList.remove("button-after")
    })

});

function editKeyboard(text) {
    const spacedKeys = ["+", "-", "*", "/", "Enter", "Backspace", "="]
    const newKeys = [" + ", " - ", " x ", " ÷ ", " = ", "CE", " = "]
    if (spacedKeys.indexOf(text) === -1) {
        console.log("unchanged")
        return text;
    }
    return newKeys[spacedKeys.indexOf(text)];
}

// Allowed key presses
const allowedKeys = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0",
                    ".", "+", "-", "=", "*", "/", "(", ")", "Enter",
                    "Backspace"]

// Keyboard press handler
window.addEventListener('keydown', function(e) {
    let keyText = e.key;
    if (allowedKeys.indexOf(keyText) !== -1) {
        // Edit keyText if button does not correspond with keyboard text
        keyText = editKeyboard(keyText);

        // If key is equivalent to a button press, trigger animation
        const buttons = document.querySelectorAll('button');
        buttons.forEach((button) => {
            if (button.textContent === keyText) {
                button.classList.add("button-after")
            } 
                
        });

        updateScreen(keyText);
        } 
    })

// removes animation class after keyboard triggers fake button press
window.addEventListener('keyup', function(e) {
    let keyText = e.key;
    if (allowedKeys.indexOf(keyText) !== -1) {
        // Edit keyText if button does not correspond with keyboard text
        keyText = editKeyboard(keyText);

        const buttons = document.querySelectorAll('button');
        buttons.forEach((button) => {
            if (button.textContent === keyText) {
                button.classList.remove("button-after")
            } 
        });
    }

})
