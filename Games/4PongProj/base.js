//A Pong game with 4 players
let browserWidth = window.innerWidth;
let browserHeight = window.innerHeight;
let hits = 0;
let team1Score = 0;
let team2Score = 0;

class Rectangle {// There should be two horizontal rectangles,  one with left and right arrow controls, and the other with A and D controls
    constructor(x, y, w, h) {
        this.x = x;
        this.y = y;
        this.width = w;
        this.height = h;
        this.color = "#000";

        this.left = false;
        this.right = false;
        this.up = false;
        this.down = false;
    }

    render() {
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }
}

class Ball extends Rectangle {
    constructor(x, y, w, h) {
        super(x, y, w, h);
        this.dx;
        this.dy;
        this.velocity = 3;
    }

    update() {
        let prevy = this.y;
        let prevx = this.x;

        this.y += this.dy;
        this.x += this.dx

        for (let i = 0; i < rectArray.length; i++) {
            if (rectArray[i] != this && checkCollision(this, rectArray[i])) {
                if (rectArray[i] instanceof VertRectangle) { //makes the ball go the other direction horizontally if hitting a vertical rectangle
                    this.velocity *= 1.1;
                    verticalCollision(rectArray[i]);
                } else if (rectArray[i] instanceof HorizRectangle) { //makes the ball go the other direction vertically if hitting a horizontal rectangle
                    this.velocity *= 1.1;
                    horizontalCollision(rectArray[i]);
                }
            }
        }
    }
}
class VertRectangle extends Rectangle { // There should be two vertical rectangles,  one with up and down arrow controls, and the other with W and S controls
    constructor(x, y, w, h) {
        super(x, y, w, h);
    }
    update() {//checks for collisions with objects and moves if any keycode is given
        let prevy = this.y;

        if (this.up == true && this.y > 0) {
            this.y -= 4;
        }
        if (this.down == true && this.y < browserHeight * 0.75) {
            this.y += 4;
        }

        for (let i = 0; i < rectArray.length; i++) //remains if their is a collision
        {
            if (rectArray[i] != this && checkCollision(this, rectArray[i])) {
                this.y = prevy;
            }
        } //end of for
    }

    render() {
        super.render();
    }
}

class HorizRectangle extends Rectangle {// There should be two horizontal rectangles,  one with left and right arrow controls, and the other with A and D controls
    constructor(x, y, w, h) {
        super(x, y, w, h);
    }
    update() {//checks for collisions with objects and moves if any keycode is given
        let prevx = this.x;

        if (this.left == true && this.x > 0) {
            this.x -= 4;
        }
        if (this.right == true && this.x < browserWidth * 0.75) {
            this.x += 4;
        }

        for (let i = 0; i < rectArray.length; i++) {
            if (rectArray[i] != this && checkCollision(this, rectArray[i])) //remains if their is a collision
            {
                this.x = prevx;
            }
        }
    }
    render() {
        super.render();
    }

}
