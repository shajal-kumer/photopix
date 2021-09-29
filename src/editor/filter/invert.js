import { $ } from "../../utils/utils.js";
export const invert = (applyFilter) => {
	$(".invert").addEventListener("click", (e) => {
		applyFilter(new fabric.Image.filters.Invert());
	});
};
