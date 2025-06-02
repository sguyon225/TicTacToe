var turn = "X";     //Who's turn is it
const x = 5;        //How many "X" imgs in folder
const o = 5;        //How many "O" imgs in folder
const lines = 5;    //How many lines in board folder
var xs = 0;         //How many Xs on board
var os = 0;         //How many Os on board
var xTiles = []     //Places of Xs
var oTiles = []     //Places of Os
let winCons = [
    ["1","2","3"],["4","5","6"],["7","8","9"],["1","4","7"],
    ["2","5","8"],["3","6","9"],["1","5","9"],["3","5","7"]] //Win Conditions

function capture(button){
    let num;
    
    if(turn == "X"){
        num=Math.floor((Math.random()*100)) % x;
        xTiles.push(button.getAttribute("id"));
        xs++;
    }else{
        num=Math.floor((Math.random()*100)) % x;
        oTiles.push(button.getAttribute("id"));
        os++;
    }
    let img = document.createElement("img");
    img.setAttribute("src", turn+"/"+num+".png");
    img.setAttribute("alt", turn);
    img.setAttribute("draggable", false);
    button.appendChild(img);
    button.setAttribute("disabled", true)

    if(xs>2){
        check(xTiles)
    }else if(os>2){
        check(oTiles)
    }

    switch(turn){
        case "X":
            turn = "O";
            break;
        case "O":
            turn = "X";
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

function win(){
    let buttons = document.querySelectorAll(".box");
    for(let button of buttons){
        button.setAttribute("disabled", true);
    }
    fireworks()
    document.getElementById("win").classList.add("show");
    document.getElementById("win").style.pointerEvents = "all";
}

function makeBoard(){
    let lineFiles = [];
    for(let i = 0; i<4; i++){
        let num = Math.floor((Math.random()*100)) % lines;
        lineFiles.push("board/"+num+".png");
    }

    let lineDivs = document.getElementById("lines").children;
    for(let i = 0; i<4; i++){
        let img = document.createElement("img");
        img.setAttribute("src", lineFiles[i]);
        img.setAttribute("alt", "line of the tic tac toe board");
        img.setAttribute("draggable", false);
        lineDivs[i].appendChild(img);
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
            origin: { x: randomInRange(0.1, 0.9), y: Math.random() - 0.2 },
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