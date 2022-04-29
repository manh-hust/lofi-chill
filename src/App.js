import {ThemeContext} from './context'
import { useContext } from "react";
import Menu from "./component/menu/Menu";
import Navbar from "./component/Navbar";
import Audio from './component/Audio';

function App() {

  const { background } = useContext(ThemeContext);

  return (
    <div className="relative min-h-screen">
      <Navbar/>
      {/* Background Video */}
      <div className={`absolute inset-0 transition-opacity duration-500 ease-in-out delay-500 opacity-100`}
      >
        <video src={background.link1} className="absolute top-1/2 left-1/2 transform -translate-x-1/2 
        -translate-y-1/2 w-full min-h-full object-cover lg:aspect-video" 
        autoPlay muted loop playsInline
        />
      </div>
      {/* Audio */}
      <Audio/>
      {/* Control Background */}
      <Menu/>
    </div>
  );
}

export default App;
