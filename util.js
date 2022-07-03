class Util {
    constructor() {
        if (this instanceof Util) {
            throw Error('A static class cannot be instantiated.');
        }
    }

    static createGuid() {
        function S4() {
            return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
        }
        return (S4() + S4() + "-" + S4() + "-4" + S4().substr(0, 3) + "-" + S4() + "-" + S4() + S4() + S4()).toLowerCase();
    }

    static generatePieceArray(aPiece) {
        var _aPiece = [];

        aPiece.forEach(oPiece => {
            _aPiece.push(oPiece);
            _aPiece.push(oPiece.rotate());
            _aPiece.push(oPiece.rotate());
            _aPiece.push(oPiece.rotate());
        });

        return _aPiece;
    }

    static compareLeft(oCurrentPiece, oCheckPiece) {
        //Gleiches Teil aber rotiert, daher ignorieren
        if (oCurrentPiece._sGuid === oCheckPiece._sGuid) {
            return false;
        }

        let sColorCurrent = oCurrentPiece._color.toString();
        let sColorCheck = oCheckPiece._color.toString();

        //Index 1 und Index 2 = Rechte Seite, Index 0 und Index 3 = Linke Seite
        if (sColorCheck[0] === sColorCurrent[1] && sColorCheck[3] === sColorCurrent[2]) {
            return true;
        }

        return false;
    }

    static compareUp(oCurrentPiece, oCheckPiece) {
        //Gleiches Teil aber rotiert, daher ignorieren
        if (oCurrentPiece._sGuid === oCheckPiece._sGuid) {
            return false;
        }

        let sColorCurrent = oCurrentPiece._color.toString();
        let sColorCheck = oCheckPiece._color.toString();

        //Index 0 und Index 1 = Obere Seite, Index 2 und Index 3 = Untere Seite
        if (sColorCheck[0] === sColorCurrent[2] && sColorCheck[1] === sColorCurrent[3]) {
            return true;
        }

        return false;
    }

    static findNextPiece(aCurrentSolution, aAvailablePieces, aAllSolution) {
        //Lösung gefunden
        if (aCurrentSolution.length === 16) {
            aAllSolution.push(aCurrentSolution);
            return;
        }
        //Start ohne vorherige Teile
        else if(aCurrentSolution.length === 0) {
            aCurrentSolution.push(aAvailablePieces.shift());
        }

        let aPossibleMatches = [];
        //Wenn erste Zeile, nur Links schauen
        var iNewIndex = aCurrentSolution.length; //= - 1 für aktuelle Position +1 für neue Position vom zu suchenden Teil, daher belassen;
        var iCurrentPieceIndex =  aCurrentSolution.length - 1;
        if (iNewIndex <= 3) {
            aAvailablePieces.forEach(oAvailablePiece => {
                if (this.compareLeft(aCurrentSolution[iCurrentPieceIndex], oAvailablePiece)) {
                    console.log(`Passendes Teil zu ${aCurrentSolution[iCurrentPieceIndex]._color} gefunden: ${oAvailablePiece._color}`);
                    aPossibleMatches.push(oAvailablePiece);
                }
            });
        }
        //Wenn erste Reihe, nur oben schauen
        //  0  1  2  3
        //  4  5  6  7
        //  8  9 10 11
        // 12 13 14 15

        // => Index für oben prüfen = letztes Stück - 4
        else if (iIndex === 4 || iIndex === 8 || iIndex === 12) {
            aAvailablePieces.forEach(oAvailablePiece => {
                if (this.compareUp(aCurrentSolution[iIndex - 4], oAvailablePiece)) {
                    console.log(`Passendes Teil zu ${aCurrentSolution[iCurrentPieceIndex]._color} gefunden: ${oAvailablePiece._color}`);
                    aPossibleMatches.push(oAvailablePiece);
                }
            });
        }
        //Sonst links und oben schauen
        else {
            aAvailablePieces.forEach(oAvailablePiece => {
                if (this.compareLeft(aCurrentSolution[iCurrentPieceIndex], oAvailablePiece) &&
                    this.compareUp(aCurrentSolution[iIndex - 4], oAvailablePiece)) {
                    console.log(`Passendes Teil zu ${aCurrentSolution[iCurrentPieceIndex]._color} gefunden: ${oAvailablePiece._color}`);
                    aPossibleMatches.push(oAvailablePiece);
                }
            });
        }

        //Aufräumen, d.h.alle Teile in aPossibleMatches aus aAvailablePieces entfernen
        aPossibleMatches.forEach(oPossiblePiece => {
            aAvailablePieces.forEach((oAvailablePiece, iIndex) => {
                aAvailablePieces.splice(iIndex, 1);
            });
        });

        aPossibleMatches.forEach(oPossibleMatch => {
            //Neue Rekursion mit kopierten Zuständen
            let aNewSolution = [...aCurrentSolution];
            let aNewAvailablePieces = [...aAvailablePieces];
            this.findNextPiece(aNewSolution, aNewAvailablePieces);
        });
    }
}

module.exports = Util