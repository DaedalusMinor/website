var x = window.innerWidth/2;
var y = window.innerHeight/2 - 1;
var lengthSlider = document.getElementById("lengthSlider");
var branchSlider = document.getElementById("branchSlider");
var lengthValue = document.getElementById("lengthValue");
var branchValue = document.getElementById("branchValue");
var partitionSlider = document.getElementById("partitionSlider");
var partitionValue = document.getElementById("partitionValue");

var radialSliders = [];
var radialValues = [];

for(var i = 1; i <= 6; i++){
	var slider = "radialSlider" + i;
	var value = "radialValue" + i;
	radialSliders[i-1] = document.getElementById(slider);
	radialValues[i-1] = document.getElementById(value);
}

window.onload = function()
{
	canvas=document.getElementById("canvas");
	ctx=canvas.getContext("2d");
	canvas.width=window.innerWidth;
	canvas.height=window.innerHeight;
	setInterval(main, 1);
	mouse = new Mouse();
}

Mouse = function() {
	var mouse = {};
	mouse.x = 0;
	mouse.y = 0;

	function move(e) {
		mouse.x = e.clientX;
		mouse.y = e.clientY;
	}
	canvas.addEventListener('mousemove', move);
	return mouse;
}


function main(){
	ctx.fillStyle = 'black';
	ctx.fillRect(0,0,window.innerWidth, window.innerHeight);
	ctx.beginPath();
	ctx.strokeStyle = 'white';

	var y = mouse.y - window.innerHeight/2;
	var x = mouse.x - window.innerWidth/2;
	var branches = branchSlider.value;
	var length = lengthSlider.value;
	var partitions = partitionSlider.value;
	partitionValue.innerHTML = partitions;
	lengthValue.innerHTML = length;
	branchValue.innerHTML = branches;

	for(var i = 0; i < radialValues.length; i++){
		if(i < partitions){
			radialSliders[i].disabled = false;
			radialValues[i].innerHTML = radialSliders[i].value;
		}
		else{
			radialValues[i].innerHTML = "";
			radialSliders[i].value = 0;
			radialSliders[i].disabled = true;
			radialSliders[i].opacity = 0.4;
		}
	}
	theta = Math.atan2(y, x);
	drawTree(branches, theta, length, window.innerWidth/2, window.innerHeight/2);
	ctx.stroke();
}

function drawTree(stems, theta, longness, startX, startY){
	if(stems >= 1){
		ctx.moveTo(startX, startY);
		ctx.lineWidth = stems;
		ctx.lineTo(startX + longness * Math.cos(theta), startY + longness*Math.sin(theta));

		for(var i = 0; i < radialSliders.length; i++){
			if(!radialSliders[i].disabled){
				drawTree(stems-1, theta * radialSliders[i].value, longness/1.618, startX + longness * Math.cos(theta), startY + longness * Math.sin(theta));
			}
		}

	}
}
