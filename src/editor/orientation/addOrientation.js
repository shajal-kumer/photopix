import { flipVerticle } from "./flipVertical";
import { rotateLeft } from "./rotateLeft";
import { rotateRight } from "./rotateRight";
import { flipHorizontal } from "./flipHorizontal";
import { rotate } from "./rotate";
import { zoom } from "./zoom";

export const addOrientation = (canvas) => {
	canvas.set({ isDrawingMode: false });
	rotateLeft(canvas);
	rotateRight(canvas);
	flipVerticle(canvas);
	flipHorizontal(canvas);
	rotate(canvas);
	zoom(canvas);
};
