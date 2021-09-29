import { $ } from "../../utils/utils.js";

export const square = (canvas) => {
	$(".btn-square").addEventListener("click", (e) => {
		const square = new fabric.Rect({
			width: 200,
			height: 200,
			fill: "green",
			originX: "center",
			originY: "center",
			top: canvas.getHeight() / 2,
			left: canvas.getWidth() / 2,
		});
		canvas.add(square);
	});

	canvas.on({
		"selection:updated": HandleElement,
		"selection:created": HandleElement,
	});

	function HandleElement(e) {
		// console.log(e.target);
	}
};
