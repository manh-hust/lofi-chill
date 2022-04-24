import {cafe1Day} from "./assets/videos/index"
import Navbar from "./component/Navbar";
import Control from "./component/Control";

function App() {
  return (
    <div className="relative min-h-screen">
      <Navbar/>
      <video src={cafe1Day} className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full min-h-full object-cover lg:aspect-video" 
      autoPlay muted loop/>
      <Control/>
    </div>
  );
}

export default App;
