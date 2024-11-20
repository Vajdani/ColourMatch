const colour1 = document.getElementById("colour1")
const colour2 = document.getElementById("colour2")
const time_div = document.getElementById("time")
const score_div = document.getElementById("score")
const mul_div = document.getElementById("mul")

var correctColour
var locked = false
var paused = false

var score = 0
var time = 0
var maxTime = 45
var timeInterval
var multiplier = 1
var multiplierProgression = 0
var maxMultiplierProgression = 4
var maxMultiplier = 10
var scoreBaseAmount = 50

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

    UpdateTimeOutput()
    score_div.innerText = "SCORE " + score

    let mul_text = ""
    if (multiplier < maxMultiplier) {
        mul_text = "●".repeat(multiplierProgression) + "○".repeat(maxMultiplierProgression - multiplierProgression)
    }
    else {
        mul_text = "MAX"
    }

    mul_div.innerText = mul_text + " x" + multiplier
}

function Guess(match, key) {
    if (locked || paused) { return }
    
    Start()

    let correctGuess = (correctColour == nameToValue[colour1.innerText]) == match
    let element = document.getElementById(key)
    if (correctGuess) {
        element.style = "box-shadow: inset 5px 5px green, inset -5px -5px green"

        score += scoreBaseAmount * multiplier

        if (multiplier < maxMultiplier) {
            multiplierProgression++
            if (multiplierProgression >= maxMultiplierProgression) {
                multiplier++
                multiplierProgression = 0
            }
        }
    }
    else {
        element.style = "box-shadow: inset 5px 5px red, inset -5px -5px red"
        multiplier = 1
        multiplierProgression = 0
    }
    
    locked = true
    setTimeout(() => {
        element.style = ""
        Select()
        locked = false
    }, 250);
}

function Start() {
    if (timeInterval != null) { return }

    time = maxTime
    UpdateTimeOutput()
    timeInterval = setInterval(() => {
        if (paused) { return }

        time--
        UpdateTimeOutput()
        if (time <= 0) {
            clearInterval(timeInterval)
            timeInterval = null

            window.alert("Game over! Final score: " + score)

            score = 0
            multiplier = 1
            multiplierProgression = 0

            Select()
        }
    }, 1000);
}

function UpdateTimeOutput() {
    if (paused) {
        time_div.innerHTML = "<span style='text-decoration: line-through'>TIME " + time + "s</span> (PAUSED)"
    }
    else {
        time_div.innerHTML = "TIME " + time + "s"
    }
}

function Pause() {
    paused = !paused
    UpdateTimeOutput()
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