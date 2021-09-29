import { filters } from "../../../data/db";
import { $ } from "../../utils/utils.js";
export const brightness = (applyFilter) => {
	$(".brightness").addEventListener("change", (e) => {
		let value = e.target.value * 0.01;
		applyFilter(
			filters.indexOf("brightness"),
			new fabric.Image.filters.Brightness({
				brightness: parseFloat(value),
			})
		);
	});
};
