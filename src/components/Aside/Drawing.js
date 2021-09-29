import { addDrawing } from "../../editor/drawing/addDrawing";
import { $, canvas, rangeSlider, removeMaskObject } from "../../utils/utils";

export default function Drawing() {
	const template = `<ul class="dropdown drawing">
							<li>
								<div class="input-group">
                              
									<label>Mode</label>
									<select name="mode" id="mode" class="input-group__mode drawing-mode-options">
										<option value="Pencil">Pencil</option>
										<option value="Circle">Circle</option>
										<option value="Spray">Spray</option>
										<option value="hline">Hline</option>
										<option value="vline">Vline</option>
										<option value="square">Square</option>
										<option value="diamond">Diamond</option>
										<option value="texture">Texture</option>
									</select>
								</div>
							</li>
							<li>
								<div class="input-group">
									<label>Line Width</label>
									<div class="range-wrap">
										<input
											type="range"
											min="0"
											max="100"
											value="30"
											class="range drawing-line-width"
											name="line-width"
										/>
										<output class="bubble"></output>
									</div>
								</div>
							</li>
							<li>
								<div class="input-group">
									<label>Line Color</label>
									<input type="color" value="#e66465" class="drawing-line-color" />
								</div>
							</li>
							<li>
								<div class="input-group">
									<label>Shadow Color</label>
									<input type="color" value="#e66465" class="drawing-shadow-color" />
								</div>
							</li>
							<li>
								<div class="input-group">
									<label>Shadow Width</label>
									<div class="range-wrap">
										<input
											type="range"
											min="0"
											max="100"
											value="0"
											class="drawing-shadow-width range"
											name="shadow-width"
										/>
										<output class="bubble"></output>
									</div>
								</div>
							</li>
							<li>
								<div class="input-group">
									<label>Shadow Offset</label>
									<div class="range-wrap">
										<input
											type="range"
											min="0"
											max="100"
											value="0"
											class="drawing-shadow-offset range"
											name="shadow-offset"
										/>
										<output class="bubble"></output>
									</div>
								</div>
							</li>
						</ul>`;
	$(".drawing-tab-item").addEventListener("click", (e) => {
		$(".filter-option-tab-content").innerHTML = template;
		removeMaskObject(canvas);
		addDrawing(canvas);
		rangeSlider();

		$(".icon-box.active").classList.remove("active");
		$(".drawing-tab-item").classList.add("active");
	});
}
