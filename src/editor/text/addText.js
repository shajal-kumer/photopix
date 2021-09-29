import { heading } from "./heading.js";
import { paragraph } from "./paragraph.js";
import { subHeading } from "./subheading.js";
import { $ } from "../../utils/utils";

export const addText = (canvas) => {
	canvas.set({ isDrawingMode: false });
	heading(canvas);
	subHeading(canvas);
	paragraph(canvas);

	$(".text__font-size").addEventListener("change", (e) => {
		const activeObject = canvas.getActiveObject();
		activeObject.set("fontSize", e.target.value);
		canvas.renderAll();
	});
};
