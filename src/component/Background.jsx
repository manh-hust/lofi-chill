import { useEffect, useRef, useState } from 'react';
import { moodIcon, templateIcon, setIcon, focusIcon } from '../assets/icons';
import Set from './Set';


function Background (){

    const [active, setActive] = useState(true);
    const setElement = useRef()

    useEffect(function(){
        // setElement.current.onClick = function(e){
        //     e.stopPropagation()
        // } 
    },[])
    function handleActive(){
        setActive(!active);
    }

    return(
        <div className="fixed top-1/2 right-0 transform -translate-y-1/2 flex flex-row-reverse items-center z-50">
            <div className="relative mr-5 flex flex-col h-[280px] w-[70px] bg-transparent-b-60 rounded-full z-20">

                <div className="relative w-[70px] h-[70px] cursor-pointer rounded-t-full">
                <div className="absolute pointer-events-none w-[115px] h-[115px] -top-5 -left-[22px] ">
                    <img src={moodIcon} className='w-full h-full opacity-20 brightness-200' alt='background-video'/>
                </div>
                <div className="relative w-[50px] border-b-2 border-transparent-w-30 opacity-20 transform top-full left-1/2 -translate-x-1/2"></div>
                </div>

                <div className="relative w-[70px] h-[70px] cursor-pointer">
                <div className="absolute pointer-events-none w-[115px] h-[115px] -top-5 -left-[22px] ">
                    <img src={templateIcon} className='w-full h-full opacity-20 brightness-200' alt='background-video'/>
                </div>
                <div className="relative w-[50px] border-b-2 border-transparent-w-30 opacity-20 transform top-full left-1/2 -translate-x-1/2"></div>
                </div>

                <div className="relative w-[70px] h-[70px] cursor-pointer">
                <div className="absolute pointer-events-none w-[115px] h-[115px] -top-5 -left-[22px]"
                    onClick={() => console.log(123)} 
                    ref={setElement}    
                >
                    <img src={setIcon} className={`w-full h-full ${active ? 'opacity-100 brightness-100' : 'opacity-20 brightness-200'}`} 
                        alt='background-video'/>
                </div>
                <div className="relative w-[50px] border-b-2 border-transparent-w-30 opacity-20 transform top-full left-1/2 -translate-x-1/2"></div>
                </div>

                <div className="relative w-[70px] h-[70px] cursor-pointer rounded-t-full">
                <div className="absolute pointer-events-none w-8 h-8 top-4 left-5">
                    <img src={focusIcon} className='w-full h-full opacity-20 brightness-200' alt='background-video'/>
                </div>
                </div>
            </div>
            {active && <Set/>}
        </div>
    )
}

export default Background