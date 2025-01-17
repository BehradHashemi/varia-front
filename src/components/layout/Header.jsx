import { useState } from "react";
import { NavLink } from "react-router-dom";
import "../../assets/styles/Header.css";

import { BiMenuAltRight } from "react-icons/bi";
import { GoPerson } from "react-icons/go";
import { HiOutlineShoppingBag } from "react-icons/hi2";
import { HiMenuAlt3 } from "react-icons/hi";
import { FaTimes } from "react-icons/fa";
function Header() {
  const [menuOpen, setMenuOpen] = useState(true);
  return (
    <div className="header">
      {/* NavBar on Computer or Tablet */}
      <nav id="nav_1">
        <img src="/logo.svg" alt="logo" />
        <NavLink to="/list" id="list">
          <BiMenuAltRight style={{ fontSize: "1.5rem" }} /> لیست خدمات
        </NavLink>
        <NavLink to="/">صفحه اصلی</NavLink>
        <NavLink to="/resume">نمونه کار</NavLink>
        <NavLink to="/contact">تماس با ما</NavLink>
        <NavLink to="/blog">وبلاگ</NavLink>
      </nav>
      <HiMenuAlt3
        className="menu"
        color="374BFF"
        onClick={() => {
          setMenuOpen(menuOpen);
          document.getElementById("nav_2").style.width = "45%";
        }}
      />
      <nav id="nav_2" className={menuOpen ? "open" : ""}>
        <FaTimes
          className="closeMenu"
          onClick={() => {
            document.getElementById("nav_2").style.width = "0";
          }}
        />
        <NavLink to="/list">
          <BiMenuAltRight style={{ fontSize: "1.5rem" }} /> لیست خدمات
        </NavLink>
        <NavLink to="/">صفحه اصلی</NavLink>
        <NavLink to="/resume">نمونه کار</NavLink>
        <NavLink to="/contact">تماس با ما</NavLink>
        <NavLink to="/blog">وبلاگ</NavLink>
      </nav>

      <div id="btn_group">
        <NavLink to="/login" id="login">
          <GoPerson />
          <span>|</span>
          ورود / ثبت نام
        </NavLink>
        <NavLink to="/cart" id="cart">
          <HiOutlineShoppingBag />
        </NavLink>
      </div>
    </div>
  );
}

export default Header;
