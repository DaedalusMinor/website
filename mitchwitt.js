
let i = 0; 			// Start Point
let images = [];	// Images Array
const INTERVAL = 3000;	// Time Between Switch

// Image List
images[0] = "Gallery/pics/analemma-black.png";
images[1] = "Gallery/pics/cardioid-white.png";
images[2] = "Gallery/pics/lemniscate-black.png";


let quote = document.getElementById("mitchQuote");
quote.style.left = window.innerWidth - quote.style.width - 425 + "px";
quote.style.top = window.innerHeight - quote.style.height - 215 + "px";

window.onload = function() {
	setInterval(changeImg, INTERVAL);
}

function changeImg() {
	document.slide.src = images[i];

	if(i < images.length - 1){
	  i++;
	} else {
		i = 0;
	}
}
