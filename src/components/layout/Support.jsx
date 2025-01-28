import SupportStyles from "../../assets/styles/Support.module.css";
import SupportImage from "../../assets/Picture/Banner_Support.png";
import { FaArrowLeft } from "react-icons/fa";
 

function Support() {
  return (
    <div className={SupportStyles.container}>
      <main>
        <h2>در تمام بخش های سایت همراه شما هستیم : )</h2>
        <h1>دیجیتال مارکتینگ وپشتیبانی سایت</h1>
        <p>
          در بخش خدمات دیجیتال مارکتینگ و پشتیبانی سایت، ما به شما راهکار هایی
          ارائه میکنیم که بتوانید سایت خود را به صفحات اول گوگل برسانید. با
          ارائه روش های سئو و بهینه سازی محتوای صفحات سایت و همچنین ارائه انواع
          روش های تبلیغاتی مثل، تبلیغات گوگل، پیامک، ایمیل و … ممی توانیم سایت
          شما را به نتایج اول گوگل برسانیم.
        </p>
        <div className={SupportStyles.buttons}>
          <a href="/support">
            نمونه کار ها
            <FaArrowLeft style={{ marginRight: "10px" }} />
          </a>
        </div>
      </main>
      <img src={SupportImage} alt="banner-3" />
    </div>
  );
}

export default Support;
