import { $ } from "../../utils/utils.js";
export const sepia = (applyFilter) => {
	$(".sepia").addEventListener("click", (e) => {
		applyFilter(new fabric.Image.filters.Sepia());
	});
};
