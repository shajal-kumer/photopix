export const crop = (canvas, selectionRect, currentImage) => {
	document.querySelector(".btn-crop").addEventListener("click", function (event) {
		// create mask rectabgle for crop
		let rect = new fabric.Rect({
			left: selectionRect.left,
			top: selectionRect.top,
			width: selectionRect.getScaledWidth(),
			height: selectionRect.getScaledHeight(),
			absolutePositioned: true,
		});

		// add to the current image clicpPath property
		currentImage.clipPath = rect;

		// remove the mask layer
		canvas.remove(selectionRect);

		// init new image instance
		const cropped = new Image();

		// set src value of canvas croped area as toDataURL
		cropped.src = canvas.toDataURL({
			left: rect.left,
			top: rect.top,
			width: rect.width,
			height: rect.height,
		});

		// after onload clear the canvas and add cropped image to the canvas
		cropped.onload = function () {
			canvas.clear();
			const image = new fabric.Image(cropped);
			image.left = rect.left;
			image.top = rect.top;
			image.setCoords();
			canvas.setBackgroundImage(image);
			canvas.renderAll();
		};
	});
};
