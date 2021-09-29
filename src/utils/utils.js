import { fabric } from "fabric";
import "fabric-history";
import Toastify from "toastify-js";
import "toastify-js/src/toastify.css";
import { v1 as uuidv1 } from "uuid";
import Dashboard from "../pages/dashboard";
import Signin from "../pages/signin";

//  gloval variable

export let canvas = null;
let mousePressed = false;
let currentMode = null;
const modes = {
	edit: "edit",
	drawing: "drawing",
};

// Helper Functions
export const $ = function (selector, all = false) {
	if (!all) return document.querySelector(selector);
	else return document.querySelectorAll(selector);
};

// range slider for control input type range
export const rangeSlider = () => {
	$(".range-wrap", true).forEach((wrap) => {
		const range = wrap.querySelector(".range");
		const bubble = wrap.querySelector(".bubble");
		range.addEventListener("input", () => {
			setBubble(range, bubble);
		});
		setBubble(range, bubble);
	});
};

// Set bubble for tooltip
function setBubble(range, bubble) {
	const val = range.value;
	const min = range.min ? range.min : -100;
	const max = range.max ? range.max : 100;
	const newVal = Number(((val - min) * 100) / (max - min));
	bubble.innerHTML = val;

	// Sorta magic numbers based on size of the native UI thumb
	bubble.style.left = `calc(${newVal}% + (${8 - newVal * 0.15}px))`;
}

// control the canvas zoom in and out by mouse wheel
const zoomOnMouseWheel = (canvas) => {
	canvas.on("mouse:wheel", function (opt) {
		var delta = opt.e.deltaY;
		var zoom = canvas.getZoom();
		zoom *= 0.999 ** delta;
		if (zoom > 20) zoom = 20;
		if (zoom < 0.01) zoom = 0.01;
		canvas.zoomToPoint({ x: opt.e.offsetX, y: opt.e.offsetY }, zoom);
		opt.e.preventDefault();
		opt.e.stopPropagation();
	});
};

// remove mask Object from canvas
export const removeMaskObject = (canvas) => {
	const activeObjet = canvas.getActiveObject();

	try {
		if (activeObjet.id === "mask") {
			canvas.remove(activeObjet);
		}
	} catch (error) {}
};

// after DOM content loaded run the function
export function domLoaded() {
	// init canvas
	canvas = initCanvas();

	// At init set sidebar opacity lower
	$(".sidebar__left").style.opacity = 0.7;

	// canvas.preserveObjectStacking = true;

	// On window resize fit the canvas window
	window.onresize = () => {
		fitResponsiveCanvas(canvas);
	};

	// fit the Canvas  window based on window size
	fitResponsiveCanvas(canvas);

	// Image upload hadnler
	uplaodImageHandler(canvas);

	// enable zoomm in or out on mouse wheel
	zoomOnMouseWheel(canvas);

	// delete selected canvas object
	deleteSelectedObject(canvas);

	// save or download edited or drawing image
	$(".download-as-image").addEventListener("click", downloadImage);

	//  Undo redo keyboard shortcut functionality
	document.addEventListener("keyup", ({ keyCode, ctrlKey }) => {
		if (!ctrlKey) {
			return;
		}
		if (keyCode === 90) {
			canvas.undo();
		}
		if (keyCode === 89) {
			canvas.redo();
		}
	});
	// undo action
	undo(canvas);

	// undo action
	redo(canvas);

	addLocalPhoto(canvas);

	// select canvas mode ==> drawing or editing
	selectDrawingMode(canvas);

	// clear canvas
	clearCanvas(canvas);

	/// set pan mode so we can mode bg image by mouse press
	// setPanEvent(canvas);

	loadSignInUpPage();

	moveHome();
}
window.onpopstate = function (e) {
	console.log(e.state);
};

window.onload = function () {
	checkLoggedIn();
};
function checkLoggedIn() {
	const data = JSON.parse(localStorage.getItem("user"));
	if (data.isLoggedIn) {
		console.log("Logged In");
		$(".header__right").innerHTML = accountHTML(data.name);

		$(".account-icon").addEventListener("click", (e) => {
			$(".account-wrap nav").classList.toggle("active");
		});

		logout();
		saveImage();
		moveDashboard();
	} else {
		if (location.pathname === "/dashboard") {
			history.pushState({}, "Home", "/");
		}
	}
}

const accountHTML = (name) => {
	const template = `
                    <div class="account-wrap">
                        <button class="save_image_btn ">Save</button>
                        <span class="name">Welcome ${name}</span>
                        <div class="account-icon">
                            <span class="material-icons-outlined"> account_circle </span>
                        </div>
                        <nav>
                            <ul>
                                <li><a href="/dashboard" class="dashboard">Dashboard</a></li>
                                <li><a href="/logout" class="logout">logout</a></li>
                            </ul>
                        </nav>
                    </div>
                `;
	return template;
};

async function loadDashboardHTML() {
	$(".canvas-area").style.display = "none";
	$(".dashboard-sign-area").style.display = "block";

	$(".sidebar__left").style.display = "grid";
	$(".container-fluid").style.gridTemplateAreas = `"header header" "sidebar main"`;

	const token = localStorage.getItem("token");
	const result = await fetch("http://localhost:5000/dashboard", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({ token }),
	}).then((res) => res.json());

	// console.log(result);
	if (result.status == "ok") {
		const imageArray = [];
		result.data.forEach((el, index) => {
			const img = JSON.parse(el);
			const cloneImg = { ...img };
			delete cloneImg.id;
			delete cloneImg.previewImg;
			imageArray[index] = {
				previewImg: img.previewImg,
				uuid: img.id,
				index,
				canvasImg: JSON.stringify(cloneImg),
			};
		});
		$(".dashboard-sign-area").innerHTML = Dashboard(imageArray);
		localStorage.setItem("photos", JSON.stringify(imageArray));
	} else {
		$(".dashboard-sign-area").innerHTML = Dashboard([]);
		alert(result.error);
		console.log(result);
	}

	const allPrevImg = $(".previewImgOuter", true);
	allPrevImg.forEach((el) => {
		el.addEventListener("click", (e) => {
			const index = el.dataset.index;
			const photos = JSON.parse(localStorage.getItem("photos"));
			const jsonImg = photos[index].canvasImg;
			// console.log(photos[index].canvasImg);

			const uuid = photos[index].uuid;
			localStorage.setItem("uuid", uuid);

			$(".canvas-area").style.display = "block";
			$(".dashboard-sign-area").style.display = "none";
			// console.log(canvas);
			// canvas.loadFromJSON(photos[index].canvasImg);
			canvas.loadFromJSON(photos[index].canvasImg, function () {
				canvas.set({ isDrawingMode: true });
				$(".sidebar__left ul").style.pointerEvents = "auto";
				$(".canvas-container").style.opacity = 1;
				$(".canvas-container").style.zIndex = 9;
				$(".upload-wrap").style.display = "none";
				$(".sidebar__left ul").style.pointerEvents = "auto";
				$(".sidebar__left").style.opacity = 1;
				$(".drawing-tab-item").classList.add("active");
				$(".drawing-tab-item").click();
			});
		});
	});
}
function loadHomeHTML() {
	//
	$(".sidebar__left").style.display = "grid";
	$(".container-fluid").style.gridTemplateAreas = `"header header" "sidebar main"`;

	//
	$(".dashboard-sign-area").style.display = "none";
	$(".canvas-area").style.display = "block";
}

function loadSignInUpPage() {
	// on click load sign up page
	$(".sign-in-btn").addEventListener("click", (e) => {
		//
		$(".sidebar__left").style.display = "none";
		$(".container-fluid").style.gridTemplateAreas = `"header header" "main main"`;

		//
		$(".canvas-area").style.display = "none";
		$(".dashboard-sign-area").innerHTML = Signin();

		const loginText = document.querySelector(".title-text .login");
		const loginForm = document.querySelector("form.login");
		const loginBtn = document.querySelector("label.login");
		const signupBtn = document.querySelector("label.signup");
		const signupLink = document.querySelector("form .signup-link a");
		const signupForm = document.querySelector(".form-container .form-inner .signup");
		signupBtn.onclick = () => {
			loginForm.style.marginLeft = "-50%";
			loginText.style.marginLeft = "-50%";
			signupForm.style.display = "block";
		};
		loginBtn.onclick = () => {
			loginForm.style.marginLeft = "0%";
			loginText.style.marginLeft = "0%";
			signupForm.style.display = "none";
		};
		signupLink.onclick = () => {
			signupBtn.click();
			return false;
		};

		login(loginForm);

		signup(signupForm);
	});
	generateUUID();
}

function login(loginForm) {
	loginForm.addEventListener("submit", async (e) => {
		e.preventDefault();
		const email = loginForm.email.value;
		const password = loginForm.password.value;

		const result = await fetch("http://localhost:5000/login", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				email,
				password,
			}),
		}).then((res) => res.json());
		if (result.status == "ok") {
			console.log(result.data);
			result.data.isLoggedIn = true;
			localStorage.setItem("user", JSON.stringify(result.data));
			localStorage.setItem("token", result.data.token);
			$(".header__right").innerHTML = accountHTML(result.data.name);

			history.pushState({}, "Dashboard", "/dashboard");
			loadDashboardHTML();
			logout();
			saveImage();
			moveDashboard();

			Toastify({
				text: "Successfully Login",
				duration: 3000,
				newWindow: true,
				close: true,
				gravity: "bottom", // `top` or `bottom`
				position: "right", // `left`, `center` or `right`
				style: {
					background: "linear-gradient(to right, #00b09b, #96c93d)",
				},
			}).showToast();
			$(".account-icon").addEventListener("click", (e) => {
				$(".account-wrap nav").classList.toggle("active");
			});
			$(".canvas-area").addEventListener("click", (e) => {
				$(".account-wrap nav").classList.remove("active");
			});
			$(".dashboard-sign-area").addEventListener("click", (e) => {
				$(".account-wrap nav").classList.remove("active");
			});
			$(".main").addEventListener("click", (e) => {
				$(".account-wrap nav").classList.remove("active");
			});
		} else {
			alert(result.error);
		}
	});
}

function signup(signupForm) {
	signupForm.addEventListener("submit", async (e) => {
		e.preventDefault();
		const name = signupForm.name.value;
		const email = signupForm.email.value;
		const password = signupForm.password.value;
		console.log(name, email, password);

		const result = await fetch("http://localhost:5000/signup", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				name,
				email,
				password,
			}),
		}).then((res) => res.json());

		if (result.status == "ok") {
			// console.log(result.data);
			result.data.isLoggedIn = true;
			localStorage.setItem("user", JSON.stringify(result.data));
			localStorage.setItem("token", result.data.token);
			$(".header__right").innerHTML = accountHTML(result.data.name);

			history.pushState({}, "Dashboard", "/dashboard");
			loadDashboardHTML();
			logout();
			saveImage();
			moveDashboard();

			Toastify({
				text: "Successfully Signup",
				duration: 3000,
				newWindow: true,
				close: true,
				gravity: "bottom", // `top` or `bottom`
				position: "right", // `left`, `center` or `right`
				style: {
					background: "linear-gradient(to right, #00b09b, #96c93d)",
				},
			}).showToast();

			$(".account-icon").addEventListener("click", (e) => {
				$(".account-wrap nav").classList.toggle("active");
			});
			$(".canvas-area").addEventListener("click", (e) => {
				$(".account-wrap nav").classList.remove("active");
			});
			$(".dashboard-sign-area").addEventListener("click", (e) => {
				$(".account-wrap nav").classList.remove("active");
			});
		} else {
			alert(result.error);
		}
	});
}

function logout() {
	$(".logout").addEventListener("click", (e) => {
		e.preventDefault();
		fetch("http://localhost:5000/logout", {
			method: "GET",
		})
			.then((res) => res.json())
			.then((result) => {
				history.pushState({}, "Home", "/");
				console.log(result);
				const data = JSON.parse(localStorage.getItem("user"));
				data.isLoggedIn = false;
				localStorage.setItem("user", JSON.stringify(data));
				localStorage.setItem("token", "");
				// loadHomeHTML();
				location.assign("/");
				// history.pushState({}, "Home", "/");
				checkLoggedIn();
				Toastify({
					text: "Successfully Logout",
					duration: 3000,
					newWindow: true,
					close: true,
					gravity: "bottom", // `top` or `bottom`
					position: "right", // `left`, `center` or `right`
					style: {
						background: "linear-gradient(to right, #00b09b, #96c93d)",
					},
				}).showToast();
			})
			.catch((e) => console.log(e));
		console.log("Logout");
	});
}

// save  edited or drawing image
async function saveImage(e) {
	$(".save_image_btn ").addEventListener("click", saveToServer);
}
async function saveToServer() {
	const token = localStorage.getItem("token");

	const photo = canvas.toObject();
	// const photo = JSON.stringify(canvas);
	const previewImg = canvas.toDataURL({
		format: "jpeg",
		quality: 0.5,
	});
	const uuid = localStorage.getItem("uuid");
	photo.id = uuid;
	photo.previewImg = previewImg;
	console.log(photo);
	const result = await fetch("http://localhost:5000/photo", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({
			photo: photo,
			token,
		}),
	})
		.then((res) => res.json())
		.catch((err) => {
			Toastify({
				text: "Image does not update",
				duration: 3000,
				newWindow: true,
				close: true,
				gravity: "bottom", // `top` or `bottom`
				position: "right", // `left`, `center` or `right`
				style: {
					background: "linear-gradient(to right, #00b09b, #96c93d)",
				},
			}).showToast();

			console.log(err);
		});

	if (result.status == "ok") {
		console.log(result.data);
		Toastify({
			text: "Successfully Saved Image",
			duration: 3000,
			newWindow: true,
			close: true,
			gravity: "bottom", // `top` or `bottom`
			position: "right", // `left`, `center` or `right`
			style: {
				background: "linear-gradient(to right, #00b09b, #96c93d)",
			},
		}).showToast();
	} else {
	}
}

function generateUUID() {
	let uuid = uuidv1();
	if (localStorage.getItem("uuid") === null) {
		localStorage.setItem("uuid", uuid);
	}
}

function moveDashboard() {
	$(".dashboard").addEventListener("click", (e) => {
		e.preventDefault();
		history.pushState({}, "Dashboard", "/dashboard");

		// $(".sidebar__left").style.display = "none";
		// $(".container-fluid").style.gridTemplateAreas = `"header header" "main main"`;

		loadDashboardHTML();
	});
}
function moveHome() {
	$(".logo").addEventListener("click", (e) => {
		e.preventDefault();

		history.pushState({}, "Home", "/");
		loadHomeHTML();
	});
}

// initialization canvas
const initCanvas = () => {
	return new fabric.Canvas("canvas", {
		preserveObjectStacking: true,
	});
};

// fit the Canvas  window based on window size
function fitResponsiveCanvas(canvas) {
	canvas.setHeight(window.innerHeight - 65);
	canvas.setWidth(window.innerWidth - 400);
	canvas.renderAll();
}

// Image upload hadnler
const uplaodImageHandler = (canvas) => {
	$(".upload-wrap__image").addEventListener("change", (e) => {
		$(".canvas-container").style.opacity = 1;
		$(".canvas-container").style.zIndex = 9;
		$(".upload-wrap").style.display = "none";

		// create a new object for file reader
		const reader = new FileReader();

		// get the file link
		const file = e.target.files[0];

		// read the file
		reader.readAsDataURL(file);

		// after load the file --> create new image
		reader.onload = function () {
			fabric.Image.fromURL(reader.result, (img) => {
				img.scaleToHeight(canvas.getHeight());
				img.scaleToWidth(canvas.getWidth());
				canvas.setBackgroundImage(img);
				canvas.centerObject(img);
				canvas.renderAll();
			});
			$(".sidebar__left ul").style.pointerEvents = "auto";
			$(".sidebar__left").style.opacity = 1;
			$(".drawing-tab-item").classList.add("active");
			$(".drawing-tab-item").click();
			currentMode = "edit";
		};
	});
};

// delete selected canvas object
const deleteSelectedObject = (canvas) => {
	window.addEventListener("keydown", (e) => {
		if (e.key === "Delete" && canvas.getActiveObject()) {
			canvas.remove(canvas.getActiveObject());
		}
	});
};

// download edited or drawing image
function downloadImage(e) {
	this.href = canvas.toDataURL({
		format: "jpeg",
		quality: 0.8,
	});
	this.download = "canvas.png";
}

// undo action
const undo = (canvas) => {
	const undo = document.querySelector(".undo");
	undo.addEventListener("click", (e) => {
		canvas.undo();
	});
};

// redo action
const redo = (canvas) => {
	const redo = document.querySelector(".redo");

	redo.addEventListener("click", (e) => {
		canvas.redo();
	});
};

const addLocalPhoto = (canvas) => {
	$(".add_local_photo").addEventListener("change", (e) => {
		// create a new object for file reader
		const reader = new FileReader();

		// get the file link
		const file = e.target.files[0];

		// read the file
		reader.readAsDataURL(file);

		// after load the file --> create new image
		reader.onload = function () {
			fabric.Image.fromURL(reader.result, (img) => {
				canvas.add(img);
				canvas.renderAll();
			});
		};
	});
};

// select canvas mode ==> drawing or editing
const selectDrawingMode = (canvas) => {
	document.querySelector("#drawing-mode").addEventListener("change", (e) => {
		if (e.target.value === "drawing") {
			currentMode = modes[e.target.value];
			canvas.set({ isDrawingMode: true });
			$(".sidebar__left ul").style.pointerEvents = "auto";
			$(".canvas-container").style.opacity = 1;
			$(".canvas-container").style.zIndex = 9;
			$(".upload-wrap").style.display = "none";
			$(".sidebar__left ul").style.pointerEvents = "auto";
			$(".sidebar__left").style.opacity = 1;
			$(".drawing-tab-item").classList.add("active");
			$(".drawing-tab-item").click();
		} else {
			currentMode = modes[e.target.value];
			$(".sidebar__left ul").style.pointerEvents = "auto";
			canvas.set({ isDrawingMode: false });
			$(".canvas-container").style.opacity = 0;
			$(".canvas-container").style.zIndex = -9;
			$(".upload-wrap").style.display = "block";
			$(".sidebar__left").style.opacity = 0.7;
			$(".drawing-tab-item").classList.remove("active");
		}
		canvas.clear();
	});
};

// clear canvas
const clearCanvas = (canvas) => {
	document.querySelector(".clear-canvas").addEventListener("click", () => {
		canvas.clear();
		canvas.clearHistory();
		localStorage.setItem("uuid", uuidv1());
	});
};

// set pan mode so we can mode bg image by mouse press
const setPanEvent = (canvas) => {
	// mouse over
	let canvasDrawingMode = true;
	canvas.on("mouse:move", (event) => {
		if (mousePressed && currentMode === modes.edit && !canvasDrawingMode) {
			canvas.setCursor("grab");
			const mEvent = event.e;
			const delta = new fabric.Point(mEvent.movementX, mEvent.movementY);
			canvas.relativePan(delta);
		}
	});

	// kep track of mouse down/up
	canvas.on("mouse:down", (event) => {
		mousePressed = true;
		if (currentMode === modes.edit) {
			canvasDrawingMode = canvas.get("isDrawingMode");
			canvas.setCursor("grab");
		}
	});
	canvas.on("mouse:up", (event) => {
		mousePressed = false;
		canvas.setCursor("default");
	});
};
