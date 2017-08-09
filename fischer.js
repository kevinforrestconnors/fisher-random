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

    var permArr = [],
        usedChars = [];

    function permute(input) {
      var i, ch;
      for (i = 0; i < input.length; i++) {
        ch = input.splice(i, 1)[0];
        usedChars.push(ch);
        if (input.length == 0) {
          permArr.push(usedChars.slice());
        }
        permute(input);
        input.splice(i, 0, ch);
        usedChars.pop();
      }
      return permArr;
    };

    var drawTile = function(imgName, posX, posY) {

        var img = new Image();

        img.onload = function() {
            ctx.drawImage(img, posX, posY, GLOBALS.imageWidth, GLOBALS.imageHeight);
        }

        var imgSrc = GLOBALS.assetsPrefix + imgName + GLOBALS.assetsSuffix;
        img.src = imgSrc;
    }

    var canvasX = 0;
    var canvasY = 0;
    var pieceOptions = _.clone(GLOBALS.backRowPieces);

    // Draws 8 Pawns on each side
    _(8).times(function(i) {
        canvasX = GLOBALS.imageWidth * i;
        canvasY = GLOBALS.imageHeight;
        drawTile('bp', canvasX, canvasY)
        canvasY = GLOBALS.imageHeight * 6;
        drawTile('wp', canvasX, canvasY)
    });

    var allPossibilities = permute(GLOBALS.backRowPieces);

    var chess960PossibilitiesWithReps = _.sortBy(_.filter(allPossibilities, function(s) {

        var r1Index = _.indexOf(s, 'r');
        var r2Index = _.lastIndexOf(s, 'r');

        var kIndex = _.indexOf(s, 'k');

        var b1Index = _.indexOf(s, 'b');
        var b2Index = _.lastIndexOf(s, 'b');

        // King between Rooks && Bishops on different colors
        return (r1Index < r2Index && kIndex > r1Index && kIndex < r2Index) && (b1Index + b2Index) % 2 == 1;
    }));

    var chess960Possibilities = [];

    for (var i = 0; i < 7680; i += 8) {
        chess960Possibilities.push(chess960PossibilitiesWithReps[i]);
    }
    
    var numSelected = 203//_.random(0, chess960Possibilities.length);
    var selectedPossibility = chess960Possibilities[numSelected];

    console.log(numSelected)
    document.getElementById("num-of-initial-state").innerHTML = numSelected;

    console.log(selectedPossibility);

    for (var i = 0; i < 8; i++) {
        canvasX = GLOBALS.imageWidth * i;
        canvasY = 0;
        drawTile('b' + selectedPossibility[i], canvasX, canvasY);
        canvasY = GLOBALS.imageHeight * 7;
        drawTile('w' + selectedPossibility[i], canvasX, canvasY);
    }

})();

