import {ThemeContext} from '../context'
import { useContext} from 'react'
import { prevIcon, nextIcon, pauseIcon, playIcon, clockIcon } from '../assets/icons';
import { NOISE_LINKS } from '../constants/links/noises'
import { ALARM_LINKS } from '../constants/links/alarm'

function Audio(){

    const { controlRef,
            currentAudio,
            setCurrentAudio,
            playing,
            setPlaying,
            buttonP,
            currentMood,
            noisesRefs,
            currentTime,
            activeItem,
            setVisiableFocusType, initVisiableFocusType,
            refAlarm
        } = useContext(ThemeContext);
    // Lấy tên của chế độ đồng hồ đang chạy   
    var activeItemTime;
    for (const item in activeItem) {
        if(activeItem[item] === true)
            activeItemTime = jsUcfirst(item);    
    }
    
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
            {/* Bài nhạc chính */}
            <audio src={currentAudio.currentAu}
            onEnded={handleNextAudio}
            autoPlay
            ref={controlRef}
            />
            {/* Đồng hồ nhở góc dưới bên phải */}
            <div className='fixed bottom-6 right-6 flex items-center text-sm text-white italic 
            bg-transparent-b-50 backdrop-blur-sm rounded-[20px] py-1.5 px-4 cursor-pointer text-[16px]'
            onClick={() => { setVisiableFocusType({...initVisiableFocusType, pomodoro: true})}}
            >
                    <p className='opacity-50'>{activeItemTime}/</p>
					<img src={clockIcon} alt='clock' className='w-[18px] h-[18px] mx-2.5' />
					<p className='opacity-50'>{convertTime(currentTime)}</p>
            </div>

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

            <audio
                src={ALARM_LINKS[0].link}
                ref={refAlarm}
            />
        </>
    )
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
function jsUcfirst(string) 
{
    return string.charAt(0).toUpperCase() + string.slice(1);
}
export default Audio;