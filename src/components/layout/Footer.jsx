import { Link } from "react-router-dom";
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
              <Link to="/">صفحه اصلی</Link>
            </li>
            <li>
              <Link to="/dashboard">حساب کاربری</Link>
            </li>
            <li>
              <Link to="/contact">تماس با ما</Link>
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
            <Link to="/" className={FooterStyles.instagram}>
              <img src={instagram} alt="اینستاگرام" />
            </Link>
          </li>
          <li>
            <Link to="/" className={FooterStyles.telegram}>
              <img src={telegram} alt="تلگرام" />
            </Link>
          </li>
        </ul>
      </div>
    </footer>
  );
}

export default Footer;
