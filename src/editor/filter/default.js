import { $ } from "../../utils/utils.js";
export const defaultFilter = (applyFilter) => {
	$(".default-filter").addEventListener("click", (e) => {
		applyFilter(null);
	});
};
