import { $ } from "../../utils/utils.js";
import axios from "axios";

let API_URL = "https://api.mojilala.com/v1/stickers/trending?api_key=dc6zaTOxFJmzC";

// const API_URL = `https://cors-anywhere.herokuapp.com/https://api.iconfinder.com/v4/icons/search?query=dog&count=20&premium=false`;
const ICON_FINDER_TOKER = "tAxlS4pUIU6fwb4uMqZV3YduWyCi3yHdHMlezssz4YxJAAlpxTan5i1xvdd3mWoo";

export const addSticker = (canvas) => {
	canvas.set({ isDrawingMode: false });

	$(".dropdown.sticker").addEventListener("click", (e) => {
		fabric.Image.fromURL(
			e.target.src,
			(img) => {
				canvas.add(img);
				canvas.renderAll();
			},
			{ crossOrigin: "anonymous" }
		);
	});

	const querySticker = (url) => {
		axios
			.get(url)
			.then(function (response) {
				// console.log(response);

				const data = response.data.data.slice(1, 21);
				let html = "";
				data.forEach((item) => {
					html += `<li class="emoji"><img src="${item.images.fixed_height_medium.webp}" /></li>`;
				});
				$(".sticker").innerHTML = html;
			})
			.catch(function (error) {
				$(".sticker").innerHTML = "<li> Loading sticker Error </li>";
			});
	};
	querySticker(API_URL);

	const searchValue = $(".sticker-search__input");
	const searchSubmitBtn = $(".sticker-search__btn");
	searchSubmitBtn.addEventListener("click", (e) => {
		API_URL = `https://api.mojilala.com/v1/stickers/search?q=${searchValue.value}&api_key=dc6zaTOxFJmzC`;
		querySticker(API_URL);
		console.log(searchValue.value);
	});
};
