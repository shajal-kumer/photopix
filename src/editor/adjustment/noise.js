import { filters } from "../../../data/db";
import { $ } from "../../utils/utils.js";
export const noise = (applyFilter) => {
	$(".noise").addEventListener("change", (e) => {
		applyFilter(
			filters.indexOf("noise"),
			new fabric.Image.filters.Noise({
				noise: parseInt(e.target.value, 10),
			})
		);
	});
};
