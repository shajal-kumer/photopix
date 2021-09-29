import { createMusk } from "./createMask";
import { crop } from "./crop";

export const addCrop = (canvas) => {
	canvas.set({ isDrawingMode: false });

	let currentImage = canvas.backgroundImage;

	// create mask and insert to canvas
	const selectionRect = createMusk(canvas, currentImage);

	// Click the crop button to crop the masked area
	crop(canvas, selectionRect, currentImage);
};
