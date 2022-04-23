import {chill1Day} from "./assets/videos/index"
import Navbar from "./component/Navbar";

function App() {
  return (
    <div className="relative overflow-hidden">
      <Navbar/>
      <video src={chill1Day} className="" autoPlay muted loop/>
    </div>
  );
}

export default App;
