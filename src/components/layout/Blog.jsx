import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Autoplay, Pagination, Navigation } from "swiper/modules";

import BlogStyles from "../../assets/styles/Blog.module.css";
import "../../assets/styles//Blog.css";

import { GoArrowLeft } from "react-icons/go";
import { useEffect, useState } from "react";

import BlogsData from "../../Data/Blog.json";
 

function Blog() {
  const [blogs, setBlogs] = useState([]);
  useEffect(() => {
    setBlogs(BlogsData.Blogs);
  }, []);

  const pagination = {
    clickable: true,
    renderBullet: function (index, className) {
      return '<span class="' + className + '">' + (index + 1) + "</span>";
    },
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
        pagination={
          (pagination,
          {
            el: "#pagination-blog",
          })
        }
        breakpoints={{
          640: {
            slidesPerView: 2,
          },
          1024: {
            slidesPerView: 3,
          },
        }}
        modules={[Pagination, Autoplay, Navigation]}
      >
        {!blogs.length && (
          <>
            <SwiperSlide className={BlogStyles.loading}>
              <div className={BlogStyles.load}>
                <div className={BlogStyles.image}></div>
                <div className={BlogStyles.paragraph}></div>
              </div>
            </SwiperSlide>
            <SwiperSlide className={BlogStyles.loading}>
              <div className={BlogStyles.load}>
                <div className={BlogStyles.image}></div>
                <div className={BlogStyles.paragraph}></div>
              </div>
            </SwiperSlide>
            <SwiperSlide className={BlogStyles.loading}>
              <div className={BlogStyles.load}>
                <div className={BlogStyles.image}></div>
                <div className={BlogStyles.paragraph}></div>
              </div>
            </SwiperSlide>
            <SwiperSlide className={BlogStyles.loading}>
              <div className={BlogStyles.load}>
                <div className={BlogStyles.image}></div>
                <div className={BlogStyles.paragraph}></div>
              </div>
            </SwiperSlide>
          </>
        )}
        {blogs.map((d, i) => {
          const { title, date, description, cover } = d;
          return (
            <SwiperSlide key={i}>
              <div className={BlogStyles.container}>
                <img src={cover} alt="cover" />
                <h2>{title}</h2>
                <span>{date}</span>
                <p className={description.length >= 20 ? BlogStyles.fade : ""}>
                  {description}
                </p>
                <a href="/">
                  <GoArrowLeft color="#FF8B00" fontSize="2rem" />
                </a>
              </div>
            </SwiperSlide>
          );
        })}
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
