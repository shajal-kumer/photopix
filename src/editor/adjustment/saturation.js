import { filters } from "../../../data/db";
import { $ } from "../../utils/utils.js";
export const saturation = (applyFilter) => {
	$(".saturation").addEventListener("change", (e) => {
		let value = e.target.value * 0.01;
		applyFilter(
			filters.indexOf("saturation"),
			new fabric.Image.filters.Saturation({
				saturation: parseFloat(value),
			})
		);
	});
};
