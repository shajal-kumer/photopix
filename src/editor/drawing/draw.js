import { $ } from "../../utils/utils.js";
// Drawing  code start here
export const draw = (canvas) => {
	const drawingLineColor = $(".drawing-line-color");
	const drawingLineWidth = $(".drawing-line-width");
	const drawingShadowColor = $(".drawing-shadow-color");
	const drawingShadowWidth = $(".drawing-shadow-width");
	const drawingShadowOffset = $(".drawing-shadow-offset");

	let vLinePatternBrush;
	let hLinePatternBrush;
	let squarePatternBrush;
	let diamondPatternBrush;
	let texturePatternBrush;

	if (fabric.PatternBrush) {
		vLinePatternBrush = new fabric.PatternBrush(canvas);
		vLinePatternBrush.getPatternSrc = function () {
			const patternCanvas = fabric.document.createElement("canvas");
			patternCanvas.width = patternCanvas.height = 10;
			const ctx = patternCanvas.getContext("2d");

			ctx.strokeStyle = this.color;
			ctx.lineWidth = 5;
			ctx.beginPath();
			ctx.moveTo(0, 5);
			ctx.lineTo(10, 5);
			ctx.closePath();
			ctx.stroke();

			return patternCanvas;
		};

		hLinePatternBrush = new fabric.PatternBrush(canvas);
		hLinePatternBrush.getPatternSrc = function () {
			const patternCanvas = fabric.document.createElement("canvas");
			patternCanvas.width = patternCanvas.height = 10;
			const ctx = patternCanvas.getContext("2d");

			ctx.strokeStyle = this.color;
			ctx.lineWidth = 5;
			ctx.beginPath();
			ctx.moveTo(5, 0);
			ctx.lineTo(5, 10);
			ctx.closePath();
			ctx.stroke();

			return patternCanvas;
		};

		squarePatternBrush = new fabric.PatternBrush(canvas);
		squarePatternBrush.getPatternSrc = function () {
			const squareWidth = 10,
				squareDistance = 2;

			const patternCanvas = fabric.document.createElement("canvas");
			patternCanvas.width = patternCanvas.height = squareWidth + squareDistance;
			const ctx = patternCanvas.getContext("2d");

			ctx.fillStyle = this.color;
			ctx.fillRect(0, 0, squareWidth, squareWidth);

			return patternCanvas;
		};

		diamondPatternBrush = new fabric.PatternBrush(canvas);
		diamondPatternBrush.getPatternSrc = function () {
			const squareWidth = 10,
				squareDistance = 5;
			const patternCanvas = fabric.document.createElement("canvas");
			const rect = new fabric.Rect({
				width: squareWidth,
				height: squareWidth,
				angle: 45,
				fill: this.color,
			});

			const canvasWidth = rect.getBoundingRect().width;

			patternCanvas.width = patternCanvas.height = canvasWidth + squareDistance;
			rect.set({ left: canvasWidth / 2, top: canvasWidth / 2 });

			const ctx = patternCanvas.getContext("2d");
			rect.render(ctx);

			return patternCanvas;
		};

		const img = new Image();
		img.src = "../image/honey_im_subtle.png";

		texturePatternBrush = new fabric.PatternBrush(canvas);
		texturePatternBrush.source = img;
	}

	$(".drawing-mode-options").onchange = function () {
		if (this.value === "hline") {
			canvas.freeDrawingBrush = hLinePatternBrush;
		} else if (this.value === "vline") {
			canvas.freeDrawingBrush = vLinePatternBrush;
		} else if (this.value === "square") {
			canvas.freeDrawingBrush = squarePatternBrush;
		} else if (this.value === "diamond") {
			canvas.freeDrawingBrush = diamondPatternBrush;
		} else if (this.value === "texture") {
			canvas.freeDrawingBrush = texturePatternBrush;
		} else {
			canvas.freeDrawingBrush = new fabric[this.value + "Brush"](canvas);
		}

		if (canvas.freeDrawingBrush) {
			const brush = canvas.freeDrawingBrush;
			brush.color = drawingLineColor.value;
			if (brush.getPatternSrc) {
				brush.source = brush.getPatternSrc.call(brush);
			}
			brush.width = parseInt(drawingLineWidth.value, 10) || 1;
			brush.shadow = new fabric.Shadow({
				blur: parseInt(drawingShadowWidth.value, 10) || 0,
				offsetX: 0,
				offsetY: 0,
				affectStroke: true,
				color: drawingShadowColor.value,
			});
		}
	};

	drawingLineColor.onchange = function () {
		const brush = canvas.freeDrawingBrush;
		brush.color = this.value;
		if (brush.getPatternSrc) {
			brush.source = brush.getPatternSrc.call(brush);
		}
	};

	drawingShadowColor.onchange = function () {
		canvas.freeDrawingBrush.shadow.color = this.value;
	};

	drawingLineWidth.onchange = function () {
		canvas.freeDrawingBrush.width = parseInt(this.value, 10) || 1;
		this.previousSibling.innerHTML = this.value;
	};

	drawingShadowWidth.onchange = function () {
		canvas.freeDrawingBrush.shadow.blur = parseInt(this.value, 10) || 0;
		this.previousSibling.innerHTML = this.value;
	};

	drawingShadowOffset.onchange = function () {
		canvas.freeDrawingBrush.shadow.offsetX = parseInt(this.value, 10) || 0;
		canvas.freeDrawingBrush.shadow.offsetY = parseInt(this.value, 10) || 0;
		this.previousSibling.innerHTML = this.value;
	};

	// Default dawring mode
	if (canvas.freeDrawingBrush) {
		canvas.freeDrawingBrush.color = drawingLineColor.value;
		// canvas.freeDrawingBrush.source = canvas.freeDrawingBrush.getPatternSrc.call(this);
		canvas.freeDrawingBrush.width = parseInt(drawingLineWidth.value, 10) || 1;
		canvas.freeDrawingBrush.shadow = new fabric.Shadow({
			blur: parseInt(drawingShadowWidth.value, 10) || 0,
			offsetX: 0,
			offsetY: 0,
			affectStroke: true,
			color: drawingShadowColor.value,
		});
	}
};
