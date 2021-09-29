// import { canvas } from "../../index";
import { addText } from "../../editor/text/addText";
import { $, canvas, rangeSlider, removeMaskObject } from "../../utils/utils";
export default function Text() {
	const template = `
    <ul class="dropdown text">
							<li>
								<p>Add some text to your artwork.</p>
								<h1 class="heading">Add Heading</h1>
								<h2 class="subheading">Add Subheading</h2>
								<h3 class="paragraph">Add Text</h3>
							</li>
                            <div class="text-format">
							<li>
								<div class="input-group">
									<label>Font Family</label>

									<select name="font-family" id="font-family" class="input-group__font-family">
									<option value="Impact">Impact</option>
                        <option value="Arial">Arial</option>
                        <option value="Verdana">Verdana</option>
                        <option value="Helvetica">Helvetica</option>
                        <option value="14">Optima</option>
                        <option value="Times New Roman">Times New Roman</option>
                        <option value="Consolas">Consolas</option>
                        <option value="Monaco">Monaco</option>
                        <option value="Comic Sans MS">Comic Sans MS</option>
                        <option value="Consolas">Consolas</option>
									</select>
								</div>
							</li>
							<li>
								 <label for="contrast">Font Size</label>
								<div class="range-wrap">
									<input
										type="range"
										min="0"
										max="100"
										value="50"
										step="1"
										class="text__font-size range"
										name="font-size"
									/>
									<output class="bubble"></output>
								</div>
							</li>
							<li>
								<div class="input-group">
									<label>Fill color</label>
									<input class="input input-group__fill-color" type="color" />
								</div>
							</li>
							<li>
								<div class="input-group">
									<label>Stroke color</label>
									<input class="input input-group__stroke-color" type="color" value="#ff0000" />
								</div>
							</li>
							<li>
							
                                <label for="contrast">Stroke Width</label>
								<div class="range-wrap">
									<input
										type="range"
										min="0"
										max="100"
										value="50"
										step="1"
										class="text__stroke-width range"
										name="stroke-width"
									/>
									<output class="bubble"></output>
								</div>
							</li>
							<li>
							
                                <div class="range-wrap">
                                <label>Opacity</label>
									<input
										type="range"
										min="0"
										max="100"
										value="1"
										step="1"
										class="text__opacity range"
										name="text__opacity"
									/>
									<output class="bubble"></output>
								</div>
							</li>
                            </div>
						</ul>`;

	$(".text-tab-item").addEventListener("click", (e) => {
		$(".filter-option-tab-content").innerHTML = template;
		removeMaskObject(canvas);
		addText(canvas);
		rangeSlider();

		$(".icon-box.active").classList.remove("active");
		$(".text-tab-item").classList.add("active");
	});
}
