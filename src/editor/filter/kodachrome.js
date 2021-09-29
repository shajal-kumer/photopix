import { $ } from "../../utils/utils.js";
export const kodachrome = (applyFilter) => {
	$(".kodachrome").addEventListener("click", (e) => {
		applyFilter(new fabric.Image.filters.Kodachrome());
	});
};
