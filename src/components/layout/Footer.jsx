 
import FooterStyles from "../../assets/styles/Footer.module.css";

import enamad from "/enamad.png";
import instagram from "/instagram.png";
import telegram from "/telegram.png";

function Footer() {
  return (
    <footer className={FooterStyles.footer}>
      <div>
        <img src={enamad} alt="نماد اعتماد" />
      </div>
      <div className={FooterStyles.sectionRoutes}>
        <div>
          <h3>دسترسی سریع</h3>
          <ul>
            <li>
              <a href="/">صفحه اصلی</a>
            </li>
            <li>
              <a href="/login">حساب کاربری</a>
            </li>
            <li>
              <a href="/">تماس با ما</a>
            </li>
          </ul>
        </div>
        <div>
          <h3>لینک های داغ</h3>
          <ul>
            <li>فرصت شغلی</li>
            <li>قوانین مقررات</li>
            <li>
              <a>درباره ما</a>
            </li>
          </ul>
        </div>
      </div>
      <div className={FooterStyles.sectionLinks}>
        <h3 style={{ textAlign: "center" }}>از اخبار باخبر شو</h3>
        <ul>
          <li>
            <a href="/" className={FooterStyles.instagram}>
              <img src={instagram} alt="اینستاگرام" />
            </a>
          </li>
          <li>
            <a href="/" className={FooterStyles.telegram}>
              <img src={telegram} alt="تلگرام" />
            </a>
          </li>
        </ul>
      </div>
    </footer>
  );
}

export default Footer;
