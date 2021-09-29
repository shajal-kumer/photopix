import axios from "axios";
import { $ } from "../../utils/utils.js";

let API_URL = "https://pixabay.com/api/?key=21500728-9d058448c15bc4303d450b8f5";

// exported the function to aside component
export const addImage = (canvas) => {
	canvas.set({ isDrawingMode: false });
	$(".dropdown.image").addEventListener("click", (e) => {
		fabric.Image.fromURL(
			e.target.src,
			(img) => {
				canvas.add(img);
				canvas.renderAll();
			},
			{ crossOrigin: "anonymous" }
		);
	});

	const queryImage = (url) => {
		axios
			.get(url)
			.then(function (response) {
				// console.log(response.data.hits);
				let html = "";
				response.data.hits.forEach((item) => {
					html += `<li><img src="${item.webformatURL}"/></li>`;
				});
				$(".image").innerHTML = html;
			})
			.catch(function (error) {
				console.log(error);
				$(".image").innerHTML = "<h3>No image loaded</h3>";
			});
	};
	queryImage(API_URL);

	const searchValue = $(".image-search__input");
	const searchSubmitBtn = $(".image-search__btn");
	searchSubmitBtn.addEventListener("click", (e) => {
		API_URL = `https://pixabay.com/api/?key=21500728-9d058448c15bc4303d450b8f5&q=${searchValue.value}&image_type=photo&pretty=true`;
		queryImage(API_URL);
	});
};
