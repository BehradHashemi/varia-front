import BannerStyles from "../../assets/styles/Banner.module.css";
import BannerImage from "../../assets/Picture/Banner_Rocket.png";
function Banner() {
  return (
    <div className={BannerStyles.container}>
      <main>
        <h1>شروع کسب و کار آنلاین با</h1>
        <h3>تیم طراحی سایت و پشتیبانی FronckTeam</h3>
        <br />
        <div className={BannerStyles.links}>
          <a href="/#">درخواست مشاوره رایگان</a>
          <a href="/#">نمونه کار ها</a>
        </div>
      </main>
      <aside>
        <img src={BannerImage} alt="banner-1" />
      </aside>
    </div>
  );
}

export default Banner;
