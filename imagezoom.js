// imagezoom.js is a library for making images on a web page zoomable by clicking
// at them. This work is licensed under the MIT license. See 
// https://github.com/mathialo/imagezoom.js for details.
// (c) Mathias Lohne 2017

var imgzm = {
	backgroundDiv: {},
	imageDiv: {},
	zoomFactor: 75,

	zoomImage: function(event) {
		var image = event.target;
		imgzm.backgroundDiv.style.visibility = "visible";
		imgzm.imageDiv.style.visibility = "visible";

		var newImage = image.cloneNode();

		if (window.innerWidth < window.innerHeight) {
			newImage.style = "width: " + imgzm.zoomFactor + "%; height: auto;";	
		} else {
			newImage.style = "height: " + imgzm.zoomFactor + "%; width: auto;";	
		}

		imgzm.imageDiv.appendChild(newImage);
	},


	exitZoom: function() {
		imgzm.imageDiv.innerHTML = "";
		imgzm.backgroundDiv.style.visibility = "hidden";
		imgzm.imageDiv.style.visibility = "hidden";
	},


	applyToImage: function(htmlDOM) {
		htmlDOM.addEventListener("click", imgzm.zoomImage);
		htmlDOM.style.cursor = "pointer";
	},


	applyToAllImgTags: function() {
		var images = document.getElementsByTagName("img");

		for (var i = 0; i < images.length; i++) {
			imgzm.applyToImage(images[i]);
		}
	},


	applyToClass: function(classname) {
		var images = document.getElementsByClassName(classname);

		for (var i = 0; i < images.length; i++) {
			imgzm.applyToImage(images[i]);
		}
	},


	setup: function() {
		imgzm.backgroundDiv = document.createElement("div");
		imgzm.backgroundDiv.style = "visibility: hidden; position: fixed; \
			top: 0; bottom: 0; left: 0; right: 0; margin: auto; z-index: 1500; \
			opacity: 0.80; background-color: #000000; padding: 30px; padding-top: 10px;";
		imgzm.backgroundDiv.id = "imgzm.background";
		imgzm.backgroundDiv.addEventListener("click", imgzm.exitZoom);

		document.body.appendChild(imgzm.backgroundDiv);

		imgzm.imageDiv = document.createElement("div");
		imgzm.imageDiv.style = "display: flex; align-items: center; justify-content: center; \
			top: 0; bottom: 0; left: 0; right: 0; visibility: hidden; position: fixed; \
			margin: auto; z-index: 1501;";
		imgzm.imageDiv.id = "imgzm.image";
		imgzm.imageDiv.addEventListener("click", imgzm.exitZoom);

		document.body.appendChild(imgzm.imageDiv);
	},


	setZoomFactor: function(percentage) {
		imgzm.zoomFactor = percentage;
	}
}

document.addEventListener("DOMContentLoaded", function(event) {
	imgzm.setup();
});

