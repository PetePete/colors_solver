const Util = require('./Util.js')

class Piece {
    constructor(iColor) {
        this._originalColor = iColor;
        this._color = iColor;

        this._sGuid = Util.createGuid();
    }

    rotate() {
        let sColor = this._color.toString();
        sColor = sColor[1].concat(sColor[2], sColor[3], sColor[0]);
        this._color = parseInt(sColor, 10);
        return this;
    }

    print() {
        process.stdout.write( this._color.toString() );
    }
    
}

module.exports = Piece