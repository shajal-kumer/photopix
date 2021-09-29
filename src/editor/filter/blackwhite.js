import { $ } from "../../utils/utils.js";
export const blackwhite = (applyFilter) => {
	$(".blackwhite").addEventListener("click", (e) => {
		applyFilter(new fabric.Image.filters.BlackWhite());
	});
};
