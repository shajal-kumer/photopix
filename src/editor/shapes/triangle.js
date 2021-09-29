import { $ } from "../../utils/utils.js";

export const triangle = (canvas) => {
	$(".btn-triangle").addEventListener("click", (e) => {
		const triangle = new fabric.Triangle({
			width: 200,
			height: 200,
			fill: "red",
			originX: "center",
			originY: "center",
			top: canvas.getHeight() / 2,
			left: canvas.getWidth() / 2,
		});
		canvas.add(triangle);
	});

	canvas.on({
		"selection:updated": HandleElement,
		"selection:created": HandleElement,
	});

	function HandleElement(e) {
		// console.log(e.target);
	}
};
