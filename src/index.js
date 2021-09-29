import App from "./App";
import { domLoaded } from "./utils/utils";

const app = () => {
	// append html
	document.getElementById("app").appendChild(App());
	// after DOM loaded listen the event
	document.addEventListener("DOMContentLoaded", domLoaded);
};
app();
