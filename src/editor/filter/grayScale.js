import { $ } from "../../utils/utils.js";
export const grayscale = (applyFilter) => {
	$(".grayscale").addEventListener("click", (e) => {
		applyFilter(new fabric.Image.filters.Grayscale());
	});
};
