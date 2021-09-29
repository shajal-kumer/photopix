import { $ } from "../../utils/utils.js";
export const flipHorizontal = (canvas) => {
	const state = {
		isFliped: false,
	};
	$(".btn-flip-horizontal").addEventListener("click", (e) => {
		state.isFliped = state.isFliped ? false : true;

		canvas.backgroundImage.set("flipX", state.isFliped);
		canvas.renderAll();
	});
};
