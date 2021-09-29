export const createMusk = (canvas, currentImage) => {
	// Create mask layer and show to canvas
	const selectionRect = new fabric.Rect({
		id: "mask",
		fill: "rgba(0,0,0,0.3)",
		originX: "left",
		originY: "top",
		stroke: "black",
		opacity: 1,
		width: currentImage.width,
		height: currentImage.height,
		hasRotatingPoint: false,
		transparentCorners: false,
		cornerColor: "white",
		cornerStrokeColor: "black",
		borderColor: "black",
		cornerSize: 12,
		padding: 0,
		cornerStyle: "circle",
		borderDashArray: [5, 5],
		borderScaleFactor: 1.3,
	});

	selectionRect.scaleToWidth(500);
	canvas.centerObject(selectionRect);
	canvas.add(selectionRect);
	canvas.setActiveObject(selectionRect);
	canvas.renderAll();
	return selectionRect;
};
