import ResumeStyles from "../../assets/styles/Resume.module.css";
import ResumeImage from "../../assets/Picture/Banner_Run.png";
import { FaArrowLeft } from "react-icons/fa";
import { Link } from "react-router-dom";
function Resume() {
  return (
    <div className={ResumeStyles.container}>
      <img src={ResumeImage} alt="banner-2" />
      <main>
        <h2>دقیقا مطابق با نیازتان می‌سازیم!</h2>
        <h1>طراحی سایت با ظاهر اختصاصی</h1>
        <p>
          وب سایت امروزه بیشترین و پر مخاطب ترین بستر برای افراد می باشد که به
          راحت ترین شکل ممکن می تواند کسب و کار شما را پرزنت کند.شما می توانید
          با داشتن یک وب سایت فروشگاهی حرفه ای، بدون هیچ محدودیتی بازار هدف خود
          را نه تنها در یک محله یا شهر خاص و بلکه در سطح کشور توسعه دهید و مشتری
          جذب کنید.
        </p>
        <div className={ResumeStyles.buttons}>
          <Link to="/resume">
            نمونه کار ها
            <FaArrowLeft style={{ marginRight: "10px" }} />
          </Link>
        </div>
      </main>
    </div>
  );
}

export default Resume;
