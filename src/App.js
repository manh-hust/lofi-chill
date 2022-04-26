import {cafe1Day} from "./assets/videos/index"
import Navbar from "./component/Navbar";
import { useRef, useState } from "react";
import { prevIcon, nextIcon, pauseIcon, playIcon, moodIcon, templateIcon, setIcon, focusIcon, borderBrIcon } from './assets/icons';
import CHILL_LINKS from "./constants/links/chill"


function App() {

  const [playing, setPlaying] = useState(false);
  const controlRef = useRef();
  const buttonP = useRef();
  const [currentAudio, setCurrentAudio] = useState(() => {
    const random = Math.floor(Math.random() * CHILL_LINKS.length )
    console.log(random);
    return {
      currentAu: CHILL_LINKS[random],
      index: random
    };
  })

  function handleControl(){
    if(playing){
      controlRef.current.pause();
    }
    else{
      controlRef.current.play();
    }
      setPlaying(!playing);
  }

  function handlePrevAudio(){
    if(currentAudio.index > 0){
      setCurrentAudio({
        ...currentAudio,
        index: currentAudio.index - 1,
        currentAu: CHILL_LINKS[currentAudio.index - 1]
      })
    }
    else{
      setCurrentAudio({
        ...currentAudio,
        index: CHILL_LINKS.length - 1,
        currentAu: CHILL_LINKS[CHILL_LINKS.length - 1]
      })
    }
    setPlaying(true);
    controlRef.current.play();
  }

  function handleNextAudio(){
    if(currentAudio.index === CHILL_LINKS.length - 1){
      setCurrentAudio({
        index: 0,
        currentAu: CHILL_LINKS[0]
      })
    }
    else{
      setCurrentAudio({
        index: currentAudio.index + 1,
        currentAu: CHILL_LINKS[currentAudio.index + 1]
      })
    }
    setPlaying(true);
    controlRef.current.play();
  }

  return (
    <div className="relative min-h-screen">
      <Navbar/>
      {/* Background Video */}
      <video src={cafe1Day} className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full min-h-full object-cover lg:aspect-video" 
      autoPlay muted loop/>

      {/* Controls Audio */}
      <div className='fixed bottom-6 w-screen flex justify-center items-center'>
          <p className='absolute left-20 opacity-50 text-sm'>Music by - lofi.co 2021 ©</p>
          <div className='flex justify-center items-center'>
              <img src={prevIcon} onClick={handlePrevAudio} alt="icon" className='mx-2 cursor-pointer'/>
              <img ref={buttonP} src={playing ? pauseIcon : playIcon} alt="icon" 
              className='mx-2 cursor-pointer' width={54} height={54}
              onClick={handleControl}
              />
              <img src={nextIcon} onClick={handleNextAudio} alt="icon" className='mx-2 cursor-pointer'/>
          </div>
      </div>

      {/* Audio */}
      <audio src={currentAudio.currentAu}
        autoPlay
        ref={controlRef}
        />
      {/* Control Background */}
      <div className="fixed top-1/2 right-0 transform -translate-y-1/2 flex flex-row-reverse items-center z-40">
        <div className="relative mr-5 flex flex-col h-[280px] w-[70px] bg-transparent-b-60 rounded-full z-20">

            <div className="relative w-[70px] h-[70px] cursor-pointer rounded-t-full">
              <div className="absolute pointer-events-none w-[115px] h-[115px] -top-5 -left-[22px] ">
                <img src={moodIcon} className='w-full h-full opacity-20 brightness-200'/>
              </div>
              <div class="relative w-[50px] border-b-2 border-transparent-w-30 opacity-20 transform top-full left-1/2 -translate-x-1/2"></div>
            </div>

            <div className="relative w-[70px] h-[70px] cursor-pointer">
              <div className="absolute pointer-events-none w-[115px] h-[115px] -top-5 -left-[22px] ">
                <img src={templateIcon} className='w-full h-full opacity-20 brightness-200'/>
              </div>
              <div class="relative w-[50px] border-b-2 border-transparent-w-30 opacity-20 transform top-full left-1/2 -translate-x-1/2"></div>
            </div>

            <div className="relative w-[70px] h-[70px] cursor-pointer">
              <div className="absolute pointer-events-none w-[115px] h-[115px] -top-5 -left-[22px] ">
                <img src={setIcon} className='w-full h-full opacity-20 brightness-200'/>
              </div>
              <div class="relative w-[50px] border-b-2 border-transparent-w-30 opacity-20 transform top-full left-1/2 -translate-x-1/2"></div>
            </div>

            <div className="relative w-[70px] h-[70px] cursor-pointer rounded-t-full">
              <div className="absolute pointer-events-none w-8 h-8 top-4 left-5">
                <img src={focusIcon} className='w-full h-full opacity-20 brightness-200'/>
              </div>
            </div>

          {/* <div className="flex justify-center items-center">
            <img src={templateIcon} className='cursor-pointer'/>
          </div>
          <div className="flex justify-center items-center">
            <img src={setIcon} className='cursor-pointer'/>
          </div>
          <div className="flex justify-center items-center ">
            <img src={focusIcon} className='cursor-pointer'/>
          </div> */}
        </div>
      </div>
    </div>
  );
}

export default App;
