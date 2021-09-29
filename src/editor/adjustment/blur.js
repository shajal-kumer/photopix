import { filters } from "../../../data/db";
import { $ } from "../../utils/utils.js";
export const blur = (applyFilter) => {
	$(".blur").addEventListener("change", (e) => {
		let value = e.target.value * 0.01;
		applyFilter(
			filters.indexOf("blur"),
			new fabric.Image.filters.Blur({
				blur: parseFloat(value),
			})
		);
	});
};
