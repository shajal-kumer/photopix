import { $ } from "../../utils/utils.js";
export const rotate = (canvas) => {
	const state = {
		mouseDown: false,
	};
	$(".rotate-angle").addEventListener("mousedown", (e) => {
		state.mouseDown = true;
	});
	$(".rotate-angle").addEventListener("mousemove", (e) => {
		if (state.mouseDown) {
			canvas.backgroundImage.rotate(e.target.value);
			canvas.renderAll();
		}
	});
};
