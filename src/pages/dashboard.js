export default function Dashboard(data) {
	function printPhotoList(data) {
		if (data.length === 0) return "<div>No photos</div>";

		let html = "";

		data.forEach((el) => {
			html += `<div class="previewImgOuter" data-index="${el.index}" data-uuid="${el.uuid}"><img class="previewImg" src="${el.previewImg}" alt="canvas" /></div>
            `;
		});

		return html;
	}

	const template = `<div class="dashboard-wrapper">
            <h1>Your Photos</h1>

            <div class="previewImg-wrapper">
               ${printPhotoList(data)}
            </div>
      </div>
			</div>`;
	return template;
}
