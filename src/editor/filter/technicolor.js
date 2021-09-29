import { $ } from "../../utils/utils.js";
export const technicolor = (applyFilter) => {
	$(".technicolor").addEventListener("click", (e) => {
		applyFilter(new fabric.Image.filters.Technicolor());
	});
};
