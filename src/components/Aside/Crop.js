import { addCrop } from "../../editor/crop/addCrop";
import { $, canvas, removeMaskObject } from "../../utils/utils";
// import { canvas } from "../../index";

export default function Crop() {
	const template = `<ul class="dropdown crop">
							<li>
								<button class="btn btn-crop">Crop</button>
							</li>
						</ul>`;

	$(".crop-tab-item").addEventListener("click", (e) => {
		$(".filter-option-tab-content").innerHTML = template;
		removeMaskObject(canvas);
		addCrop(canvas);

		$(".icon-box.active").classList.remove("active");
		$(".crop-tab-item").classList.add("active");
	});
}
