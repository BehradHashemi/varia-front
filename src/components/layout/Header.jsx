import { useEffect, useState } from "react";
import { BottomNavigation, BottomNavigationAction, Paper } from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import ListIcon from "@mui/icons-material/List";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import ContactMailIcon from "@mui/icons-material/ContactMail";
import DescriptionIcon from "@mui/icons-material/Description";
import { Link, NavLink } from "react-router-dom";
import { RiUserSettingsFill } from "react-icons/ri";
import { IoPersonSharp } from "react-icons/io5";
import { MdFilterList } from "react-icons/md";
import { HiOutlineShoppingBag } from "react-icons/hi2";
import { createClient } from "@supabase/supabase-js";
import { CiLogin } from "react-icons/ci";
import "../../assets/styles/Header.css";
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

function Header() {
  const [value, setValue] = useState();
  const [user, setUser] = useState(null);
  const [role, setRole] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (user) {
        setUser(user);
        // درخواست نقش کاربر از دیتابیس
        const { data, error } = await supabase
          .from("profiles")
          .select("role")
          .eq("id", user.id)
          .single();

        if (!error && data) {
          setRole(data.role);
        }
      }
    };

    fetchUser();
  }, []);

  return (
    <>
      {/* هدر دسکتاپ */}
      <header className="header">
        <img src="/logo.png" alt="logo" />
        <nav id="nav_1">
          <NavLink to="/services" id="services">
            <MdFilterList fontSize="1.5rem" style={{ marginLeft: "5px" }} />
            لیست خدمات
          </NavLink>
          <NavLink to="/">صفحه اصلی</NavLink>
          <NavLink to="/gallery">نمونه کار</NavLink>
          <NavLink to="/contact">تماس با ما</NavLink>
          <NavLink to="/blogs">وبلاگ</NavLink>
        </nav>

        {/* دکمه‌های کاربر */}
        <div id="btn_group">
          {role === "admin" && (
            <Link
              id="admin"
              to="/admin-panel"
              style={{
                backgroundColor: "#374bff",
                color: "#ff8b00",
              }}
            >
              <RiUserSettingsFill />
            </Link>
          )}
          {user ? (
            <Link
              id="dashboard"
              to="/dashboard"
              style={{
                backgroundColor: "#374bff",
                color: "#ffffff",
                marginRight: "12px",
              }}
            >
              <IoPersonSharp />
            </Link>
          ) : (
            <NavLink to="/login" id="login">
              <CiLogin />
              <span>|</span>
              ورود / ثبت نام
            </NavLink>
          )}
          <Link to="/cart" id="cart">
            <HiOutlineShoppingBag />
          </Link>
        </div>
      </header>

      {/* منوی موبایل */}
      <nav id="nav_2">
        <NavLink to="/services">
          <ListIcon />
        </NavLink>
        <NavLink to="/cart">
          <ShoppingBagIcon />
        </NavLink>
        <NavLink to="/">
          <HomeIcon />
        </NavLink>
        <NavLink to="/contact">
          <ContactMailIcon />
        </NavLink>
        <NavLink to="/blogs">
          <DescriptionIcon />
        </NavLink>
      </nav>
    </>
  );
}

export default Header;
