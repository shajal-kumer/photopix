export default function Main() {
	const template = `<main class="main">
				<div class="canvas-area">
                    <div class="upload-wrap">
					<input type="file" accept="image/png, image/jpeg, image/jpg" class="upload-wrap__image" id="" />
					<p>Click the "+" icon or drag files to upload your own images</p>
				</div>
				<canvas id="canvas" style="width: 100px; height: 100px"></canvas>
                </div>
                <div class="dashboard-sign-area">
                </div>
			</main>`;
	return template;
}
