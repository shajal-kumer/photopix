import { $ } from "../../utils/utils.js";

export const paragraph = (canvas) => {
	const fontSize = 18;
	$(".paragraph").addEventListener("click", (e) => {
		const paragraph = new fabric.Text("Add paragraph", {
			textAlign: "center",
			fontSize,
			charSpacing: 2,
			originX: "center",
			originY: "center",
			top: canvas.getHeight() / 2,
			left: canvas.getWidth() / 2,
		});
		canvas.add(paragraph);
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
