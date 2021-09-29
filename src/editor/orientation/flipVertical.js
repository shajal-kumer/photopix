import { $ } from "../../utils/utils.js";
export const flipVerticle = (canvas) => {
	const state = {
		isFliped: false,
	};
	$(".btn-flip-vertical").addEventListener("click", (e) => {
		state.isFliped = state.isFliped ? false : true;
		canvas.backgroundImage.set("flipY", state.isFliped);
		canvas.renderAll();
	});
};
