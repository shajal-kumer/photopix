const Header = () => {
	let template = `<header class="header">
				<div class="header__left">
					<a href="/" class="logo">Photopix</a>
				</div>
				<div class="header__middle">
                <input type="file" class="add_local_photo" />
					<span class="material-icons add__photo"> add_photo_alternate </span>
					<span class="material-icons undo" > undo </span>
					<span class="material-icons redo" > redo </span>
					            <a href="#" class="download-as-image"><span class="material-icons export"> file_download </span></a>
                    <select name="drawing-mode" id="drawing-mode">
                        <option value="edit">Edit Mode</option>  
                        <option value="drawing">Drawing Mode</option>
                    </select>
                    <span class="clear-canvas">Clear Frame</span>
				</div>
				<div class="header__right">
					
  <button class="sign-in-btn">Sign in</button>

				</div>
			</header>`;

	return template;
};

export default Header;
{
	/* <button class="sign-in-btn">Sign in</button> */
}
