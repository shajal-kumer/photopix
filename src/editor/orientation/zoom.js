import { $ } from "../../utils/utils.js";
export const zoom = (canvas) => {
	const state = {
		scaleFactor: 1.1,
	};

	$(".zoom-in").addEventListener("click", (e) => {
		let { top, left } = canvas.getCenter();
		var zoom = canvas.getZoom();
		zoom *= state.scaleFactor;
		if (zoom > 20) zoom = 20;
		canvas.zoomToPoint({ x: top, y: left }, zoom);
	});

	$(".zoom-out").addEventListener("click", (e) => {
		let { top, left } = canvas.getCenter();
		var zoom = canvas.getZoom();
		zoom /= state.scaleFactor;
		if (zoom < 0.01) zoom = 0.01;
		canvas.zoomToPoint({ x: top, y: left }, zoom);
	});
};
