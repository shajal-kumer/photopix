// import { canvas } from "../../index";
import { addSticker } from "../../editor/sticker/addSticker";
import { $, canvas, removeMaskObject } from "../../utils/utils";
export default function Sticker() {
	const template = `
    <div class="sticker-search-wrap">
			<input type="text" class="input sticker-search__input" />
			<button type="submit" class="btn sticker-search__btn">Search</button>
		</div>
    <ul class="dropdown sticker"></ul>`;

	$(".sticker-tab-item").addEventListener("click", (e) => {
		$(".filter-option-tab-content").innerHTML = template;
		removeMaskObject(canvas);
		addSticker(canvas);

		$(".icon-box.active").classList.remove("active");
		$(".sticker-tab-item").classList.add("active");
	});
}
