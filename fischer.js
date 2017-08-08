(function() {

    "use strict";

    var c = document.getElementById("main-canvas");
    var ctx = c.getContext("2d");
    ctx.moveTo(0,0);

    var GLOBALS = {
        imageWidth: 20, // image width
        imageHeight: 20, // image height
        backRowPieces: ['b', 'b', 'k', 'n', 'n', 'q', 'r', 'r'],
        assets: ['bb', 'bk', 'bn', 'bp', 'bq', 'br', 'wb', 'wk', 'wn', 'wp', 'wq', 'wr'],
        assetsPrefix: 'assets/',
        assetsSuffix: '.png',
    }

    var drawTile = function(imgName, posX, posY) {

        var img = new Image();

        img.onload = function() {
            ctx.drawImage(img, posX, posY, GLOBALS.imageWidth, GLOBALS.imageHeight);
        }

        var imgSrc = GLOBALS.assetsPrefix + imgName + GLOBALS.assetsSuffix;
        console.log(imgSrc);
        img.src = imgSrc;
    }

    var x = 0;
    var pieceOptions = _.clone(GLOBALS.backRowPieces);

    // 1st Square: Any nonKing piece
    var piece1 = _.sample(_.without(pieceOptions, 'k'));
    drawTile('b' + piece1, x, 0);
    drawTile('w' + piece1, x, GLOBALS.imageHeight * 7);
    x += GLOBALS.imageWidth;

    // Draws 8 Black Pawns
    for (var i = 0; i < 8; i++) {
        var x = GLOBALS.imageWidth * i;
        var y = GLOBALS.imageHeight;
        drawTile('bp', x, y)
    }

    // Draws 8 White Pawns
    for (var i = 0; i < 8; i++) {
        var x = GLOBALS.imageWidth * i;
        var y = GLOBALS.imageHeight * 6;
        drawTile('wp', x, y)
    }

    

})();

