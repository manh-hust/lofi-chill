import Menu from "./component/menu/Menu";
import Navbar from "./component/Navbar";
import Audio from './component/Audio';
import Background from "./component/Background";
import ItemModal from "./component/modal/ItemModal";
import { ThemeContext } from './context'
import { useContext } from 'react'

function App() {

  const{isRunning, currentTime} = useContext(ThemeContext);

  if(isRunning){
    document.title = convertTime(currentTime)
  }
  else{
    document.title = 'Lofi'
}
  return (
    <div className="relative min-h-screen bg-transparent-b-80">
      <Navbar/>
      <div className="absolute inset-0">
        <Background/>
      </div>
      <Audio/>
      <Menu/>
      <ItemModal/>
    </div>
  );
}

function convertTime(seconds){

  var minus = Math.floor(seconds/60);
  var second = seconds - minus * 60;
  return `${toStringTime(minus)}:${toStringTime(second)}`;
}

function toStringTime(number){
  if( number < 10 && number >= 0){
      return `0${number}`;
  }
  else if( number < 0){
      return '00';
  }
  else
      return number.toString();
}

export default App;
