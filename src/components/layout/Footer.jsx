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
      <div>
        <h3>دسترسی سریع</h3>
        <ul>
          <li>
            <Link to="/">صفحه اصلی</Link>
          </li>
          <li>
            <Link to="/login">حساب کاربری</Link>
          </li>
          <li>
            <Link to="/">تماس با ما</Link>
          </li>
        </ul>
      </div>
      <div>
        <h3>لینک های داغ</h3>
        <ul>
          <li>فرصت شغلی</li>
          <li>قوانین مقررات</li>
          <li>
            <Link>درباره ما</Link>
          </li>
        </ul>
      </div>
      <div className={FooterStyles.sectionLinks}>
        <h3>از اخبار باخبر شو</h3>
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
