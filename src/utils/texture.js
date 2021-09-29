fabric.textureSize = 8192;
var imgSrc = "https://images.pexels.com/photos/2440079/pexels-photo-2440079.jpeg";


// Init canvas
var canvas = new fabric.Canvas('c');
canvas.setHeight(2320);
canvas.setWidth(2828);

// Set BG Image
var img = new Image();
img.crossOrigin = "anonymous"; // important - set crossOrigin before src!
img.src = imgSrc;
img.onload = function () {
  canvas.setBackgroundImage(
    new fabric.Image(img, {
      originX: "left",
      originY: "top",
      scaleX: canvas.getWidth() / img.width,
      scaleY: canvas.getHeight() / img.height,
    }),
    canvas.renderAll.bind(canvas)
  );
  imageFinishedLoading = true;
};

// Make a dot using x, y coordinates
function makeDot(x, y) {
  point = new fabric.Circle({
    radius: 20,
    originX: "center",
    originY: "center",
    strokeUniform: true,
    lockScalingX: true,
    lockScalingY: true,
    padding: 4,
    fill: "rgba(237, 90, 69, 1)",
    stroke: "rgba(237, 90, 69, 1)",
    strokeWidth: 0,
    left: x,
    top: y,
  });
  canvas.add(point);
}

makeDot(20,30);
makeDot(302,102);
makeDot(111,400);



// Resize to fit a smaller screen
let width = "200px";
let height = "300px";
function setDim(){
  document.querySelectorAll("canvas").forEach(canv=>{
    canv.style.height = height;
    canv.style.width = width;
  })
  document.querySelector(".canvas-container").style.height = height;
  document.querySelector(".canvas-container").style.width = width;
}
setDim();


/*
* Brightness Filtering Logic
*/
const webgl = document.querySelector("#webgl");
fabric.filterBackend = fabric.initFilterBackend();

webgl.addEventListener("input", (evt)=>{
  if(evt.target.checked){
  	fabric.filterBackend = webglBackend;
    fabric.textureSize = 6552236;
  }
	else{
    let canvas2dBackend = new fabric.Canvas2dFilterBackend();
  	fabric.filterBackend = canvas2dBackend;
  }

});

let brightnessVal;
const brightnessFilterSlider = document.querySelector(
  "#brightness-filter-slider"
);
brightnessFilterSlider.addEventListener("input", handleBrightnessFilter);
function handleBrightnessFilter(e) {
  brightnessVal = this.value;
    canvas.backgroundImage.filters = [
    new fabric.Image.filters.Brightness({ brightness: brightnessVal }),
  ];
  canvas.backgroundImage.applyFilters();
  canvas.renderAll();
  
  let status = document.querySelector(".status");
  status.textContent = "You should now notice that the image is only partially rendered (for WebGL) or verry slow (non WebGL)";
  status.classList.add("imp");
}

