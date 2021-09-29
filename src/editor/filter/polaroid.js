import { $ } from "../../utils/utils.js";
export const polaroid = (applyFilter) => {
	$(".polaroid").addEventListener("click", (e) => {
		applyFilter(new fabric.Image.filters.Polaroid());
	});
};
