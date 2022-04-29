import Menu from "./component/menu/Menu";
import Navbar from "./component/Navbar";
import Audio from './component/Audio';
import Background from "./component/Background";

function App() {


  return (
    <div className="relative min-h-screen">
      <Navbar/>
      <div className="absolute inset-0">
        <Background/>
      </div>
      <Audio/>
      <Menu/>
    </div>
  );
}

export default App;
