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
import WriteBlog from "./components/shared/Authentication/WriteBlog";
import MyBlogs from "./components/shared/MyBlogs";
import ManageBlogs from "./components/shared/Authentication/Admin/MangeBlogs";
import ManageUsers from "./components/shared/Authentication/Admin/ManageUsers";
import ManageDetailBlog from "./components/shared/Authentication/Admin/ManageDetailBlog";
import ServicesList from "./components/shared/ServicesList";
import ServiceDetail from "./components/shared/ServiceDetail";
import ManageProducts from "./components/shared/Authentication/Admin/ManageProducts";
import NotFoundPage from "./components/shared/NotFoundPage";

// import ManageDetailProduct from "./components/shared/Authentication/Admin/ManageDetailProduct";

function App() {
  return (
    <>
      <Header></Header>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/contact" element={<ContactUs />} />
        <Route path="/blogs" element={<BlogList />} />
        <Route path="/blogs/:id" element={<DetailBlog />} />
        <Route path="/services" element={<ServicesList />} />
        <Route path="/services/:route" element={<ServiceDetail />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/admin-panel" element={<AdminPanel />} />
        <Route path="/write-blog" element={<WriteBlog />} />
        <Route path="/my-blogs" element={<MyBlogs />} />
        <Route path="/site-settings" element={<SiteSettings />} />
        <Route path="/manage-blogs" element={<ManageBlogs />} />
        <Route path="/manage-blogs/:id" element={<ManageDetailBlog />} />
        <Route path="/manage-users" element={<ManageUsers />} />
        <Route path="/manage-products/" element={<ManageProducts />} />
        {/* <Route path="/manage-products/:route" element={<ManageDetailProduct />} /> */}
        <Route path="/*" element={<NotFoundPage />} />
      </Routes>
      <Footer></Footer>

      <h4
        style={{
          width: "100%",
          height: "60px",
          textAlign: "center",
          margin: "0 auto 60px",
        }}
      >
        طراحی شده با ❤️ توسط{" "}
        <a href="https://behrad.liara.run" target="_blank">
          بهراد هاشمی
        </a>
      </h4>
    </>
  );
}

export default App;
