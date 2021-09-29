// import { canvas } from "../../index";
import { addFilter } from "../../editor/filter/addFilter";
import { $, canvas, removeMaskObject } from "../../utils/utils";
export default function Filter() {
	const template = `<ul class="dropdown filter">
							<li class="default-filter"><img class="filter-img"  src="" alt="" /> Default</li>
							<li class="sepia"><img class="filter-img"  src="" alt="" /> Sepia</li>
							<li class="brownie">
								<img class="filter-img"  src="" alt="" />
								Brownie
							</li>
							<li class="vintage"><img class="filter-img"  src="" alt="" />Vintage</li>
							<li class="kodachrome"><img class="filter-img"  src="" alt="" /> Kodachrome</li>
							<li class="technicolor"><img class="filter-img"  src="" alt="" /> Technicolor</li>
							<li class="polaroid"><img class="filter-img"  src="" alt="" /> Polaroid</li>
							<li class="invert"><img class="filter-img"  src="" alt="" /> Invert</li>
							<li class="blackwhite"><img class="filter-img"  src="" alt="" /> Black/White</li>
							<li class="grayscale"><img class="filter-img"  src="" alt="" /> Grayscale</li>
						</ul>`;

	$(".filter-tab-item").addEventListener("click", (e) => {
		$(".filter-option-tab-content").innerHTML = template;
		removeMaskObject(canvas);
		addFilter(canvas);
		$(".icon-box.active").classList.remove("active");
		$(".filter-tab-item").classList.add("active");
	});
}
