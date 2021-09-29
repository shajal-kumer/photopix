import { $ } from "../../utils/utils.js";
import { blackwhite } from "./blackwhite";
import { brownie } from "./brownie";
import { defaultFilter } from "./default";
import { grayscale } from "./grayScale.js";
import { invert } from "./invert";
import { kodachrome } from "./kodachrome";
import { polaroid } from "./polaroid";
import { sepia } from "./sepia";
import { technicolor } from "./technicolor";
import { vintage } from "./vintage";

export const addFilter = (canvas) => {
	canvas.set({ isDrawingMode: false });
	let webglBackend;
	try {
		webglBackend = new fabric.WebglFilterBackend();
	} catch (e) {
		console.log("webglBackend", e);
	}

	let canvas2dBackend = new fabric.Canvas2dFilterBackend();

	fabric.filterBackend = fabric.initFilterBackend();
	fabric.Object.prototype.transparentCorners = false;

	fabric.filterBackend = webglBackend;

	function applyFilter(filter) {
		let obj = canvas.backgroundImage;
		if (obj.filters.length > 0) obj.filters.pop();
		if (filter === null) {
			obj.applyFilters();
			canvas.renderAll();
			return;
		}
		obj.filters.push(filter);
		obj.applyFilters();
		canvas.renderAll();
	}

	const filterImages = $(".filter-img", true);

	// console.log(filterImages);

	let object = canvas.backgroundImage.cloneAsImage();
	const filters = [
		"BaseFilter",
		"Sepia",
		"Brownie",
		"Vintage",
		"Kodachrome",
		"Technicolor",
		"Polaroid",
		"Invert",
		"BlackWhite",
		"Grayscale",
	];

	filterImages.forEach((el, index) => {
		var filter = new fabric.Image.filters[filters[index]]();
		object.filters.pop();
		object.filters.push(filter);
		object.applyFilters();
		el.src = object._filteredEl.toDataURL();
	});

	sepia(applyFilter);
	brownie(applyFilter);
	vintage(applyFilter);
	kodachrome(applyFilter);
	technicolor(applyFilter);
	polaroid(applyFilter);
	invert(applyFilter);
	blackwhite(applyFilter);
	defaultFilter(applyFilter);
	grayscale(applyFilter);
};
