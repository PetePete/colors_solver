const Piece = require("./Piece");

class Util {

    static iMaxPieces = 0;
    static  iOriginalPieces = this.iMaxPieces / 4;
    static iRowSize = Math.sqrt(this.iOriginalPieces);
    static idCounter = 0;

    constructor() {
        if (this instanceof Util) {
            throw Error('A static class cannot be instantiated.');
        }
    }

    static setMetadata(maxPieces) {
        this.iMaxPieces = maxPieces;
        this.iOriginalPieces = this.iMaxPieces / 4;
        this.iRowSize = Math.sqrt(this.iOriginalPieces);
    
    }

    static getColorName(iStart, sColor, iEnd) {
        let sColorName;
        switch (sColor) {
            case "1":
                sColorName = "Gelb";
                break;
            case "2":
                sColorName = "Orange";
                break;
            case "3":
                sColorName = "Rot";
                break;
            case "4":
                sColorName = "Grün";
                break;
            case "5":
                sColorName = "Blau";
                break;
            case "6":
                sColorName = "Braun";
                break;
        }

        for (let i = 0; i < iStart; i++) {
            sColorName = " " + sColorName;
        }
        for (let i = 0; i < iEnd; i++) {
            sColorName = sColorName + " ";
        }
        return sColorName;
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
            let oPiece2 = oPiece.rotate();
            let oPiece3 = oPiece2.rotate();
            let oPiece4 = oPiece3.rotate();

            _aPiece.push(oPiece);
            _aPiece.push(oPiece2);
            _aPiece.push(oPiece3);
            _aPiece.push(oPiece4);
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
        if (sColorCheck[0] === sColorCurrent[3] && sColorCheck[1] === sColorCurrent[2]) {
            return true;
        }

        return false;
    }

    static findNextPiece(aCurrentSolution, aAvailablePieces, aAllSolution, iDepth) {
        let iNewLineStep = this.iOriginalPieces / this.iRowSize;
        var aPossibleMatches = [];
        iDepth++;

        //Lösung gefunden
        if (aCurrentSolution.length === this.iOriginalPieces) {
            // console.log("Lösung gefunden:");
            // console.table(aCurrentSolution);
            aAllSolution.push(aCurrentSolution);
            return;
        }
        //Start ohne vorherige Teile
        else if (aCurrentSolution.length === 0) {

            aPossibleMatches = aAvailablePieces;
        }
        else {
            //Wenn erste Zeile, nur Links schauen
            var iNewIndex = aCurrentSolution.length; //= - 1 für aktuelle Position +1 für neue Position vom zu suchenden Teil, daher belassen;
            var iCurrentPieceIndex = aCurrentSolution.length - 1;
            if (iNewIndex <= this.iRowSize - 1) {
                aAvailablePieces.forEach(oAvailablePiece => {
                    if (this.compareLeft(aCurrentSolution[iCurrentPieceIndex], oAvailablePiece)) {
                        //console.log(`Passendes Teil zu ${aCurrentSolution[iCurrentPieceIndex].print()} gefunden: ${oAvailablePiece.print()} (compareLeft)`);
                        aPossibleMatches.push(oAvailablePiece);
                    }
                });
                //aAvailablePieces = this.cleanupAvailablePieces(aAvailablePieces, aPossibleMatches);
            }
            //Wenn erste Reihe, nur oben schauen
            //  0  1  2  3
            //  4  5  6  7
            //  8  9 10 11
            // 12 13 14 15

            // 0 1
            // 2 3

            // => Index für oben prüfen = letztes Stück - 4

            //else if (iNewIndex === 4 || iNewIndex === 8 || iNewIndex === 12) {
            else if (iNewIndex % iNewLineStep === 0) {
                aAvailablePieces.forEach(oAvailablePiece => {
                    if (this.compareUp(aCurrentSolution[iNewIndex - this.iRowSize], oAvailablePiece)) {
                        //console.log(`Passendes Teil zu ${aCurrentSolution[iNewIndex - 4].print()} gefunden: ${oAvailablePiece.print()} (compareUp)`);
                        aPossibleMatches.push(oAvailablePiece);
                    }
                });
                //aAvailablePieces = this.cleanupAvailablePieces(aAvailablePieces, aPossibleMatches);
            }
            //Sonst links und oben schauen
            else {
                aAvailablePieces.forEach(oAvailablePiece => {
                    if (this.compareLeft(aCurrentSolution[iCurrentPieceIndex], oAvailablePiece) &&
                        this.compareUp(aCurrentSolution[iNewIndex - this.iRowSize], oAvailablePiece)) {
                        //console.log(`Passendes Teil zu ${aCurrentSolution[iCurrentPieceIndex].print()} und ${aCurrentSolution[iNewIndex - 4].print()} gefunden: ${oAvailablePiece.print()} (compareLeft und compareUp)`);
                        aPossibleMatches.push(oAvailablePiece);
                    }
                });
                //aAvailablePieces = this.cleanupAvailablePieces(aAvailablePieces, aPossibleMatches);
            }
        }

        aPossibleMatches.forEach(oPossibleMatch => {
            //Neue Rekursion mit kopierten Zuständen
            let aNewSolution = [...aCurrentSolution];
            aNewSolution.push(oPossibleMatch);
            let aNewAvailablePiece = this.cleanupAvailablePieces(aAvailablePieces, aNewSolution);
            //Aktueller Stand ausgeben
            // if (iDepth > 1) {
            //     console.log(`Tiefe: ${iDepth}`);
            //     console.log("Aktuelle Lösung:");
            //     console.table(aNewSolution);
            //     console.log("Verfügbare Teile:");
            //     console.table(aNewAvailablePiece);
            // }

            this.findNextPiece(aNewSolution, aNewAvailablePiece, aAllSolution, iDepth);
        });

    }

    static removeElements(arr, element) {
        var index = arr.indexOf(element);
        while (index > -1) {
            arr.splice(index, 1);
            index = arr.indexOf(element);
        }
    }


    static cleanupAvailablePieces(aAvailablePieces, aSolution) {
        for (var i=0; i<aSolution.length; i++) {
             this.removeElements(aAvailablePieces, aSolution[i]);
        }
        return aAvailablePieces;
    }
}

module.exports = Util