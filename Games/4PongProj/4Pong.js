Mouse = function() {
    let mouse = {};
    mouse.x = 0;
    mouse.y = 0;

    function move(e) {
        mouse.x = e.clientX;
        mouse.y = e.clientY;
    }
    canvas.addEventListener('mousemove', move);
    return mouse;
}

//adding things
let hRect1 = new HorizRectangle(browserWidth * 0.375, 10, browserWidth * 0.25, 10); //makes horizontal paddle with a width 1/4 of the screen width
let vRect1 = new VertRectangle(5, browserHeight * 0.375, 10, browserHeight * 0.25); //makes vertical paddle with a height 1/4 of the screen height
let hRect2 = new HorizRectangle(browserWidth * 0.375, browserHeight - 20, browserWidth * 0.25, 10); //makes horizontal paddle with a width 1/4 of the screen width
let vRect2 = new VertRectangle(browserWidth - 15, browserHeight * 0.375, 10, browserHeight * 0.25); //makes vertical paddle with a height 1/4 of the screen height
let ball = new Ball(browserWidth * 0.5, browserHeight * 0.5, browserWidth * 0.01, browserWidth * 0.01);
let rectArray = [];
rectArray.push(hRect1);
rectArray.push(vRect1);
rectArray.push(ball);
rectArray.push(vRect2);
rectArray.push(hRect2);

window.onload = function() {
    canvas = document.getElementById("canvas");
    ctx = canvas.getContext("2d");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    ctx.imageSmoothingEnabled = false;
    mouse = new Mouse();

    document.addEventListener("keydown", keydown);
    document.addEventListener("keyup", keyup);

    createRandomDirection();
    setInterval(main, 1 / 60 * 10);
    window.alert("Arrow keys for team one in the upper left corner.  WASD for team two in the bottom right corner");
}

function main() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    vRect1.x = 5;
    hRect1.y = 10;
    hRect2.y = window.innerHeight - 20;
    vRect2.x = window.innerWidth - 15;

    for (let i = 0; i < rectArray.length; i++) {
        rectArray[i].update();
        rectArray[i].render();
    }

    if (checkTeam1Score()) {
        team1Score += 1;
        reset();
    }

    if (checkTeam2Score()) {
        team2Score += 1;
        reset();
    }

    ctx.fillStyle = "black";
    ctx.font = "30px Arial";
    ctx.fillText("" + team1Score, 50, 50);
    ctx.fillText("" + team2Score, window.innerWidth - 50, window.innerHeight - 50);
}

function keydown(e) {
    switch (e.keyCode) {
        case 68: // A is left for team 1
            hRect2.right = true;
            break;
        case 65: // D is right for team 1
            hRect2.left = true;
            break;
        case 38: // up is up for team 1
            vRect1.up = true;
            break;
        case 40: // down is down for team 1
            vRect1.down = true;
            break;
        case 87: // A is left for team 1
            vRect2.up = true;
            break;
        case 83: // D is right for team 1
            vRect2.down = true;
            break;
        case 37: // up is up for team 1
            hRect1.left = true;
            break;
        case 39: // down is down for team 1
            hRect1.right = true;
            break;
    }
}

function keyup(e) {
    switch (e.keyCode) {
        case 68: // A is left for team 1
            hRect2.right = false;
            break;
        case 65: // D is right for team 1
            hRect2.left = false;
            break;
        case 38: // up is up for team 1
            vRect1.up = false;
            break;
        case 40: // down is down for team 1
            vRect1.down = false;
            break;
        case 87: // A is left for team 1
            vRect2.up = false;
            break;
        case 83: // D is right for team 1
            vRect2.down = false;
            break;
        case 37: // up is up for team 1
            hRect1.left = false;
            break;
        case 39: // down is down for team 1
            hRect1.right = false;
            break;
    }
}

function checkTeam1Score() { //checks if team 1 scored
    return (ball.x > browserWidth || ball.y > browserHeight)
}

function checkTeam2Score() { //checks if team 2 scored
    return (ball.x < 0 || ball.y < 0)
}

function reset() { //resets if a point is scored
    ball.x = (browserWidth / 2);
    ball.y = (browserHeight / 2);
    ball.velocity = 3;
    hits = 0;
    createRandomDirection();
}

function createRandomDirection() { //creates random direction for ball to start in
    let theta = 2 * Math.floor(Math.random() * Math.PI);

    ball.dx = ball.velocity * Math.cos(theta);
    ball.dy = ball.velocity * Math.sin(theta);
}

function checkCollision(rect1, rect2) {
    return (rect1.x < rect2.x + rect2.width &&
        rect1.x + rect1.width > rect2.x &&
        rect1.y < rect2.y + rect2.height &&
        rect1.height + rect1.y > rect2.y);
}

//TODO IMPROVE COLLISIONS
function horizontalCollision(rect) {
    let distance = (rect.x + rect.width/2) - (ball.x + ball.width/2);
    let theta = 0.35 * Math.PI * (distance / (rect.width/2)) + Math.PI/2;

		ball.velocity *= 1.05;
    ball.dx = ball.velocity * Math.cos(theta);

    if (ball.dy < 0) {
      ball.dy = ball.velocity * Math.sin(theta);
    } else {
      ball.dy = -1 * ball.velocity * Math.sin(theta);
    }

		console.log(ball.dx + ", " + ball.dy);
}

function verticalCollision(rect) {
    let distance = -(rect.y + rect.height/2) + (ball.y + ball.height/2);
    let theta = 0.35 * Math.PI * distance / rect.height;

    ball.velocity *= 1.05;
    ball.dy = ball.velocity * Math.sin(theta);

    if (ball.dx > 0) {
      ball.dx = -1 * ball.velocity * Math.cos(theta);
    } else {
      ball.dx = ball.velocity * Math.cos(theta);
    }

		console.log(ball.dx + ", " + ball.dy);
}
