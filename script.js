var turn = "X";     //Who's turn is it
const vars = 5;     //How many imgs of each letter in folders
var xs = 0;         //How many Xs on board
var os = 0;         //How many Os on board
var xTiles = []     //Places of Xs
var oTiles = []     //Places of Os
let winCons = [
    ["1","2","3"],["4","5","6"],["7","8","9"],["1","4","7"],
    ["2","5","8"],["3","6","9"],["1","5","9"],["3","5","7"]] //Win Conditions

function capture(button){    
    if(turn == "X"){
        xTiles.push(button.getAttribute("id"));
        xs++;
    }else{
        oTiles.push(button.getAttribute("id"));
        os++;
    }
    let img = getLetter(turn)
    button.appendChild(img);
    button.setAttribute("disabled", true)

    if(turn == "X" && xs>2){
        check(xTiles);
    }
    if(turn == "O" && os>2){
        check(oTiles);
    }else if(os == 4){
        tie();
    }

    switch(turn){
        case "X":
            turn = "O";
            document.documentElement.style.setProperty("--current-img", `url("letters/O/0.png")`)
            break;
        case "O":
            turn = "X";
            document.documentElement.style.setProperty("--current-img", `url("letters/X/0.png")`)
            break;
    }
}

function getLetter(letter){
    if(letter == "_"){
        num = 0;
    }else{
        num=Math.floor((Math.random()*100)) % vars;
    }

    let img = document.createElement("img");
    img.setAttribute("src", "letters/"+letter+"/"+num+".png");
    img.setAttribute("alt", letter);
    img.setAttribute("draggable", false);
    img.classList.add("letter")

    return img;
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
}

function tie(){
    endGame()
}

function win(){
    endGame()
    fireworks()
    document.getElementById("win").classList.add("show");
    document.getElementById("win").style.pointerEvents = "all";

    message();
    playAgain();
}

function message(){
    let message = document.getElementById("message");
    
    //Condense into For Loop later
    //helper function?
    let XO = getLetter(turn);
    let _ = getLetter("_")
    let W = getLetter("W");
    let I = getLetter("I");
    let N = getLetter("N");
    let S = getLetter("S");
    let E1 = getLetter("!");
    let E2 = getLetter("!");
    let E3 = getLetter("!");

    let E = document.createElement("p");
    E.appendChild(E1);
    E.appendChild(E2);
    E.appendChild(E3);
    E.classList.add("letter")

    let wins = document.createElement("p");

    wins.appendChild(XO);
    wins.appendChild(_);
    wins.appendChild(W);
    wins.appendChild(I);
    wins.appendChild(N);
    wins.appendChild(S);
    wins.appendChild(E);

    message.removeChild(message.firstChild);
    message.appendChild(wins);
}

function playAgain(){
    let button = document.getElementById("again")
    
    //For loop here
    let P = getLetter("P");
    let _ = getLetter("_");
    let A = getLetter("A");

    let again = document.createElement("p");

    again.appendChild(P);
    again.appendChild(_);
    again.appendChild(A);

    button.appendChild(again);
}

function makeBoard(){
    let lines = document.getElementById("lines").children;
    for(let i = 0; i<4; i++){
        let img = getLetter("line");
        lines[i].appendChild(img);
    }
}

document.addEventListener("DOMContentLoaded", function() {
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