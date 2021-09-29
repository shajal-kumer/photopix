import Aside from "./components/Aside/Aside";
import Header from "./components/Header";
import Main from "./components/Main";

function App() {
	const template = document.createElement("template");
	template.innerHTML = `
    <div class="container-fluid">
    ${Header()}
    ${Aside()}
    ${Main()}
    </div>
  `;

	// Return a new node from template
	return template.content.cloneNode(true);
}

export default App;
