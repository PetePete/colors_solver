const Util = require('./util.js')

class Piece {

    constructor(iColor, sId, sOriginalColor) {
        this._originalColor = iColor;
        this._color = iColor;

        if (!sId) {
            Util.idCounter++;
            this._sId = Util.idCounter;
        }
        else {
            this._sId = sId;
        }

        if (!sOriginalColor) {
            this._originalColor = iColor;
        }
        else {
            this._originalColor = sOriginalColor;
        }
    }

    rotate() {
        let oNew = new Piece(this._color, this._sId, this._originalColor);
        let sColor = oNew._color;
        sColor = sColor[1].concat(sColor[2], sColor[3], sColor[0]);
        oNew._color = sColor;
        return oNew;
    }

    print() {
        return this._color;
    }

}

module.exports =  Piece