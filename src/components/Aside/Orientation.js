// import { canvas } from "../../index";
import { addOrientation } from "../../editor/orientation/addOrientation";
import { $, canvas, rangeSlider, removeMaskObject } from "../../utils/utils";
export default function Orientation() {
	const template = `<ul class="dropdown">
							<li>
								<button class="btn btn-orientation btn-rotate-left">
									<span class="material-icons"> rotate_left </span>Rotate Left
								</button>
							</li>
							<li>
								<button class="btn btn-orientation btn-rotate-right">
									<span class="material-icons"> rotate_right </span> Rotate Right
								</button>
							</li>
							<li>
								<button class="btn btn-orientation btn-flip-horizontal">
									<img src="image/horizontal-symmetry.svg" alt="" />
									Flip Horizontal
								</button>
							</li>
							<li>
								<button class="btn btn-orientation btn-flip-vertical">
									<img src="image/horizontal-symmetry.svg" alt="" />
									Flip Vertical
								</button>
							</li>
							<li>
								<div class="input-group">
									<label>Rotate</label>
									<div class="range-wrap">
										<input
											type="range"
											min="-45"
											max="45"
											value="0"
											class="range rotate-angle"
											name="rotate-angle"
										/>
										<output class="bubble rotate-bubble"></output>
									</div>
								</div>
							</li>
							<li>
								<button class="btn zoom-in">Zoom In</button>
								
							</li>
							<li>
							<button class="btn zoom-out">Zoom Out</button>
								
							</li>
						</ul>`;
	$(".orientation-tab-item").addEventListener("click", (e) => {
		$(".filter-option-tab-content").innerHTML = template;
		removeMaskObject(canvas);
		addOrientation(canvas);
		rangeSlider();

		$(".icon-box.active").classList.remove("active");
		$(".orientation-tab-item").classList.add("active");
	});
}
