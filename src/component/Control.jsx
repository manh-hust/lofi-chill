import { useEffect, useRef, useState } from 'react';
import { prevIcon, nextIcon, pauseIcon, playIcon } from '../assets/icons';


function Control(){

    const buttonP = useRef();
    const [playing, setPlaying] = useState(false);
    // const isPlaying = false;
    useEffect(function(){
        
    },[] )

    return(
        <>
            <div className='fixed bottom-6 w-screen flex justify-center items-center'>
                <p className='absolute left-20 opacity-50 text-sm'>Music by - lofi.co 2021 ©</p>
                <div className='flex justify-center items-center'>
                    <img src={prevIcon} alt="icon" className='mx-2 cursor-pointer'/>
                    <img ref={buttonP} src={playing ? playIcon : pauseIcon} alt="icon" 
                    className='mx-2 cursor-pointer' width={54} height={54} 
                    onClick={() => {setPlaying(!playing)}}/>
                    <img src={nextIcon} alt="icon" className='mx-2 cursor-pointer'/>
                </div>
            </div>
        </>
    )
}

export default Control