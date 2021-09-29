import { $ } from "../../utils/utils.js";
export const rotateLeft = (canvas) => {
	const state = {
		angle: -90,
	};
	$(".btn-rotate-left").addEventListener("click", (e) => {
		state.angle -= 90;
		canvas.backgroundImage.rotate(state.angle);
		canvas.renderAll();
	});
};
