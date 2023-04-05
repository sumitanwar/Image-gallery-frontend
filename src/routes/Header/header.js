import React from "react";
import "./Header.css";
function Header() {
  return (
    <>
      <header className="header_container">
        <div className="company_name_logo_container">
          <img src={"./imgs/logo.png"} className="logo_img" alt="img" />
          <h1 className="image_Gallery_app">Image Gallery</h1>
        </div>
      </header>
    </>
  );
}
export default Header;
