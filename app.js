const Piece = require('./Piece.js')
const Util = require('./Util.js')

performance.mark("Start");
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
aPiece.push(new Piece(2344));
aPiece.push(new Piece(3154));
aPiece.push(new Piece(1325));
aPiece.push(new Piece(3632));
aPiece.push(new Piece(4426));
aPiece.push(new Piece(5452));
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

//Alle möglichen Varianten aller Teile in der Liste ablegen
aPiece = Util.generatePieceArray(aPiece);

console.log("Startup finished, here goes the puzzle solving miracle...");

//Start Logik
var aAllSolution = [];
var aSolution = [];

//Nächstes Teil suchen
Util.findNextPiece(aSolution, aPiece, aAllSolution);
console.log(`Anzahl Ergebnisse: ${aAllSolution.length}`);
//Ende Logik



performance.mark("Ende");
const oMeasure = performance.measure("Dauer", "Start", "Ende");
console.log(`Already finished in ${oMeasure.duration} miliseconds`);

performance.clearMarks();
performance.clearMeasures();   


