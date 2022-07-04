const Util = require('./Util.js')

class Piece {

    constructor(iColor, sGuid, sOriginalColor) {
        this._originalColor = iColor;
        this._color = iColor;

        if (!sGuid) {
            Util.idCounter++;
            this._sGuid = Util.idCounter;
        }
        else {
            this._sGuid = sGuid;
        }

        if (!sOriginalColor) {
            this._originalColor = iColor;
        }
        else {
            this._originalColor = sOriginalColor;
        }
    }

    rotate() {
        let oNew = new Piece(this._color, this._sGuid, this._originalColor);
        let sColor = oNew._color.toString();
        sColor = sColor[1].concat(sColor[2], sColor[3], sColor[0]);
        oNew._color = parseInt(sColor, 10);
        return oNew;
    }

    print() {
        return this._color;
    }

}

module.exports = Piece