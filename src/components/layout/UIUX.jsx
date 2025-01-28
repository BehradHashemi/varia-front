import UIUXStyles from "../../assets/styles/UIUX.module.css";
import UIUXImage from "../../assets/Picture/Banner_UIUX.png";
import { FaArrowLeft } from "react-icons/fa";
 

function UIUX() {
  return (
    <div className={UIUXStyles.container}>
      <img src={UIUXImage} alt="banner-4" />
      <main>
        <h2>ویترین وبسایت خودتون رو به ما بسپارید</h2>
        <h1>طراحی اختصاصی UI/UX</h1>
        <p>
          زیبایی بصری و تجربه کاربری خوب میتونه وبسایت شما رو از رقبا متمایز کنه
          و باعث قروش چندین برابری شما باشه، تیم ما به شما کمک میکنه تا دیزاین
          اصولی، زیبا و با تجربه کاربری لذت بخش برای وبسایت خود داشته باشید.
        </p>
        <div className={UIUXStyles.buttons}>
          <a href="/resume">
            نمونه کار ها
            <FaArrowLeft style={{ marginRight: "10px" }} />
          </a>
        </div>
      </main>
    </div>
  );
}

export default UIUX;
