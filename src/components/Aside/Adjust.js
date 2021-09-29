// import { canvas } from "../../index";
import { addAdjustment } from "../../editor/adjustment/addAdjustment.js";
import { $, canvas, rangeSlider, removeMaskObject } from "../../utils/utils";

export default function Adjust() {
	const template = `<ul class="dropdown">
							<li>
								<label for="brightness">Brighness</label>
								<div class="range-wrap">
									<input
										type="range"
										min="-100"
										max="100"
										value="0"
										step="1"
										class="brightness range"
										name="brightness"
									/>
									<output class="bubble"></output>
								</div>
							</li>
							<li>
								<label for="contrast">Contrast</label>
								<div class="range-wrap">
									<input
										type="range"
										min="-100"
										max="100"
										value="0"
										step="1"
										class="contrast range"
										name="contrast"
									/>
									<output class="bubble"></output>
								</div>
							</li>
							<li>
								<label for="hue">Hue</label>
								<div class="range-wrap">
									<input
										type="range"
										min="-100"
										max="100"
										value="0"
										class="hue range"
										name="hue"
										step="1"
									/>
									<output class="bubble"></output>
								</div>
							</li>
							<li>
								<label for="saturation">Saturation</label>
								<div class="range-wrap">
									<input
										type="range"
										min="-100"
										max="100"
										step="1"
										value="0"
										class="saturation range"
										name="saturation"
									/>
									<output class="bubble"></output>
								</div>
							</li>
							<li>
								<label for="noise">Noise</label>
								<div class="range-wrap">
									<input
										type="range"
										min="0"
										max="1000"
										value="0"
										step="1"
										class="noise range"
										name="noise"
									/>
									<output class="bubble"></output>
								</div>
							</li>
							<li>
								<label for="pixelate">Pixelate</label>
								<div class="range-wrap">
									<input
										type="range"
										min="1"
										max="20"
										value="1"
										class="pixelate range"
										name="pixelate"
									/>
									<output class="bubble"></output>
								</div>
							</li>
							<li>
								<label for="blur">Blur</label>
								<div class="range-wrap">
									<input
										type="range"
										min="-100"
										max="100"
										value="0"
										step="1"
										class="blur range"
										name="blur"
									/>
									<output class="bubble"></output>
								</div>
							</li>
						</ul>`;

	$(".adjust-tab-item").addEventListener("click", (e) => {
		$(".filter-option-tab-content").innerHTML = template;
		addAdjustment(canvas);
		rangeSlider();
		removeMaskObject(canvas);
		$(".icon-box.active").classList.remove("active");
		$(".adjust-tab-item").classList.add("active");
	});
}
