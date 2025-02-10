import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Autoplay, Pagination, Navigation } from "swiper/modules";

import BlogStyles from "../../assets/styles/Blog.module.css";
import "../../assets/styles/Blog.css";

import { GoArrowLeft } from "react-icons/go";
import { Link } from "react-router-dom";
import e2p from "../../utils/persianNumber";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

function Blog() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from("Fronck-Blogs")
        .select("*")
        .eq("status", "approved")
        .order("date", { ascending: false }) // مرتب‌سازی بر اساس جدیدترین مقاله
        .limit(4); // دریافت فقط ۴ مقاله‌ی آخر
      if (error) {
        throw error;
      }
      setBlogs(data);
    } catch (error) {
      console.error("خطا در دریافت مقالات:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={BlogStyles.div}>
      <h1
        style={{
          textAlign: "center",
          color: "#374BFF",
          fontSize: "2.5rem",
          fontWeight: "700",
        }}
      >
        مقالات
      </h1>
      <hr
        style={{
          width: "20%",
          border: "5px solid #FF8B00",
          borderRadius: " 5px",
          margin: "auto",
        }}
      />

      <Swiper
        grabCursor={true}
        spaceBetween={50}
        dir="rtl"
        pagination={{ clickable: true, el: "#pagination-blog" }}
        breakpoints={{
          640: { slidesPerView: 2 },
          1024: { slidesPerView: 3 },
        }}
        modules={[Pagination, Autoplay, Navigation]}
      >
        {loading
          ? Array.from({ length: 4 }).map((_, index) => (
              <SwiperSlide key={index} className={BlogStyles.loading}>
                <div className={BlogStyles.load}>
                  <div className={BlogStyles.image}></div>
                  <div className={BlogStyles.paragraph}></div>
                </div>
              </SwiperSlide>
            ))
          : blogs.map((blog) => (
              <SwiperSlide key={blog.id}>
                <div className={BlogStyles.container}>
                  <img src={blog.image} alt={blog.title} />
                  <h2>{blog.title}</h2>
                  <span>{e2p(blog.date)}</span>
                  <p>{blog.content.slice(0, 50)} ...</p>
                  <Link to={`/blogs/${blog.id}`}>
                    <GoArrowLeft color="#FF8B00" fontSize="2rem" />
                  </Link>
                </div>
              </SwiperSlide>
            ))}
      </Swiper>

      <div className={BlogStyles.swiperButtons}>
        <div className={BlogStyles.pagination}>
          <div id="pagination-blog" style={{ color: "#000" }}></div>
        </div>
      </div>
    </div>
  );
}

export default Blog;
