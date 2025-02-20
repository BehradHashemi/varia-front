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
                margin: "12px",
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
        <ul
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "0 8px",
            height: "60px",
          }}
        >
          <li>
            <NavLink to="/">
              <HomeIcon />
            </NavLink>
          </li>
          <li>
            <NavLink to="/services">
              <ListIcon />
            </NavLink>
          </li>
          <li>
            <NavLink to="/cart">
              <ShoppingBagIcon />
            </NavLink>
          </li>
          <li>
            <NavLink to="/contact">
              <ContactMailIcon />
            </NavLink>
          </li>
          <li>
            <NavLink to="/blogs">
              <DescriptionIcon />
            </NavLink>
          </li>
        </ul>
      </nav>
    </>
  );
}

export default Header;

{
  /* <Paper
        sx={{
          position: "fixed",
          bottom: 0,
          left: 0,
          right: 0,
          zIndex: 20,
          display: { xs: "block", md: "none" },
          width: "100%",
          borderTop: "1px solid #ddd",
        }}
        elevation={3}
      >
        <BottomNavigation
          value={value}
          // onChange={(event, newValue) => setValue(newValue)}
          // sx={{
          //   "& .Mui-selected": { color: "#374bff" },
          //   "& a:hover": { color: "#374bffcc" },
          //   paddingBottom: "8px",
          //   paddingTop: "8px",
          //   height: "60px",
          // }}
        >
          <BottomNavigationAction
            label="خانه"
            icon={<HomeIcon sx={{ fontSize: "1.5rem" }} />}
            component={NavLink}
            to="/"
            sx={{ color: value === 0 ? "#374bff" : "#666" }}
          />
          <BottomNavigationAction
            label="خدمات"
            icon={<ListIcon sx={{ fontSize: "1.5rem" }} />}
            component={NavLink}
            to="/services"
            sx={{ color: value === 1 ? "#374bff" : "#666" }}
          />
          <BottomNavigationAction
            label="وبلاگ"
            icon={<DescriptionIcon sx={{ fontSize: "1.5rem" }} />}
            component={NavLink}
            to="/blogs"
            sx={{ color: value === 1 ? "#374bff" : "#666" }}
          />
          <BottomNavigationAction
            label="سبد خرید"
            icon={<ShoppingBagIcon sx={{ fontSize: "1.5rem" }} />}
            component={NavLink}
            to="/cart"
            sx={{ color: value === 2 ? "#374bff" : "#666" }}
          />
          <BottomNavigationAction
            label="تماس"
            icon={<ContactMailIcon sx={{ fontSize: "1.5rem" }} />}
            component={NavLink}
            to="/contact"
            sx={{ color: value === 3 ? "#374bff" : "#666" }}
          />
        </BottomNavigation>
      </Paper> */
}
