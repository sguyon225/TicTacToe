function takeTurn() {
    let choice = decide();

    capture(document.getElementById("" + choice[0]));
}
function decide() {
    let close = [];

    for (let i = 0; i < winCons.length; i++) {
        let xCount = 0;
        let oCount = 0;
        let empty = [];

        for (let digit of winCons[i]) {
            if (xTiles.includes(digit)) {
                xCount++;
            } else if (oTiles.includes(digit)) {
                oCount++;
            } else {
                empty.push(digit);
            }
        }

        if (oCount === 2 && empty.length === 1) {
            return empty;
        }

        if (xCount === 2 && empty.length === 1) {
            close.push(empty[0]);
        }
    }

    if (close.length == 0) {
        while(true){
            let square = ""+((Math.floor(Math.random()*100) % 9) + 1);
            console.log(square, xTiles, oTiles)

            if(xTiles.includes(square) || oTiles.includes(square)){}
            else{
                console.log(square)
                close.push(square);
                break;
            }
        }
    }

    return close;
}
