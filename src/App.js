import {cafe1Img} from './assets/images'
import {chill1Img} from './assets/images'
import {chill2Img} from './assets/images'


function App() {
  return (
    <div className="flex justify-center items-center h-screen w-screen bg-gradient-to-r from-white via-slate-500 to-pink-500">
      <div className="w-36 h-36 cursor-pointer bg-white shadow-md rounded-lg mx-4 overflow-hidden">
        <img src={cafe1Img} className="w-full object-cover transition duration-300 ease-in-out hover:scale-105" alt='chill'/>
      </div>
      <div className="w-36 h-36 cursor-pointer bg-white shadow-md rounded-lg mx-4 overflow-hidden">
        <img src={chill1Img} className="w-full object-cover transition duration-300 ease-in-out hover:scale-105" alt='chill'/>
      </div>
      <div className="w-36 h-36 cursor-pointer bg-white shadow-md rounded-lg mx-4 overflow-hidden">
        <img src={chill2Img} className="w-full object-cover transition duration-300 ease-in-out hover:scale-105" alt='chill'/>
      </div>
    </div>
  );
}

export default App;
