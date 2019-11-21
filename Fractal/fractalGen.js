let x = canvas.width/2;
let y = canvas.height/2 - 1;
let lengthSlider = document.getElementById("lengthSlider");
let branchSlider = document.getElementById("branchSlider");
let lengthValue = document.getElementById("lengthValue");
let branchValue = document.getElementById("branchValue");
let partitionSlider = document.getElementById("partitionSlider");
let partitionValue = document.getElementById("partitionValue");

let radialSliders = [];
let radialValues = [];

for(let i = 1; i <= 6; i++) {
	let slider = "radialSlider" + i;
	let value = "radialValue" + i;
	radialSliders[i-1] = document.getElementById(slider);
	radialValues[i-1] = document.getElementById(value);
}

window.onload = function() {
	canvas=document.getElementById("canvas");
	ctx=canvas.getContext("2d");
	canvas.width=window.innerWidth;
	canvas.height=window.innerHeight;
	setInterval(main, 1);
	mouse = new Mouse();
}

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


function main(){
	ctx.fillStyle = 'black';
	ctx.fillRect(0,0,canvas.width, canvas.height);
	ctx.beginPath();
	ctx.strokeStyle = 'white';

	let y = mouse.y - canvas.height/2;
	let x = mouse.x - canvas.width/2;
	let branches = branchSlider.value;
	let length = lengthSlider.value;
	let partitions = partitionSlider.value;
	partitionValue.innerHTML = partitions;
	lengthValue.innerHTML = length;
	branchValue.innerHTML = branches;

	for (let i = 0; i < radialValues.length; i++) {
		if (i < partitions) {
			radialSliders[i].disabled = false;
			radialValues[i].innerHTML = radialSliders[i].value;
		}
		else {
			radialValues[i].innerHTML = "";
			radialSliders[i].value = 0;
			radialSliders[i].disabled = true;
			radialSliders[i].opacity = 0.4;
		}
	}
	theta = Math.atan2(y, x);
	drawTree(branches, theta, length, canvas.width/2, canvas.height/2);
	ctx.stroke();
}

function drawTree(stems, theta, longness, startX, startY) {
	if(stems >= 1) {
		ctx.moveTo(startX, startY);
		ctx.lineWidth = stems;
		ctx.lineTo(startX + longness * Math.cos(theta), startY + longness*Math.sin(theta));

		for (let i = 0; i < radialSliders.length; i++) {
			if(!radialSliders[i].disabled) {
				drawTree(stems-1, theta * radialSliders[i].value, longness/1.618, startX + longness * Math.cos(theta), startY + longness * Math.sin(theta));
			}
		}
	}
}
