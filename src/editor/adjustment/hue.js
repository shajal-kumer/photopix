import { filters } from "../../../data/db";
import { $ } from "../../utils/utils.js";
export const hue = (applyFilter) => {
	$(".hue").addEventListener("change", (e) => {
		let value = e.target.value * 0.01;
		applyFilter(
			filters.indexOf("hue"),
			new fabric.Image.filters.HueRotation({
				rotation: value,
			})
		);
	});
};
