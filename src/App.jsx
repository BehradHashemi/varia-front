import { Route, Routes } from "react-router-dom";
import "./App.css";
import Header from "./components/layout/Header";
import HomePage from "./components/Home/HomePage";
import Footer from "./components/layout/Footer";
import Register from "./components/shared/Authentication/Register";
import LoginForm from "./components/shared/Authentication/Login";
import Dashboard from "./components/shared/Authentication/Dashboard";
import AdminPanel from "./components/shared/Authentication/Admin/AdminPanel";
import SiteSettings from "./components/shared/Authentication/Admin/SiteSettings";
import BlogList from "./components/shared/BlogList";
import DetailBlog from "./components/shared/DetailBlog";
import ContactUs from "./components/shared/ContactUs";
import Gallery from "./components/shared/Gallery";

function App() {
  return (
    <>
      <Header></Header>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/admin-panel" element={<AdminPanel />} />
        <Route path="/site-settings" element={<SiteSettings />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/blogs" element={<BlogList />} />
        <Route path="/blogs/:id" element={<DetailBlog />} />
        <Route path="/contact" element={<ContactUs />} />
        <Route path="/gallery" element={<Gallery />} />
      </Routes>
      <Footer></Footer>
      <div
        style={{
          width: "100%",
          background: "#ffffff",
          textAlign: "center",
        }}
      >
        <h4>
          طراحی شده با ❤️ توسط{" "}
          <a href="https://behrad.liara.run" target="_blank">
            بهراد هاشمی
          </a>
        </h4>
      </div>
    </>
  );
}

export default App;
