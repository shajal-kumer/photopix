import { $ } from "../../utils/utils.js";

export const polygon = (canvas) => {
	$(".btn-polygon").addEventListener("click", (e) => {
		const polygon = new fabric.Triangle(
			[
				{ x: 10, y: 10 },
				{ x: 50, y: 30 },
				{ x: 40, y: 70 },
				{ x: 60, y: 50 },
				{ x: 100, y: 150 },
				{ x: 40, y: 100 },
			],
			{
				width: 200,
				height: 200,
				fill: "red",
				originX: "center",
				originY: "center",
				top: canvas.getHeight() / 2,
				left: canvas.getWidth() / 2,
			}
		);
		canvas.add(polygon);
	});

	canvas.on({
		"selection:updated": HandleElement,
		"selection:created": HandleElement,
	});

	function HandleElement(e) {
		// console.log(e.target);
	}
};
