import { $ } from "../../utils/utils.js";
export const vintage = (applyFilter) => {
	$(".vintage").addEventListener("click", (e) => {
		applyFilter(new fabric.Image.filters.Vintage());
	});
};
