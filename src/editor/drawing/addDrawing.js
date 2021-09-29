import { draw } from "./draw.js";
export const addDrawing = (canvas) => {
	canvas.set({ isDrawingMode: true });
	draw(canvas);
};
