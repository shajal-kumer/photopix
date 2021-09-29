import { filters } from "../../../data/db";
import { $ } from "../../utils/utils.js";
export const pixelate = (applyFilter) => {
	$(".pixelate").addEventListener("change", (e) => {
		applyFilter(
			filters.indexOf("pixelate"),
			new fabric.Image.filters.Pixelate({
				blocksize: parseInt(e.target.value, 10),
			})
		);
	});
};
