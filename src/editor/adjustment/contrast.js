import { filters } from "../../../data/db";
import { $ } from "../../utils/utils.js";
export const contrast = (applyFilter) => {
	$(".contrast").addEventListener("change", (e) => {
		let value = e.target.value * 0.01;
		applyFilter(
			filters.indexOf("contrast"),
			new fabric.Image.filters.Contrast({
				contrast: parseFloat(value),
			})
		);
	});
};
