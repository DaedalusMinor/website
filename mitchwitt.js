window.onload = function()
{
	canvas=document.getElementById("canvas");
	ctx=canvas.getContext("2d");
	canvas.width=window.innerWidth;
	canvas.height=window.innerHeight;
	if(window.innerWidth < 775){
		window.location.href = "Mobile/mobileindex.html";
	}
	else{
		main();
	}
}

function main(){
	ctx.moveTo(0,0);
	ctx.lineTo(window.innerWidth, 0);
	ctx.lineTo(0,window.innerHeight-2);
	ctx.lineTo(0,0);
	ctx.globalAlpha = 0.6;
	ctx.fillStyle = 'black';
	ctx.fill();
	ctx.globalAlpha = 1.0;
	ctx.fillText(""+ window.innerWidth, window.innerWidth - 100, 90);
}