import {ThemeContext} from '../context'
import { useContext} from 'react'
import { prevIcon, nextIcon, pauseIcon, playIcon} from '../assets/icons';
import { NOISE_LINKS } from '../constants/links/noises'

function Audio(){

    const { controlRef,
            currentAudio,
            setCurrentAudio,
            playing,
            setPlaying,
            buttonP,
            currentMood,
            noisesRefs
        } = useContext(ThemeContext);

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
        currentAu: currentMood[currentAudio.index - 1]
        })
    }
    else{
        setCurrentAudio({
        ...currentAudio,
        index: currentMood.length - 1,
        currentAu: currentMood[currentMood.length - 1]
        })
    }
    setPlaying(true);
    controlRef.current.play();
    }

    function handleNextAudio(){
    if(currentAudio.index === currentMood.length - 1){
        setCurrentAudio({
        index: 0,
        currentAu: currentMood[0]
        })
    }
    else{
        setCurrentAudio({
        index: currentAudio.index + 1,
        currentAu: currentMood[currentAudio.index + 1]
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

            {NOISE_LINKS.map((link, i) => (
				<audio
					key={i}
					src={link}
					ref={(el) => {
						noisesRefs.current[i] = el;
					}}
					autoPlay
					loop
					muted
				/>
			))}
        </>
    )
}

export default Audio;