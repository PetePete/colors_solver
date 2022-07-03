const Util = require('./Util.js')

class Piece {
    constructor(iColor, sGuid, sOriginalColor) {
        this._originalColor = iColor;
        this._color = iColor;

        if (!sGuid) {
            this._sGuid = Util.createGuid();
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
        //     let sColorName1 = this._color.toString()[0];
        //     let iRest = 8 - sColorName1.length;
        //     sColorName1 = Util.getColorName(Math.floor(iRest / 2), sColorName1, Math.round(iRest / 2));

        //     let sColorName2 = this._color.toString()[1];
        //     iRest = 8 - sColorName2.length;
        //     sColorName2 = Util.getColorName(Math.floor(iRest / 2), sColorName2, Math.round(iRest / 2));

        //     let sColorName3 = this._color.toString()[2];
        //     iRest = 8 - sColorName3.length;
        //     sColorName3 = Util.getColorName(Math.floor(iRest / 2), sColorName3, Math.round(iRest / 2));

        //     let sColorName4 = this._color.toString()[3];
        //     iRest = 8 - sColorName4.length;
        //     sColorName4 = Util.getColorName(Math.floor(iRest / 2), sColorName4, Math.round(iRest / 2));

        //     process.stdout.write(`
        //         ____________________
        //         |        |        |
        //         |${sColorName1}|${sColorName2}|
        //         |        |        |
        //         --------------------
        //         |        |        |
        //         |${sColorName3}|${sColorName4}|
        //         |        |        |
        //         --------------------
        //         `);
    }

}

module.exports = Piece