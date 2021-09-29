import { $ } from "../../utils/utils.js";
export const brownie = (applyFilter) => {
	$(".brownie").addEventListener("click", (e) => {
		applyFilter(new fabric.Image.filters.Brownie());
	});
};
