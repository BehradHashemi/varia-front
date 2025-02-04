import { useState, useEffect } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import "../../assets/styles/Header.css";
import { BiMenuAltRight } from "react-icons/bi";
import { GoPerson } from "react-icons/go";
import { HiOutlineShoppingBag } from "react-icons/hi2";
import { HiMenuAlt3 } from "react-icons/hi";
import { FaTimes } from "react-icons/fa";
import { IoPersonSharp } from "react-icons/io5";
import { RiUserSettingsFill } from "react-icons/ri";
function Header() {
  const [menuOpen, setMenuOpen] = useState(true);
  const [user, setUser] = useState(
    () => JSON.parse(localStorage.getItem("user")) || null
  );
  const navigate = useNavigate();

  useEffect(() => {
    const handleStorageChange = () => {
      setUser(JSON.parse(localStorage.getItem("user")) || null);
    };
    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setUser(JSON.parse(localStorage.getItem("user")) || null);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
    navigate("/login");
  };
  return (
    <div className="header">
      {/* NavBar on Computer or Tablet */}
      <nav id="nav_1">
        <img src="/logo.svg" alt="logo" />
        <NavLink to="/list" id="list">
          <BiMenuAltRight style={{ fontSize: "1.5rem" }} /> لیست خدمات
        </NavLink>
        <NavLink to="/">صفحه اصلی</NavLink>
        <NavLink to="/gallery">نمونه کار</NavLink>
        <NavLink to="/contact">تماس با ما</NavLink>
        <NavLink to="/blogs">وبلاگ</NavLink>
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
        <NavLink to="/gallery">نمونه کار</NavLink>
        <NavLink to="/contact">تماس با ما</NavLink>
        <NavLink to="/blogs">وبلاگ</NavLink>
      </nav>

      <div>
        {user ? (
          <div id="btn_group">
            {user.userType === "admin" ? (
              <Link
                to="/admin-panel"
                id="admin"
                style={{
                  backgroundColor: "#374bff",
                  color: "#ff8b00",
                }}
              >
                <RiUserSettingsFill />
              </Link>
            ) : (
              ""
            )}
            <Link
              to="/dashboard"
              id="dashboard"
              style={{
                backgroundColor: "#374bff",
                color: "#ffffff",
                margin: "12px",
              }}
            >
              <IoPersonSharp />
            </Link>
            <NavLink to="/cart" id="cart">
              <HiOutlineShoppingBag />
            </NavLink>
          </div>
        ) : (
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
        )}
      </div>
    </div>
  );
}

export default Header;
