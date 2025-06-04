var running = true; //Is the game still running
var mode = "solo";  //1 or 2 player mode
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
    }
    if(xs+os == 9 && running == true){
        tie();
    }

    if(running == true){
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
    running = false;

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
    results("  TIE  ")
}

function win(){
    endGame()
    if(mode == "vs" || turn == "X"){
        fireworks()
    } 
    results(turn+" WINS!")
}

function results(result){
    let message = document.getElementById("result");
    let resultText = writeMessage(result)

    message.removeChild(message.firstChild);
    message.appendChild(resultText);
}

function getLetter(letter, returnElement=true){
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

    if(returnElement == true){
        let img = document.createElement("img");
        img.setAttribute("src", "letters/"+letter+"/"+num+".png");
        img.setAttribute("alt", alt);
        img.setAttribute("draggable", false);
        img.classList.add("letter")
        let div = document.createElement("div");
        div.appendChild(img);

        return div;
    }
    return "letters/"+letter+"/"+num+".png";
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

    let p1 = writeMessage("1 PLAYER");
    let p2 = writeMessage("2 PLAYER");
    document.getElementById("p1").appendChild(p1);
    document.getElementById("p2").appendChild(p2);

    let toggle = getLetter("toggle", false)
    let ball = getLetter("ball", false)
    let slider = document.getElementById("slider");
    slider.style.backgroundImage = toggle;
    window.getComputedStyle(slider, ball);

    let toggleUrl = `url('`+toggle+`')`;
    let ballUrl = `url('`+ball+`')`;

    slider.style.setProperty('--toggle-img', toggleUrl);
    slider.style.setProperty('--ball-img', ballUrl);
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
    xTiles = [];
    oTiles = [];
    turn = "X";
    document.documentElement.style.setProperty("--current-img", `url("letters/X/0.png")`)
    
    localStorage.setItem("gameMode", mode);
}

document.addEventListener("DOMContentLoaded", function() {
    if(localStorage.getItem("gameMode") == "vs"){
        document.getElementById("mode").setAttribute("checked", true);
        mode = "vs";
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
            origin: { x: 0.5, y: 0.2},
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
        // confetti(
        //     Object.assign({}, defaults, {
        //     particleCount,
        //     origin: { x: randomInRange(0.1, 0.9), y: Math.random() - 0.2 },
        //     })
        // );
        // confetti(
        //     Object.assign({}, defaults, {
        //     particleCount,
        //     origin: { x: randomInRange(0.1, 0.9), y: Math.random() - 0.2 },
        //     })
        // );
        // confetti(
        //     Object.assign({}, defaults, {
        //     particleCount,
        //     origin: { x: randomInRange(0.1, 0.9), y: Math.random() - 0.2 },
        //     })
        // );
        // confetti(
        //     Object.assign({}, defaults, {
        //     particleCount,
        //     origin: { x: randomInRange(0.1, 0.9), y: Math.random() - 0.2 },
        //     })
        // );
    }, 250);
}