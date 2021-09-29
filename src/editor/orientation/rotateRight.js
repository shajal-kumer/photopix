import { $ } from "../../utils/utils.js";
export const rotateRight = (canvas) => {
	const state = {
		angle: 90,
	};
	$(".btn-rotate-right").addEventListener("click", (e) => {
		state.angle += 90;
		canvas.backgroundImage.rotate(state.angle);
		canvas.renderAll();
	});
};
