import { useEffect, useMemo, useState } from "react";
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
        .from("VARIA-Blogs")
        .select("*")
        .eq("status", "approved")
        .order("date", { ascending: false })
        .limit(4);
      if (error) {
        throw error;
      } else {
        setBlogs(data);
      }
    } catch (error) {
      toast.error("خطا در دریافت وبلاگ!");
    } finally {
      setLoading(false);
    }
  };
  const allTags = useMemo(
    () => [...new Set(blogs.flatMap((blog) => blog.tags.split("،")))],
    [blogs]
  );
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
                  <p>{blog.author}</p>
                  <div
                    style={{
                      display: "flex",
                      gap: 1,
                      flexWrap: "wrap",
                      margin: "10px 0",
                    }}
                  >
                    {blog.tags.split("،").map((tag) => (
                      <span
                        style={{
                          background: "#FF8B00",
                          color: "#FFF",
                          borderRadius: "8px",
                          marginLeft: "5px",
                          padding: "5px",
                        }}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                    <Link
                      to={`/blogs/${blog.id}`}
                      style={{
                        display: "inline-flex",
                        justifyContent: "left",
                        alignItems: "center",
                        textAlign: "left",
                        color: "#fff",
                        background: "#374BFF",
                        borderRadius: "12px",
                        textTransform: "none",
                        fontWeight: "bold",
                        width: "min-width",
                      }}
                    >
                      مطالعه بیشتر
                      <GoArrowLeft color="#fff" fontSize="2rem" />
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
