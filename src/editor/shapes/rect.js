import { $ } from "../../utils/utils.js";

export const rect = (canvas) => {
	$(".btn-rect").addEventListener("click", (e) => {
		const rect = new fabric.Rect({
			width: 300,
			height: 200,
			fill: "green",
			originX: "center",
			originY: "center",
			top: canvas.getHeight() / 2,
			left: canvas.getWidth() / 2,
		});
		canvas.add(rect);
	});

	canvas.on({
		"selection:updated": HandleElement,
		"selection:created": HandleElement,
	});

	function HandleElement(e) {
		// console.log(e.target);
	}
};
