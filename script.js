let pixel, click, posX, posY;

var canvas1 = document.querySelector('#canvas1');
var canvas2 = document.querySelector('#canvas2');

var img1 = document.querySelector('#img1');

var ctx1 = canvas1.getContext('2d', {
	willReadFrequently: true,
});
var ctx2 = canvas2.getContext('2d', {
	willReadFrequently: true,
});

var pixelColorContainer = document.querySelector('#pixel-color-container');

var mouseTrack = document.querySelector('#mouseTrack');
	var mouseTrackColor = document.querySelector('#mouseTrackColor');
	var mouseTrackRGB = document.querySelector('#mouseTrackRGB');

const kernel = {
	sharpen : [[0, -1, 0],
			  [-1, 5, -1],
			  [0, -1, 0]]
}

function processFrame() {
	ctx1.drawImage(img1, 0, 0, 720, 480);

	pixel = ctx1.getImageData(0, 0, 720, 480);

	sharpenFrame(pixel.data);

	console.log(`[${kernel.sharpen[0][0]}, ${kernel.sharpen[0][1]}, ${kernel.sharpen[0][2]}]`);
	console.log(`[${kernel.sharpen[1][0]}, ${kernel.sharpen[1][1]}, ${kernel.sharpen[1][2]}]`);
	console.log(`[${kernel.sharpen[2][0]}, ${kernel.sharpen[2][1]}, ${kernel.sharpen[2][2]}]`);

	ctx2.putImageData(pixel, 0, 0);
}
processFrame();

function sharpenFrame(data) {
	console.log(data);
}

function getPos(e) {
	click = canvas1.getBoundingClientRect();

	posX = e.x - click.x;
	posY = e.y - click.y;

	return { posX, posY };
}

canvas1.onclick = function getPixelColor(e) {
	var colorContainer = document.querySelector('#color-container');

	pixel = ctx1.getImageData(getPos(e).posX, getPos(e).posY, 720, 480);

	const rgba = `rgba(${pixel.data[0]}, ${pixel.data[1]}, ${pixel.data[2]}, ${pixel.data[3] / 255})`;

	colorContainer.style.backgroundColor = rgba;
	pixelColorContainer.innerHTML += `<div class="rgb-saved"><div style="width: 25px; height: 25px; background-color: ${rgba}; border-radius: 100%; margin: 5px; border: 2px solid white;"></div>${rgba}</div>`;
}

canvas1.addEventListener('mousemove', (e) => {
	mouseTrack.style.display = 'block';

	pixel = ctx1.getImageData(getPos(e).posX, getPos(e).posY, 720, 480);

	const rgba = `rgba(${pixel.data[0]}, ${pixel.data[1]}, ${pixel.data[2]}, ${pixel.data[3] / 255})`;

	mouseTrackRGB.innerHTML = rgba;
	mouseTrackRGB.style.left = getPos(e).posX + 85 + 'px';
	mouseTrackRGB.style.top = getPos(e).posY + 'px';
	mouseTrackColor.style.left = getPos(e).posX + 50 + 'px';
	mouseTrackColor.style.top = getPos(e).posY + 'px';

	mouseTrackColor.style.backgroundColor = rgba;
});

canvas1.addEventListener('mouseout', () => {
	mouseTrack.style.display = 'none';
});