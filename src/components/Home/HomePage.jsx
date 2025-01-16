import Banner from "../layout/Banner";
import Resume from "../layout/Resume";
import Service from "../layout/Service";
import Support from "../layout/Support";
import UIUX from "../layout/UIUX";

function HomePage() {
  return (
    <div>
      <Banner></Banner>
      <Service></Service>
      <Resume></Resume>
      <Support></Support>
      <UIUX></UIUX>
    </div>
  );
}

export default HomePage;
