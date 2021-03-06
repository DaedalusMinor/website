//A Pong game with 4 players
var yVector = -2;  //vectors of the ball speed, be adjustable for collisions with paddles
var xVector = -2;
var browserWidth = window.innerWidth;
var browserHeight = window.innerHeight;
var hits = 0;
var team1Score = 0;
var team2Score = 0;

class Rectangle // There should be two horizontal rectangles,  one with left and right arrow controls, and the other with A and D controls
{
	constructor(x,y,w,h)
	{
		this.x=x;
		this.y=y;
		this.width=w;
		this.height=h;
		this.color="#000";
		
		this.left=false;
		this.right=false;
		this.up=false;
		this.down=false;
	}
	
	render()
	{
		ctx.fillStyle=this.color;
		ctx.fillRect(this.x, this.y, this.width, this.height);
	}
}

class Ball extends Rectangle{
	constructor(x,y,w,h){
		super(x,y,w,h);
	}
	
	update(){
		var prevy=this.y;
		var prevx=this.x;
		
		this.y+=yVector;
		this.x+=xVector
		
		for(var i=0;i<rectArray.length;i++)
		{
			if(rectArray[i]!=this && checkCollision(this,rectArray[i]))
			{
				if(rectArray[i] instanceof VertRectangle){			//makes the ball go the other direction horizontally if hitting a vertical rectangle
					xVector *= -1;
				}
				else if (rectArray[i] instanceof HorizRectangle){	//makes the ball go the other direction vertically if hitting a horizontal rectangle
					yVector *= -1;
				}
				
				xVector *= 1.1;
				yVector *= 1.1;
			}
		}
	}
}
class VertRectangle extends Rectangle // There should be two vertical rectangles,  one with up and down arrow controls, and the other with W and S controls
{
	constructor(x,y,w,h)
	{
		super(x,y,w,h);
	}
	update()	//checks for collisions with objects and moves if any keycode is given
	{
		var prevy=this.y;
		
		if(this.up==true && this.y > 0)
		{
			this.y-=4;
		}
		if(this.down==true && this.y < browserHeight*0.75)
		{
			this.y+=4;
		}
		
		for(var i=0;i<rectArray.length;i++)	//remains if their is a collision
		{
			if(rectArray[i]!=this && checkCollision(this,rectArray[i]))
			{
				this.y=prevy;
			}
		}//end of for
	}
	
	render()
	{
		super.render();
	}
}

class HorizRectangle extends Rectangle // There should be two horizontal rectangles,  one with left and right arrow controls, and the other with A and D controls
{
	constructor(x,y,w,h)
	{
		super(x,y,w,h);
	}
	update()	//checks for collisions with objects and moves if any keycode is given
	{
		var prevx=this.x;
		
		if(this.left==true && this.x > 0)
		{
			this.x-=4;
		}
		if(this.right==true && this.x < browserWidth *0.75)
		{
			this.x+=4;
		}
		
		for(var i=0;i<rectArray.length;i++)
		{
			if(rectArray[i]!=this && checkCollision(this,rectArray[i]))		//remains if their is a collision
			{
				this.x=prevx;
			}
		}
	}
	render()
	{
		super.render();
	}
	
}


Mouse = function()	
{
	var mouse={};
	mouse.x=0;
	mouse.y=0;
	
	function move(e)
	{
			mouse.x=e.clientX;
			mouse.y=e.clientY;
	}
	canvas.addEventListener('mousemove',move);
	return mouse;
}

//adding things
var hRect1=new HorizRectangle(browserWidth*0.375,10,browserWidth*0.25,10);					//makes horizontal paddle with a width 1/4 of the screen width
var vRect1=new VertRectangle(5,browserHeight*0.375,10,browserHeight*0.25);					//makes vertical paddle with a height 1/4 of the screen height
var hRect2=new HorizRectangle(browserWidth*0.375,browserHeight-20,browserWidth*0.25,10);	//makes horizontal paddle with a width 1/4 of the screen width
var vRect2=new VertRectangle(browserWidth-15,browserHeight*0.375,10,browserHeight*0.25);	//makes vertical paddle with a height 1/4 of the screen height
var ball = new Ball(browserWidth*0.5,browserHeight*0.5, browserWidth*0.01, browserWidth*0.01);
var rectArray=[];
rectArray.push(hRect1);
rectArray.push(vRect1);
rectArray.push(ball);
rectArray.push(vRect2);
rectArray.push(hRect2);

window.onload = function()
{

	canvas=document.getElementById("canvas");
	ctx=canvas.getContext("2d");
	canvas.width=window.innerWidth;
	canvas.height=window.innerHeight;
	ctx.imageSmoothingEnabled=false;
	mouse=new Mouse();
	
	document.addEventListener("keydown",keydown);
	document.addEventListener("keyup",keyup);
	
	createRandomDirection();
	setInterval(main, 1/60 * 10);
	window.alert("Arrow keys for team one in the upper left corner.  WASD for team two in the bottom right corner");
}

function main()
{
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	vRect1.x = 5;
	hRect1.y = 10;
	hRect2.y = window.innerHeight-20;
	vRect2.x = window.innerWidth-15;
	//update and render
	for(var i=0;i<rectArray.length;i++)
	{
		rectArray[i].update();
		rectArray[i].render();
	}
	
	if(checkTeam1Score())
	{
		team1Score+=1;
		reset();
	}
	
	if(checkTeam2Score())
	{
		team2Score+=1;
		reset();
	}
	ctx.fillStyle="black";
	ctx.font="30px Arial";
	ctx.fillText("" + team1Score,50,50);
	ctx.fillText("" + team2Score,window.innerWidth-50,window.innerHeight-50);
	
}

function keydown(e)
{
	switch(e.keyCode)
	{
		case 68:  // A is left for team 1
			hRect2.right=true;
			break;
		case 65:	// D is right for team 1
			hRect2.left=true;
			break;
		case 38:	// up is up for team 1
			vRect1.up=true;
			break;
		case 40:	// down is down for team 1
			vRect1.down=true;
			break;
		case 87:  // A is left for team 1
			vRect2.up=true;
			break;
		case 83:	// D is right for team 1
			vRect2.down=true;
			break;
		case 37:	// up is up for team 1
			hRect1.left=true;
			break;
		case 39:	// down is down for team 1
			hRect1.right=true;
			break;
	}
}

function keyup(e)
{
	switch(e.keyCode)
	{
		case 68:  // A is left for team 1
			hRect2.right=false;
			break;
		case 65:	// D is right for team 1
			hRect2.left=false;
			break;
		case 38:	// up is up for team 1
			vRect1.up=false;
			break;
		case 40:	// down is down for team 1
			vRect1.down=false;
			break;
		case 87:  // A is left for team 1
			vRect2.up=false;
			break;
		case 83:	// D is right for team 1
			vRect2.down=false;
			break;
		case 37:	// up is up for team 1
			hRect1.left=false;
			break;
		case 39:	// down is down for team 1
			hRect1.right=false;
			break;
	}
}

function checkTeam1Score(){ //checks if team 1 scored
	return(ball.x > browserWidth || ball.y > browserHeight)
}

function checkTeam2Score(){	//checks if team 2 scored
	return(ball.x < 0 || ball.y < 0)
}

function reset(){	//resets if a point is scored
	ball.x = (browserWidth * 0.5);
	ball.y = (browserHeight * 0.5);
	hits = 0;
	createRandomDirection();
}

function createRandomDirection(){	//creates random direction for ball to start in
	var randX = Math.floor(Math.random() * 2);
	var randY = Math.floor(Math.random() * 2);
	
	if(randX == 0){
		randX = -1;
	}
	
	if(randY == 0){
		randY = -1;
	}
	
	xVector = randX;
	yVector = randY;
}

function checkCollision(rect1,rect2)
{
	return (rect1.x<rect2.x+rect2.width && 
			rect1.x+rect1.width>rect2.x &&
			rect1.y<rect2.y+rect2.height &&
			rect1.height+rect1.y>rect2.y);
} 

function horizontalCollision(rect){
	var center = rect.x + parseInt(rect.w/2);
	//var absDistance = Math.abs(center - ball.x);
	var distance = center - ball.x;
	
	xVector = parseInt(4 * distance*0.005);
	yVector = parseInt(-4 * distance*0.005);
}

function verticalCollision(rect){
	var center = rect.y + (rect.h/2);
	//var absDistance = Math.abs(center - ball.y);
	var distance = center - ball.x;
	
	xVector = -4 * Math.sqrt(1 - absDistance*0.005);
	yVector = 4 * Math.sqrt(absDistance*0.005);
}