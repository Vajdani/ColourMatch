const colour1 = document.getElementById("colour1")
const colour2 = document.getElementById("colour2")

var correctColour
var guessInterval

var colourValues = [
    "rgb(255, 0, 0)",
    "rgb(0, 255, 0)",
    "rgb(0, 0, 250)",
    "rgb(255, 250, 0)",
    "rgb(0, 250, 250)",
    "rgb(255, 0, 250)",
    "rgb(0, 0, 0)",
    "rgb(225, 225, 225)",
]
var colourNames = [
    "red",
    "green",
    "blue",
    "yellow",
    "cyan",
    "pink",
    "black",
    "white"
]

var valueToName = {}
var nameToValue = {}
for (let index = 0; index < colourValues.length; index++) {
    let value = colourValues[index]
    let name = colourNames[index]

    valueToName[value] = name
    nameToValue[name] = value
}


function randomIntFromInterval(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

function RandomColour() {
    return colourValues[randomIntFromInterval(0, colourValues.length - 1)] 
}

function RandomName() {
    return colourNames[randomIntFromInterval(0, colourNames.length - 1)] 
}

function Select() {
    correctColour = RandomColour()
    colour2.innerText = RandomName()
    colour2.style.color = correctColour

    if (Math.random() < 0.5) {
        colour1.innerText = valueToName[correctColour]
    }
    else {
        colour1.innerText = RandomName()
    }
}

function Guess(match, key) {
    if (guessInterval != null) { return }

    let correctGuess = (correctColour == nameToValue[colour1.innerText]) == match
    let element = document.getElementById(key)
    if (correctGuess) {
        element.style = "box-shadow: inset 5px 5px green, inset -5px -5px green"
    }
    else {
        element.style = "box-shadow: inset 5px 5px red, inset -5px -5px red"
    }
    
    guessInterval = setInterval(() => {
        element.style = ""
        Select()

        clearInterval(guessInterval)
        guessInterval = null
    }, 250);
}

window.addEventListener("keydown", (e) => {
    if (e.code == "ArrowRight") {
        Guess(true, "arrowRight")
    }
    else if (e.code == "ArrowLeft") {
        Guess(false, "arrowLeft")
    }
})



Select()