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
        if (text === " = ") {
            // Do nothing 
        
        // If button is other operator use previous answer as first number
        } else if (operators.indexOf(text) !== -1) {
            screen1Text = screen2Text + text;
            screen2Text = ""
        
        // If using negative after answer
        } else if (text === " - " && screen2Text !== "") {
            screen1Text = screen2Text;
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
        const unwanted = ["-", "+", "x", "÷", "", "="];
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

            // Check for brackets and perform operations inside each bracket
            let calculationText = checkBrackets(screen1Text);

            // Perform calculation on screen1Text
            //console.log(screen1Text);
            if (calculationText === "Bracket Error") {
                screen2Text = "Bracket Error";
            } else {
                screen2Text = calculateResult(calculationText);
            }
            
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
        
    // Handles all other keys, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9
    } else {
        screen1Text += text;
        screen2Text += text;
    }
    
    // Display text on the screens
    screen1.textContent = screen1Text;
    screen2.textContent = screen2Text;
}

// Function to check if brackets input, then calculate inside them
function checkBrackets(text) {
    console.log("brackets")
    console.log(text)

    let i = 0;
    let lastOpening = -1;
    let nextClosing = -1;

    // Error if brackets back to back anywhere
    for (let k = 0; k < text.length; k++) {
        if (text.slice(k, k + 2) === ")(") {
            text = "Bracket Error";
            i = 1;
        }
    }

    while (i === 0) {
        i = 1;
        // Get location of last opening bracket
        for (let j = 0; j < text.length; j++) {
            if (text[j] === "(") {
                lastOpening = j;
                i = 0;
            }
        }
    
        
        // Get location of closing bracket following opening
        for (let j = lastOpening; j < text.length; j++) {
            if (text[j] === ")") {
                nextClosing = j;
                break;
            }
        }

        

        // If both brackets found, replace with calculated results
        if (lastOpening !== -1 && nextClosing !== -1) {
            let insideBracket = text.slice(lastOpening + 1, nextClosing)
            console.log(insideBracket)
    
            const result = calculateResult(insideBracket);
            text = text.slice(0, lastOpening) + result + text.slice(nextClosing + 1, text.length);
            
            // If brackets have nothing between them
            if (nextClosing - 1 === lastOpening) {
                console.log("blank brackets")
                text = "Bracket Error";
            } 
            console.log("calc return")
            console.log(text)



            // Reset bracket locations
            lastOpening = -1;
            nextClosing = -1;

        } else if (lastOpening !== -1) {
            text = "Bracket Error";
        }
        console.log("to infinity")
    }

    console.log("bracket return")
    console.log(text)
    return text;
    
}

function add(a, b) {
    console.log("add");
    //console.log(a)
    //console.log(b)
    return Number(a) + Number(b);
}

function subtract(a, b) {
    return Number(a) - Number(b);
}

function multiply(a, b) {
    console.log("multiply")
    return Number(a) * Number(b);
}

function divide(a, b) {
    return Number(a) / Number(b);
}

function calculateResult(text) {
    //console.log("_" + text +"_");
    let textArray = text.split(' ');
    //console.log(textArray);

    let i = 0;
    // Multiplication and division first, start over when calculated
    while (i < textArray.length) {
        if (textArray[i] === "x") {
            const product = multiply(textArray[i - 1], textArray[i + 1])
            textArray.splice(i - 1, 3, product)
            i -= 1;
        } else if (textArray[i] === "÷") {
            const quotient = divide(textArray[i - 1], textArray[i + 1])
            textArray.splice(i - 1, 3, quotient)
            i -= 1;
        }
        i++;
    }

    i = 0;
    // Addition and subtraction after
    while (i < textArray.length) {
        if (textArray[i] === "+") {
            const sum = add(textArray[i - 1], textArray[i + 1])
            textArray.splice(i - 1, 3, sum)
            i -= 1;
        } else if (textArray[i] === "-") {
            const difference = subtract(textArray[i - 1], textArray[i + 1])
            textArray.splice(i - 1, 3, difference)
            i -= 1;
        }

        i++;
    }
    // Convert to exponential form if too large to display or too small
    if (textArray[0] > 10 ** 12 || textArray[0] < -(10 ** 12)) {
        return (1 * textArray[0]).toPrecision(4);
    } else if (textArray[0] < 10 ** -12 && textArray[0] > -(10 ** -12)) {
        return (1 * textArray[0]).toPrecision(3);
    }
    return Math.round((Number(textArray[0]) + 0.00001) * 1000) / 1000;
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
                // Keeps button held down if key held
                button.classList.add("button-after-keyboard")
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
                button.classList.remove("button-after-keyboard")
            } 
        });
    }

})
