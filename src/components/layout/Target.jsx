import TargetStyles from "../../assets/styles/Target.module.css";
import TargetImage from "../../assets/Picture/Banner_Target.png";
import { FaArrowLeft } from "react-icons/fa";

function Target() {
  return (
    <div className={TargetStyles.container}>
      <main>
        <h2>هدف را نشانه بگیرید، ما طراحی می‌کنیم!</h2>
        <h1>یک سایت بی‌نقص، یک قدم تا موفقیت آنلاین!</h1>
        <p>
          در دنیای دیجیتال، داشتن یک وب‌سایت حرفه‌ای یعنی زدن به مرکز هدف! در
          واریا، ما با طراحی مدرن، رابط کاربری جذاب و عملکرد سریع، کسب‌وکار شما
          را به سطحی بالاتر می‌بریم. هر سایت که طراحی می‌کنیم، دقیقاً مطابق نیاز
          شماست، چون باور داریم که هر برند، هویت و داستان خاص خودش را دارد.
        </p>
        <div className={TargetStyles.buttons}>
          <a href="/Target">
            نمونه کار ها
            <FaArrowLeft style={{ marginRight: "10px" }} />
          </a>
        </div>
      </main>
      <img src={TargetImage} alt="banner-3" />
    </div>
  );
}

export default Target;
