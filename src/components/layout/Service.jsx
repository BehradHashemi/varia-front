import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Autoplay, Pagination, Navigation } from "swiper/modules";

import ServiceStyles from "../../assets/styles/Service.module.css";
import "../../assets/styles/Service.css";

import { servicesData } from "../../Data/service.js";

function Service() {
  const serviceData = servicesData.map((data) => {
    return (
      <SwiperSlide key={data.id}>
        <div className={ServiceStyles.container}>
          <img src={data.emoji} alt="icon" />
          <p>{data.title}</p>
        </div>
      </SwiperSlide>
    );
  });
  const pagination = {
    clickable: true,
    renderBullet: function (index, className) {
      return '<span class="' + className + '">' + (index + 1) + "</span>";
    },
  };
  return (
    <div className={ServiceStyles.div}>
      <h1
        style={{
          textAlign: "center",
          color: "#374BFF",
          fontSize: "2.5rem",
          fontWeight: "700",
        }}
      >
        خدمات ما
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
        spaceBetween={50}
        grabCursor={true}
        dir="rtl"
        pagination={
          (pagination,
          {
            el: "#pagination-show",
            bulletClass: "swiper-pagination-bullet",
            bulletActiveClass: "swiper-pagination-bullet-active",
          })
        }
        breakpoints={{
          640: {
            slidesPerView: 1,
          },
          768: {
            slidesPerView: 2,
          },
          1024: {
            slidesPerView: 3,
          },
        }}
        modules={[Pagination, Autoplay, Navigation]}
      >
        {serviceData}
      </Swiper>
      <div className={ServiceStyles.swiperButtons}>
        <div className={ServiceStyles.pagination}>
          <div id="pagination-show" style={{ color: "#000" }}></div>
        </div>
      </div>
    </div>
  );
}

export default Service;
