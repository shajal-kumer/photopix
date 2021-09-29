import filterImg from "../../image/magic-wand.svg";
import shapesImg from "../../image/shapes.svg";
import Adjust from "./Adjust";
import Crop from "./Crop";
import Drawing from "./Drawing";
import Filter from "./Filter";
import Image from "./Image";
import Orientation from "./Orientation";
import Shapes from "./Shapes";
import Sticker from "./Sticker";
import Text from "./Text";

// ranger slider dynamic tooltip code

export default function Aside() {
	document.addEventListener("DOMContentLoaded", (e) => {
		Drawing();
		Adjust();
		Filter();
		Orientation();
		Crop();
		Shapes();
		Text();
		Image();
		Sticker();
	});

	let template = `<aside class="sidebar__left">
				<ul>
					<li 
						class="icon-box drawing-tab-item d-flex justify-content-center w-100 align-item-center f-direction-c active"
					>
						<span class="material-icons left-menu-icon"> gesture </span>
						Drawing
					
					</li>

					<li class="icon-box adjust-tab-item d-flex justify-content-center w-100 align-item-center f-direction-c">
						<span class="material-icons left-menu-icon"> tune </span>Adjust
						
					</li>

					<li
						class="icon-box filter-tab-item filter-tab-item d-flex justify-content-center w-100 align-item-center f-direction-c"
					>
						<img class="left-menu-icon" src="${filterImg}" alt="" /> Filter
					
					</li>

					<li class="icon-box orientation-tab-item d-flex justify-content-center w-100 align-item-center f-direction-c">
						<span class="material-icons left-menu-icon"> flip </span> Orientation

						
					</li>

					<li class="icon-box crop-tab-item d-flex justify-content-center w-100 align-item-center f-direction-c">
						<span class="material-icons left-menu-icon"> crop </span> Crop
						
					</li>

					<li class="icon-box shapes-tab-item d-flex justify-content-center w-100 align-item-center f-direction-c">
						<img class="left-menu-icon" src="${shapesImg}" alt="" /> Shapes

						
					</li>

					<li class="icon-box  text-tab-item d-flex justify-content-center w-100 align-item-center f-direction-c">
						<span class="material-icons original__image left-menu-icon"> title </span> Text
						
					</li>

					<li
						class="icon-box  image-tab-item d-flex justify-content-center w-100 align-item-center f-direction-c"
					>
						<span class="material-icons original__image left-menu-icon"> image </span> Image

						
					</li>

					<li
						class="icon-box sticker-tab-item  d-flex justify-content-center w-100 align-item-center f-direction-c"
					>
						<span class="material-icons-outlined left-menu-icon"> emoji_symbols </span> Sticker

						
					</li>
				
				</ul>
                <div class="filter-option-tab-content">

                </div>
			</aside>`;

	return template;
}
