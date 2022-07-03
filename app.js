
const Piece = require('./Piece.js')
const Util = require('./Util.js')


console.log("Dear spectators, the color solving system is booting up, stay tuned...");

const COLORS = {
    YELLOW: 1,
    ORANGE:2,
    RED: 3,
    GREEN: 4,
    BLUE: 5,
    BROWN: 6
};

//Alle Teile in willkürlicher Anordnung
var aPiece = [];
//Variante 1
aPiece.push(new Piece(2344));
aPiece.push(new Piece(3154));
aPiece.push(new Piece(1325));
aPiece.push(new Piece(3632));
aPiece.push(new Piece(4426));
aPiece.push(new Piece(4542));
aPiece.push(new Piece(5234));
aPiece.push(new Piece(2313));
aPiece.push(new Piece(6216));
aPiece.push(new Piece(2461));
aPiece.push(new Piece(4356));
aPiece.push(new Piece(3125));
aPiece.push(new Piece(6153));
aPiece.push(new Piece(1645));
aPiece.push(new Piece(6544));
aPiece.push(new Piece(5264));

//Variante 2
// aPiece.push(new Piece(4542));
// aPiece.push(new Piece(2131));
// aPiece.push(new Piece(6236));
// aPiece.push(new Piece(2463));
// aPiece.push(new Piece(1354));
// aPiece.push(new Piece(3125));
// aPiece.push(new Piece(1612));
// aPiece.push(new Piece(4426));
// aPiece.push(new Piece(2144));
// aPiece.push(new Piece(5214));
// aPiece.push(new Piece(3645));
// aPiece.push(new Piece(6544));
// aPiece.push(new Piece(4156));
// aPiece.push(new Piece(6351));
// aPiece.push(new Piece(5264));
// aPiece.push(new Piece(1325));


// aPiece.push(new Piece(4444));
// aPiece.push(new Piece(4354));
// aPiece.push(new Piece(3125));
// aPiece.push(new Piece(1612));
// aPiece.push(new Piece(4426));
// aPiece.push(new Piece(4542));
// aPiece.push(new Piece(5214));
// aPiece.push(new Piece(2131));
// aPiece.push(new Piece(6236));
// aPiece.push(new Piece(2463));
// aPiece.push(new Piece(4156));
// aPiece.push(new Piece(1325));
// aPiece.push(new Piece(6351));
// aPiece.push(new Piece(3645));
// aPiece.push(new Piece(6544));
// aPiece.push(new Piece(5264));


//Pädus Variante wo nicht tut:
// aPiece.push(new Piece(3333));
// aPiece.push(new Piece(3434));
// aPiece.push(new Piece(4242));
// aPiece.push(new Piece(2222));
// aPiece.push(new Piece(3332));
// aPiece.push(new Piece(3425));
// aPiece.push(new Piece(4252));
// aPiece.push(new Piece(2225));
// aPiece.push(new Piece(3231));
// aPiece.push(new Piece(2514));
// aPiece.push(new Piece(5244));
// aPiece.push(new Piece(2546));
// aPiece.push(new Piece(3134));
// aPiece.push(new Piece(1444));
// aPiece.push(new Piece(4444));
// aPiece.push(new Piece(4646));


// aPiece.push(new Piece(2344));
// aPiece.push(new Piece(3154));
// aPiece.push(new Piece(4426));
// aPiece.push(new Piece(4542));

//Alle möglichen Varianten aller Teile in der Liste ablegen
aPiece = Util.generatePieceArray(aPiece);
console.log("Startup finished, here goes the puzzle solving miracle...");

performance.mark("Start");
//Start Logik
var aAllSolution = [];
var aSolution = [];

//Nächstes Teil suchen
Util.findNextPiece(aSolution, aPiece, aAllSolution, 0);
performance.mark("Ende");
console.log(`Anzahl Ergebnisse: ${aAllSolution.length}`);


for(let i = 0; i < aAllSolution.length; i++) {
    let aSolution = aAllSolution[i];
    console.table(aSolution);
}
//console.table(aAllSolution);
//Ende Logik


const oMeasure = performance.measure("Dauer", "Start", "Ende");
console.log(`Already finished in ${oMeasure.duration} miliseconds`);

performance.clearMarks();
performance.clearMeasures();   


