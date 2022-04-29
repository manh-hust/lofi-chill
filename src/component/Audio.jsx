import {ThemeContext} from '../context'
import { useContext} from 'react'
import { prevIcon, nextIcon, pauseIcon, playIcon} from '../assets/icons';
import CHILL_LINKS from '../constants/links/chill';

function Audio(){

    const { controlRef,
            currentAudio,
            setCurrentAudio,
            playing,
            setPlaying,
            buttonP } = useContext(ThemeContext);

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
        <>
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
            <audio src={currentAudio.currentAu}
            onEnded={handleNextAudio}
            autoPlay
            ref={controlRef}
            />
        </>
    )
}

export default Audio;