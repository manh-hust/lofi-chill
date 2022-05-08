import { useEffect, useState } from 'react';
import { arrowLeftIcon, closeIcon, settingIcon, skipIcon } from '../../assets/icons'


function Button({ big, css, text, active, handle, type}){
    
    return(
        <div className={`${big ? 'w-1/3' : 'w-24 font-medium mx-2'} ${css} text white cursor-pointer`}>
            <div className={`${active ? 'bg-primary text-black' : 'text-current'} text-center rounded-full py-1`}
                onClick={handle}
            >
                {text}
            </div>
        </div>
    )
}

function Pomodoro() {

    const [initTimes, setInitTime] = useState({
        pomoTime: 1 * 60,
        breakTime: 5 * 60,
        longTime:  10 * 60
    });

    const[currentTime, setCurrentTime] = useState(initTimes.pomoTime);
    const[isRunning, setIsRunning] = useState(false);

    const initActive={pomodoro: true, break: false, long: false};

    const[activeItem, setActiveItem] = useState(initActive); 

    if(currentTime === 0)
        setIsRunning(!isRunning)
    
    useEffect(() => {
        
        if(!isRunning)
            return
            
        const coundown = setInterval(() => {
            setCurrentTime(prev => prev - 1);
        }, 1000)

           
        return () => {
            clearInterval(coundown);
        }
    }, [isRunning])


    const handleNextActive = () => {
        if(activeItem.pomodoro === true){
            setActiveItem({pomodoro: false, break: true, long: false});
            setCurrentTime(initTimes.breakTime);
            setIsRunning(false);
        }
        if(activeItem.break === true){
            setActiveItem({pomodoro: false, break: false, long: true});
            setCurrentTime(initTimes.longTime);
            setIsRunning(false);
        }
        if(activeItem.long === true){
            setActiveItem(initActive);
            setCurrentTime(initTimes.pomoTime);
            setIsRunning(false);
        }
    }   
    const handleActive = (type) => {
        switch(type) {
            case 'pomodoro' :
                setActiveItem(initActive);
                setCurrentTime(initTimes.pomoTime);
                setIsRunning(false);
                break;
            case 'break' :
                setActiveItem({pomodoro: false, break: true, long: false});
                setCurrentTime(initTimes.breakTime);
                setIsRunning(false);
                break;
            case 'long' :
                setActiveItem({pomodoro: false, break: false, long: true});
                setCurrentTime(initTimes.longTime);
                setIsRunning(false);
            default :

        }
    }

    
    return (
        <div className="absolute max-h-screen top-4 left-1/2 transform -translate-x-1/2">
            <div className="p-6 w-[440px] flex flex-col justify-center items-center rounded-3xl bg-black text-white">
                <h1 className="text-4xl font-medium	mb-8">Pomodoro</h1>

                <div className="flex w-full rounded-full bg-bg-200 p-2 mb-8">
                    <Button text={'Pomodoro'} active={activeItem.pomodoro} big={true} type={'pomodoro'}
                    handle={() => {handleActive('pomodoro')}}
                    />
                    <Button text={'Short Break'} active={activeItem.break}  big={true} type={'short-break'}
                    handle={() => {handleActive('break')}}
                    />
                    <Button text={'Long Break'} active={activeItem.long} big={true} type={'long-break'}
                    handle={() => {handleActive('long')}}
                    />
                </div>

                <div className="flex flex-col justify-center w-full rounded-lg bg-bg-200 w p-2 mb-4">
                    <div className="text-center text-5xl font-bold mb-8 mt-4">{convertTime(currentTime)}</div>
                    <div className="flex justify-center mb-4">
                        <Button text={ isRunning ?  'Stop' : 'Start'} active={true} css={'transition-all duration-200 ease-linear hover:opacity-50 '}
                        handle={() => setIsRunning(!isRunning)}
                        />
                        <div className='w-8 transition-all duration-200 ease-linear hover:opacity-50  mx-4 cursor-pointer'
                            onClick={handleNextActive}
                        >
                            <img src={skipIcon} alt="skip" className='w-full h-full text-white invert'/>
                        </div>
                    </div>
                </div>

                <div className='transition-all duration-200 ease-linear hover:opacity-50 mt-8 cursor-pointer'>
                    <img src={settingIcon} alt='setting'/>
                </div>
            </div>
        </div>
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

export default  Pomodoro