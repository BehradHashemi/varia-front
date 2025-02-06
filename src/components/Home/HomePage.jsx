import Banner from "../layout/Banner";
import Resume from "../layout/Resume";
import Service from "../layout/Service";
import Support from "../layout/Support";
import UIUX from "../layout/UIUX";
// import Blog from "../layout/Blog";

function HomePage() {
  
  return (
    <div>
      <Banner></Banner>
      <Service></Service>
      <Resume></Resume>
      <Support></Support>
      <UIUX></UIUX>
      {/* <Blog></Blog> */}
    </div>
  );
}

export default HomePage;
