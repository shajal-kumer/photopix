// import { canvas } from "../../index";
import { addImage } from "../../editor/image/addImage";
import { $, canvas, removeMaskObject } from "../../utils/utils";
export default function Adjust() {
	const template = `
     <div class="image-search-wrap">
			<input type="text" class="input image-search__input" />
			<button type="submit" class="btn image-search__btn">Search</button>
		</div>
    <ul class="dropdown image"></ul>`;

	$(".image-tab-item").addEventListener("click", (e) => {
		$(".filter-option-tab-content").innerHTML = template;
		removeMaskObject(canvas);
		addImage(canvas);
		$(".icon-box.active").classList.remove("active");
		$(".image-tab-item").classList.add("active");
	});
}
