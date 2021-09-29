import { $ } from "../../utils/utils.js";

export const circle = (canvas) => {
	$(".btn-circle").addEventListener("click", (e) => {
		const circle = new fabric.Circle({
			radius: 100,
			fill: "red",
			originX: "center",
			originY: "center",
			top: canvas.getHeight() / 2,
			left: canvas.getWidth() / 2,
		});
		canvas.add(circle);
	});

	canvas.on({
		"selection:updated": HandleElement,
		"selection:created": HandleElement,
	});

	function HandleElement(e) {
		// console.log(e.target);
	}
};
