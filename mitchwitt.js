window.onload = function()
{
	canvas=document.getElementById("canvas");
	ctx=canvas.getContext("2d");
	canvas.width=window.innerWidth;
	canvas.height=window.innerHeight;
	if(window.innerWidth < 1000){
		window.location.href = "Mobile/mobileindex.html";
	}
	else{
		main();
	}
}
var i = 0; 			// Start Point
var images = [];	// Images Array
var time = 3000;	// Time Between Switch
	 
// Image List
images[0] = "Gallery/pics/analemma-black.png";
images[1] = "Gallery/pics/cardioid-right-white.png";
images[2] = "Gallery/pics/lemniscate-black.png";

function main(){
	ctx.moveTo(0,0);
	ctx.lineTo(window.innerWidth, 0);
	ctx.lineTo(0,window.innerHeight-2);
	ctx.lineTo(0,0);
	ctx.globalAlpha = 0.6;
	ctx.fillStyle = 'black';
	ctx.fill();
	ctx.globalAlpha = 1.0;
	changeImg();
}

function changeImg(){
	document.slide.src = images[i];

	// Check If Index Is Under Max
	if(i < images.length - 1){
	  // Add 1 to Index
	  i++; 
	} else { 
		// Reset Back To O
		i = 0;
	}

	// Run function every x seconds
	setTimeout("changeImg()", time);
}
