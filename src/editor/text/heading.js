import { $ } from "../../utils/utils.js";

export const heading = (canvas) => {
	const fontSize = 50;

	$(".heading").addEventListener("click", (e) => {
		const heading = new fabric.Textbox("Add Heading", {
			textAlign: "center",
			fontSize,
			charSpacing: 2,
			originX: "center",
			originY: "center",
			top: canvas.getHeight() / 2,
			left: canvas.getWidth() / 2,
			width: 450,
		});
		canvas.add(heading);
		$(".text__font-size").value = fontSize;
	});

	canvas.on({
		"selection:updated": HandleElement,
		"selection:created": HandleElement,
	});

	function HandleElement(e) {
		// console.log(e.target);
	}
};
