var globalWidth = 65;
var canvasSize = 650;
var canvas = document.getElementById("canvas");
canvas.height = canvasSize;
canvas.width = canvasSize;
var ctx = canvas.getContext("2d");

class Square {
    constructor(x, y, color) {
        this.x = x;
        this.y = y;
        this.color = color;
    }

    render() {
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x, this.y, globalWidth, globalWidth);
    }
}

class Boundary extends Square {
    constructor(x, y) {
        super(x, y, "gray");
    }
}

class OpenSquare extends Square {
    constructor(x, y, color) {
        super(x, y, random_rgba());
        this.marked = false;
        this.pathLength = 0;
        this.theta = 0;
    }

    render() {
        super.render();
        ctx.fillStyle = "black";
        ctx.fillText("" + this.pathLength, this.x + globalWidth / 2, this.y + globalWidth / 2);
        // ctx.beginPath();
        // ctx.moveTo(this.x + globalWidth/2, this.y + globalWidth/2);
        // ctx.lineTo(globalWidth * Math.cos(this.theta) + (this.x + globalWidth/2) , globalWidth * Math.sin(this.theta) + (this.y + globalWidth/2));
        // ctx.stroke();
    }
}

class Grid {
    constructor(h, w, squareSize) {
        this.height = h;
        this.width = w;
        this.squares = [];
        this.squareSize = squareSize;
        this.rDest = 0;
        this.cDest = 0;
    }

    setDestination(c, r) {
        this.rDest = r;
        this.cDest = c;
    }

    setUpGrid(squares) {
        this.squares = squares;
    }

    addSquare(square) {
        var c = square.x / this.squareSize;
        var r = square.y / this.squareSize;
        this.squares[r * this.width + c] = square;
    }


    isValidFrontier(r, c) {
        return (!(r < 0 || c < 0 || r >= this.height || c >= this.width || this.squares[r * this.width + c] instanceof Boundary || this.squares[r * this.width + c].marked));
    }

    breadthFirstSearch(frontierSquares) {
        if (frontierSquares.length == 0) {
            return;
        } else {
            var newFrontierSquares = [];

            for (var i = 0; i < frontierSquares.length; i++) {
                var square = frontierSquares[i];
                var r = (square.y / this.squareSize);
                var c = (square.x / this.squareSize);
                var that = this;

                if (this.rDest == r && this.cDest == c) {
                    this.squares[r * this.width + c].marked = true;
                    this.squares[r * this.width + c].color = "gray";
                    this.squares[r * this.width + c].pathLength = 0;
                }

                if (this.isValidFrontier(r - 1, c)) {
                    this.squares[(r - 1) * this.width + c].marked = true;
                    this.squares[(r - 1) * this.width + c].pathLength = square.pathLength + 1;
                    this.squares[(r - 1) * this.width + c].color = "red";
                    newFrontierSquares.push(this.squares[(r - 1) * this.width + c]);
                }

                if (this.isValidFrontier(r + 1, c)) {
                    this.squares[(r + 1) * this.width + c].marked = true;
                    this.squares[(r + 1) * this.width + c].pathLength = square.pathLength + 1;
                    this.squares[(r + 1) * this.width + c].color = "yellow";
                    newFrontierSquares.push(this.squares[(r + 1) * this.width + c]);
                }

                if (this.isValidFrontier(r, c - 1)) {
                    this.squares[r * this.width + c - 1].marked = true;
                    this.squares[r * this.width + c - 1].pathLength = square.pathLength + 1;
                    this.squares[r * this.width + c - 1].color = "blue";
                    newFrontierSquares.push(this.squares[r * this.width + c - 1]);
                }

                if (this.isValidFrontier(r, c + 1)) {
                    this.squares[r * this.width + c + 1].marked = true;
                    this.squares[r * this.width + c + 1].pathLength = square.pathLength + 1;
                    this.squares[r * this.width + c + 1].color = "green";
                    newFrontierSquares.push(this.squares[r * this.width + c + 1]);
                }
            }
            this.breadthFirstSearch(newFrontierSquares);
        }
    }

    getNeighborSquares(c, r) {
        var neighborSquares = [];
        for (var i = -1; i <= 1; i++) {
            for (var j = -1; j <= 1; j++) {
                if (i != 0 && j != 0 && r + i != -1 && r + i != this.height && c + j != -1 && c + j != this.width && this.squares[(r + i) * this.width + (c + j)] instanceof Boundary) {
                    neighborSquares.push((r + i) * this.width + (c + j));
                }
            }
        }
        return neighborSquares;
    }
}

var height = 10;
var width = 10;
var grid = new Grid(height, width, globalWidth);
var squareArray = [];
var boundaryArray = [];

function main(c, r) {
    for (var y = 0; y < (height); y++) {
        for (var x = 0; x < (width); x++) {
            squareArray[y * width + x] = new OpenSquare(x * globalWidth, y * globalWidth, random_rgba());
        }
    }

    for (var i = 0; i < boundaryArray.length; i++) {
        squareArray[boundaryArray[i]] = new Boundary((boundaryArray[i] % width) * globalWidth, Math.trunc(boundaryArray[i] / width) * globalWidth);
    }

    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, canvasSize, canvasSize);
    grid.setDestination(c, r)
    grid.setUpGrid(squareArray);
    grid.breadthFirstSearch([grid.squares[r * width + c]]);
    for (var i = 0; i < height; i++) {
        for (var j = 0; j < width; j++) {
            grid.squares[i * width + j].render();
        }
    }
}

main(0, 0);
document.addEventListener('click', function(mouse) {
    var rect = canvas.getBoundingClientRect();
    var x = mouse.x - rect.left;
    var y = mouse.y - rect.top;
    if (x >= 0 && x <= canvasSize && y >= 0 && y <= canvasSize) {
        var r = Math.trunc(y / globalWidth);
        var c = Math.trunc(x / globalWidth);
        if (grid.squares[r * width + c] instanceof OpenSquare) {
            main(c, r);
        }
    }
});

document.addEventListener('contextmenu', function(mouse) {
    var rect = canvas.getBoundingClientRect();
    var x = mouse.x - rect.left;
    var y = mouse.y - rect.top;
    if (x >= 0 && x <= canvasSize && y >= 0 && y <= canvasSize) {
        var r = Math.trunc(y / globalWidth);
        var c = Math.trunc(x / globalWidth);
        if (grid.squares[r * width + c] instanceof OpenSquare) {
            boundaryArray.push(r * width + c);
        } else if (grid.squares[r * width + c] instanceof Boundary) {
            var index = boundaryArray.indexOf(r * width + c);
            boundaryArray.splice(index, 1);
        }
        main(grid.cDest, grid.rDest);
    }
});

function random_rgba() {
    var o = Math.round,
        r = Math.random,
        s = 255;
    return 'rgba(' + o(r() * s) + ',' + o(r() * s) + ',' + o(r() * s) + ',' + r().toFixed(1) + ')';
}
