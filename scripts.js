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
    
    // If last pressed was equals 
    //console.log(screen1Text)
    let splitText = screen1Text.split(' ');

    //console.log("_" + screen1Text + "_")
    if (screen1Text[screen1Text.length - 2] === "=") {
        console.log("____=____")
        if (text === " = ") {
            // Do nothing 
        
        // If button is other operator use previous answer as first number
        } else if (operators.indexOf(text) !== -1) {
            screen1Text = screen2Text + text;
            screen2Text = ""
        
        // If clear entry pressed after equals clear answer and remove equals
        } else if (text === "CE") {
            //screen2Text = "";
            screen2Text = splitText[splitText.length - 3]
        
        // Else clear both screens
        } else {
            screen1Text = "";
            screen2Text = "";
        }
    }

    // Handle DEL button
     if (text === "CE") {
        let numbersOnly = splitText;
        console.log(numbersOnly)
        
        // Clear any non numbers from end of numbers list previously entered
        const unwanted = ["-", "+", "x", "÷", ""];
        for (let i = 0; i < unwanted.length; i ++) {
            for (let j = numbersOnly.length; j >= 0; j--) {
                if (unwanted[i] === numbersOnly[j]) {
                    numbersOnly.splice(j, 1);
                }
            }
        }

        console.log(numbersOnly)

        // If the last character was negative sign, delete just it
        if (screen1Text[screen1Text.length - 1] === "-") {
            screen1Text = screen1Text.slice(0, screen1Text.length - 1);
            console.log("negative sign delete")
            screen2Text = ""

        } else {
            let lastNumber = numbersOnly[numbersOnly.length - 1]
            
            //console.log("before " + screen1Text + "_")

            // if operator used last delete last 3 characters
            if (screen1Text[screen1Text.length - 3] == " " && screen1Text[screen1Text.length - 1] == " ") {
                screen1Text = screen1Text = screen1Text.slice(0, screen1Text.length - 3);
                screen2Text = lastNumber
            } else {
                screen1Text = screen1Text.slice(0, screen1Text.length - 1);
                lastNumber = lastNumber.slice(0, lastNumber.length - 1);
                console.log(lastNumber)
                screen2Text = lastNumber;
            }

            //console.log("after " + screen1Text + "_")
        }
        

    // Handle AC button
    } else if (text === "AC") {
        screen1Text = "";
        screen2Text = "";
      
    // Handle decimal, allow only one per number
    } else if (text === ".") {
        // Split string on spaces for better control over screen display
        let splitText = screen1Text.split(" ");

        // If their is not a decimal in the last number entered allow adding it
        if (splitText[splitText.length - 1].indexOf(text) === -1) {
            screen1Text += text;
            screen2Text += text;
        }

    // Handle subtract/negative
    } else if (text === " - ") {
        // Allow negative numbers at start
        if (screen1Text === "") {
            screen1Text += "-";
            screen2Text += "-";

        // Allow negative numbers
        } else if (screen1Text[screen1Text.length - 1] === " ") {
            screen1Text += "-";
            screen2Text += "-";

        // Disallow more than two negative in a row
        } else if (splitText[splitText.length - 1] === "-" && splitText[splitText.length - 1] === "-") {
            // Do nothing
        
        // Use as operator
        } else if (screen2Text !== "-") {
            screen1Text += text;
            screen2Text = "";
        }
    
    // Handle other operators
    } else if (operators.indexOf(text) !== -1) {
        // If no text on screen don't allow operator
        if (screen1Text === "") {
            // Do nothing

        // If last input was operator don't allow another
        } else if (screen1Text[screen1Text.length - 1] === " ") {
            // Do nothing

        // If last input was negative for number
        } else if (screen1Text[screen1Text.length - 1] === "-") {
            // Do nothing

        // If last 

        } else {
            screen1Text += text;
            screen2Text = "";
        }

    // Handle equals button
    } else if (text === " = ") {
        // Don't allow as first text on screen
        if (screen1Text === "") {
            // Do nothing

        // Don't allow two equals sign in a row
        } else if (screen1Text[screen1Text.length - 1] === " ") {
            // Do nothing

        // Do nothing if last input was a negative sign
        } else if (screen1Text[screen1Text.length - 1] === "-") {
            // Do nothing

        // Don't allow after opening bracket
        } else if (screen1Text[screen1Text.length - 1] === "(") {
            // Do nothing
        } else {
            screen1Text += text;

            // Perform calculation on screen1Text
            screen2Text = 123456789;
        }
    
    } else if (text === "(") {
        screen1Text += text;
        screen2Text += text;
    
    // Disallow closing bracket if no corresponding opening bracket
    } else if (text === ")") {
        let openCount = 0;
        let closedCount = 0;
        for (let i = 0; i < screen1Text.length; i++) {
            if (screen1Text[i] === "(") {
                openCount += 1;
            }
            if (screen1Text[i] === ")") {
                closedCount += 1;
            }
        }
        if (openCount > closedCount) {
            screen1Text += text;
            screen2Text += text;
        }

        // Don't allow if no opening bracket
    
        
    // Handles all other keys, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9
    } else {
        screen1Text += text;
        screen2Text += text;
    }
    
    // Display text on the screens
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
