import { $ } from "../../utils/utils.js";

export const subHeading = (canvas) => {
	const fontSize = 30;
	$(".subheading").addEventListener("click", (e) => {
		const subHeading = new fabric.Text("Add subheading", {
			textAlign: "center",
			fontSize,
			charSpacing: 2,
			originX: "center",
			originY: "center",
			top: canvas.getHeight() / 2,
			left: canvas.getWidth() / 2,
		});
		canvas.add(subHeading);
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
