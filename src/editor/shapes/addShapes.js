import { circle } from "./circle";
import { polygon } from "./polygon";
import { rect } from "./rect";
import { square } from "./square";
import { triangle } from "./triangle";

export const addShapes = (canvas) => {
	canvas.set({ isDrawingMode: false });
	rect(canvas);
	circle(canvas);
	square(canvas);
	triangle(canvas);
	// polygon(canvas);
};
