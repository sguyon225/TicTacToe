var mode = "solo"     //1 or 2 player mode
var turn = "X";     //Who's turn is it
const vars = 5;     //How many imgs of each letter in folders
var xs = 0;         //How many Xs on board
var os = 0;         //How many Os on board
var xTiles = []     //Places of Xs
var oTiles = []     //Places of Os
let winCons = [
    ["1","2","3"],["4","5","6"],["7","8","9"],["1","4","7"],
    ["2","5","8"],["3","6","9"],["1","5","9"],["3","5","7"]] //Win Conditions

function capture(space){
    if(turn == "X"){
        xTiles.push(space.getAttribute("id"));
        xs++;
    }else{
        oTiles.push(space.getAttribute("id"));
        os++;
    }
    let img = getLetter(turn)
    space.appendChild(img);
    space.setAttribute("disabled", true)

    if(turn == "X" && xs>2){
        check(xTiles);
    }
    if(turn == "O" && os>2){
        check(oTiles);
    }else if(xs+os == 9){
        tie();
    }

    switch(turn){
        case "X":
            turn = "O";
            if(mode == "vs"){
                document.documentElement.style.setProperty("--current-img", `url("letters/O/0.png")`)
                break;
            }else{
                takeTurn();
            }
        case "O":
            turn = "X";
            if(mode == "vs"){
                document.documentElement.style.setProperty("--current-img", `url("letters/X/0.png")`)
            }
            break;
    }
}

function check(tiles){
    for(let con of winCons){
        let row = 0;
        for(let digit of con){
            if (tiles.includes(digit)){
                row++;
            }
        }
        if(row == 3){
            win();
            break
        }
    }
}

function endGame(){
    let buttons = document.querySelectorAll(".box");
    for(let button of buttons){
        button.setAttribute("disabled", true);
    }

    document.getElementById("switch").style.pointerEvents = "none"

    document.getElementById("menu").classList.add("show");
    document.getElementById("menu").style.pointerEvents = "all";

    playAgain();
}

function tie(){
    endGame();

    let message = document.getElementById("result`");
    let tie = writeMessage("TIE");

    message.removeChild(message.firstChild);
    message.appendChild(tie);
}

function win(){
    endGame()
    fireworks()
    victoryMessage();
}

//Temporary until I revamp the letters
function victoryMessage(){
    let message = document.getElementById("result");
    let wins = writeMessage(turn+" WINS!")

    message.removeChild(message.firstChild);
    message.appendChild(wins);
}

function getLetter(letter){
    if(letter == " "){
        num = 0;
    }else{
        num=Math.floor((Math.random()*100)) % vars;
    }
    let alt = letter;
    if(letter == "?"){
        letter = "qu";
    } 
    if(letter == " "){
        letter = "_"
    }

    let img = document.createElement("img");
    img.setAttribute("src", "letters/"+letter+"/"+num+".png");
    img.setAttribute("alt", alt);
    img.setAttribute("draggable", false);
    img.classList.add("letter")

    return img;
}

function writeMessage(string){
    let letters = string.split("");
    let output = document.createElement("p");
    output.classList.add("message");

    for (let letter of letters){
        let img;
        img = getLetter(letter)
        output.appendChild(img)
    }

    return output;
}

function playAgain(){
    let button = document.getElementById("again")
    let again = writeMessage("PLAY AGAIN?")

    button.appendChild(again);
}

function makeBoard(){
    let lines = document.getElementById("lines").children;
    for(let i = 0; i<4; i++){
        let img = getLetter("line");
        lines[i].appendChild(img);
    }
}

function switchMode(){
    if(document.getElementById("mode").getAttribute("checked")){
        document.getElementById("mode").removeAttribute("checked");
        mode = "solo";
    }else{
        document.getElementById("mode").setAttribute("checked", true);
        mode = "vs";
    }

    let buttons = document.querySelectorAll(".box");
    for(let button of buttons){
        if(button.hasChildNodes() == true){
            button.removeChild(button.firstChild);
        }
        button.removeAttribute("disabled");
    }
    xs = 0;
    os = 0;
    xTiles = []
    oTiles = []
    
    localStorage.setItem("gameMode", mode);
}

document.addEventListener("DOMContentLoaded", function() {
    if(localStorage.getItem("gameMode") == "vs"){
        document.getElementById("mode").setAttribute("checked", true);
    }else{
        document.getElementById("mode").removeAttribute("checked");
    }
    makeBoard()
});

// -----------------------------------------------------------------------------------------------------------
// Fireworks - https://confetti.js.org/more.html

function fireworks(){
    const duration = 60 * 1000,
    animationEnd = Date.now() + duration,
    defaults = { startVelocity: 60, spread: 450, ticks: 30, zIndex: 0, gravity: 5 };

    function randomInRange(min, max) {
    return Math.random() * (max - min) + min;
    }


    confetti(
            Object.assign({}, defaults, {
            particleCount: 250,
            origin: { x: 0.5, y: Math.random() - 0.2 },
            })
        );

    const interval = setInterval(function() {
        const timeLeft = animationEnd - Date.now();

        if (timeLeft <= 0) {
            return clearInterval(interval);
        }

        const particleCount = 300 * (timeLeft / duration);

        confetti(
            Object.assign({}, defaults, {
            particleCount,
            origin: { x: randomInRange(0.1, 0.9), y: Math.random() - 0.2 },
            })
        );
        confetti(
            Object.assign({}, defaults, {
            particleCount,
            origin: { x: randomInRange(0.1, 0.9), y: Math.random() - 0.2 },
            })
        );
        confetti(
            Object.assign({}, defaults, {
            particleCount,
            origin: { x: randomInRange(0.1, 0.9), y: Math.random() - 0.2 },
            })
        );
        confetti(
            Object.assign({}, defaults, {
            particleCount,
            origin: { x: randomInRange(0.1, 0.9), y: Math.random() - 0.2 },
            })
        );
        confetti(
            Object.assign({}, defaults, {
            particleCount,
            origin: { x: randomInRange(0.1, 0.9), y: Math.random() - 0.2 },
            })
        );
    }, 2000);
}