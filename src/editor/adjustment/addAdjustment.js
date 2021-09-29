import { blur } from "./blur";
import { brightness } from "./brightness";
import { contrast } from "./contrast";
import { hue } from "./hue";
import { noise } from "./noise";
import { pixelate } from "./pixelate";
import { saturation } from "./saturation";

export const addAdjustment = (canvas) => {
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
	// console.log(canvas);

	fabric.filterBackend = webglBackend;

	function applyFilter(index, filter) {
		let obj = canvas.backgroundImage;
		obj.filters[index] = filter;
		obj.applyFilters();
		canvas.requestRenderAll();
	}
	/*
	function applyFilterValue(index, prop, value, filter) {
		var obj = canvas.getActiveObject();
		if (obj.filters[index]) {
			obj.filters[index][prop] = value;
			obj.applyFilters();
			canvas.renderAll();
		} else {
			obj.filters[index] = filter;
			obj.applyFilters();
			canvas.renderAll();
		}
	}

    */

	brightness(applyFilter);
	contrast(applyFilter);
	saturation(applyFilter);
	hue(applyFilter);
	noise(applyFilter);
	pixelate(applyFilter);
	blur(applyFilter);
};
