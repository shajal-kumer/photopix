// import { canvas } from "../../index";
import { addShapes } from "../../editor/shapes/addShapes";
import { $, canvas, removeMaskObject } from "../../utils/utils";
export default function Shapes() {
	const template = `<ul class="dropdown shapes">
							<li>
								<button class="btn btn-rect btn-orientation btn-flip-vertical">
									<span class="material-icons"> crop_din </span>
									Rectangle
								</button>
							</li>
							<li>
								<button class="btn btn-square btn-orientation btn-flip-vertical">
									<span class="material-icons"> crop_square </span>
									Square
								</button>
							</li>
							<li>
								<button class="btn btn-circle btn-orientation btn-flip-vertical">
									<span class="material-icons-outlined"> circle </span>
									Circle
								</button>
							</li>
							<li>
								<button class="btn btn-triangle btn-orientation btn-flip-vertical">
									<span class="material-icons-outlined"> change_history </span>
									Triangle
								</button>
							</li>
							
						</ul>`;

	$(".shapes-tab-item").addEventListener("click", (e) => {
		$(".filter-option-tab-content").innerHTML = template;

		removeMaskObject(canvas);
		addShapes(canvas);
		$(".icon-box.active").classList.remove("active");
		$(".shapes-tab-item").classList.add("active");
	});
}
