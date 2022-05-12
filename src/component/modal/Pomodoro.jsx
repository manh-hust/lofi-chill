import { useEffect, useState, useContext } from 'react';
import { arrowLeftIcon, closeIcon, settingIcon, skipIcon, minusIcon, plusIcon } from '../../assets/icons'
import {ThemeContext} from '../../context'

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

function ChangeTime({time, message}){
    return(
        <div className='w-1/3'>
            <h5 className='font-semibold'>{message}</h5>
            <div className='my-4 w-[140px] h-[50px] rounded-lg bg-bg-200 flex items-center justify-center'>
                <img
                    src={minusIcon}
                    alt='minus'
                    className='h-full w-1/3 p-4 duration-200 ease-in-out hover:bg-primary rounded-l-lg cursor-pointer'
                />
                <input
                    type='number'
                    min={1}
                    value={time}
                    className='w-1/3 h-full bg-bg-200 text-center'
                />
                <img
                    src={plusIcon}
                    alt='plus'
                    className='h-full w-1/3 p-4 duration-200 ease-in-out hover:bg-primary rounded-r-lg cursor-pointer'
                />
            </div>
        </div>
    )
}

function SettingPomo({handleSwitch, handleClose}){
    return (
        <div className="absolute max-h-screen left-1/2 transform -translate-x-1/2 p-6 ">
            <div className='w-[440px] flex flex-col justify-center items-center rounded-3xl bg-black text-white p-6'>
                <div className='flex justify-between items-center w-full '>
                    <div className='transition-all duration-200 ease-linear hover:opacity-50 
                    cursor-pointer text-center flex items-center text-xl'
                    onClick={handleSwitch}
                    >
                        <img src={arrowLeftIcon} alt='arrow-left-icon' className='mr-3 text-xl w-[8px]'/>
                        <div>Back</div>
                    </div>
                    <div className='transition-all duration-200 ease-linear hover:opacity-50 cursor-pointer'
                    onClick={handleClose}
                    >
                        <img src={closeIcon} alt="close-icon"/>
                    </div>
               
                </div>

                <div className='flex flex-col mt-8'>
                    <ChangeTime message={'Pomodoro'} time={25}/>
                    <ChangeTime message={'Break'} time={5}/>
                    <ChangeTime message={'Long'} time={10}/>
                </div>
            </div>
        </div>
    )
}

function Pomodoro() {

    const [setting, setSetting] = useState(false);
    const {
        visiableFocusType, setVisiableFocusType, 
        isRunning, setIsRunning,
        activeItem, setActiveItem,
        initTimes, setInitTime,
        currentTime, setCurrentTime,
        initActiveFocus
    } = useContext(ThemeContext)
 

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
            setActiveItem({pomodoro: true, break: false, long: false});
            setCurrentTime(initTimes.pomoTime);
            setIsRunning(false);
        }
    }   
    const handleActive = (type) => {
        switch(type) {
            case 'pomodoro' :
                setActiveItem({pomodoro: true, break: false, long: false});
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
                return
        }
    }


    return (
        <div className="absolute max-h-screen top-4 left-1/2 transform -translate-x-1/2">
            {setting ? 
             <SettingPomo handleSwitch={() => setSetting(!setting) } handleClose={() => { setVisiableFocusType({...visiableFocusType, pomodoro: false})}}/> :
            <div className="p-6 w-[440px] flex flex-col justify-center items-center rounded-3xl bg-black text-white">
                <div className='flex items-center'>
                    <h1 className="text-4xl font-medium	mb-8">Pomodoro</h1>
                    <div className="text-white absolute top-0 right-0 p-4 cursor-pointer"
                        onClick={() => { setVisiableFocusType({...visiableFocusType, pomodoro: false})}}
                    >
                        <img src={closeIcon} alt="close-icon" />
                    </div>
                </div>
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

                <div className='transition-all duration-200 ease-linear hover:opacity-50 mt-8 cursor-pointer'
                    onClick={() => {setSetting(!setting)}}
                >
                    <img src={settingIcon} alt='setting'/>
                </div>
            </div> 
            }
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