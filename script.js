var turn = "X";     //Who's turn is it
const x = 5;        //How many "X" imgs in folder
const o = 5;        //How many "O" imgs in folder
const lines = 5;    //How many lines in board folder
var Xs = 0;         //How many Xs on board
var Os = 0;         //How many Os on board
var xPos = []       //Places of Xs
var oPos = []       //Places of Os

function capture(button){
    let num;
    
    if(turn == "x"){
        num=Math.floor((Math.random()*100)) % x;
        Xs++;
    }else{
        num=Math.floor((Math.random()*100)) % x;
        Os++;
    }
    let img = document.createElement("img");
    img.setAttribute("src", turn+"/"+num+".png");
    button.appendChild(img);
    button.setAttribute("disabled", true)

    switch(turn){
        case "X":
            turn = "O";
            break;
        case "O":
            turn = "X";
            break;
    }

    if(Xs>2){
        check(xPos)
    }
}

function makeBoard(){
    let lineFiles = [];
    for(let i = 0; i<4; i++){
        let num = Math.floor((Math.random()*100)) % lines;
        lineFiles.push("board/"+num+".png");
        console.log(num)
    }

    let lineDivs = document.getElementById("lines").children;
    for(let i = 0; i<4; i++){
        let img = document.createElement("img");
        img.setAttribute("src", lineFiles[i]);
        lineDivs[i].appendChild(img);
    }
}

document.addEventListener("DOMContentLoaded", function() {
    makeBoard()
});