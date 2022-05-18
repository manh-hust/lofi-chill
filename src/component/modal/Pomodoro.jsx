import { useEffect, useState, useContext, useRef } from 'react';
import { arrowLeftIcon, closeIcon, settingIcon, skipIcon, minusIcon, plusIcon } from '../../assets/icons'
import {ThemeContext} from '../../context'
import Switch from 'react-switch/dist/react-switch.dev.js';

function Button({ big, css, text, active, handle}){
    
    return(
        <div className={`${big ? 'w-1/3' : 'w-24 font-medium mx-2'} ${css} text white cursor-pointer`}
            onClick={handle}
        >
            <div className={`${active ? 'bg-primary text-black' : 'text-current'} text-center rounded-full py-1`}>
                {text}
            </div>
        </div>
    )
}

function ChangeTime({time, message, handlePlus, handleMinus, onChange}){
    const inputRef = useRef();
    return(
        <div className='w-1/3'>
            <h5 className='font-semibold'>{message}</h5>
            <div className='my-4 w-[140px] h-[50px] rounded-lg bg-bg-200 flex items-center justify-center'>
                <img
                    src={minusIcon}
                    alt='minus'
                    className='h-full w-1/3 p-4 duration-200 ease-in-out hover:bg-primary rounded-l-lg cursor-pointer'
                    onClick={() => handleMinus()}
                />
                <input
                    value={time}
                    className='w-1/3 h-full bg-bg-200 text-center'
                    ref={inputRef}
                    onChange={() =>{ onChange(inputRef.current.value) }}
                />
                <img
                    src={plusIcon}
                    alt='plus'
                    className='h-full w-1/3 p-4 duration-200 ease-in-out hover:bg-primary rounded-r-lg cursor-pointer'
                    onClick={handlePlus}
                />
            </div>
        </div>
    )
}

function SettingPomo({handleSwitch, handleClose, defaultTime, setDefaultTime, setCurrentTime }){
    const {
        alarmOn, setAlarmOn, 
        autoRun, setAutoRun, 
        setInitTimesAuto
    } = useContext(ThemeContext);
    return (
        <div className="absolute max-h-screen left-1/2 transform -translate-x-1/2 p-6 ">
            <div className='w-[440px] flex flex-col justify-center items-center rounded-3xl bg-black text-white p-6'>
                {/* Back button */}
                <div className='flex justify-between items-center w-full '>
                    <div className='transition-all opacity-50 duration-200 ease-linear hover:opacity-80 
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
                {/* Change defaul time */}
                <div className='flex flex-col mt-8'>
                    <ChangeTime message={'Pomodoro'} time={defaultTime.pomoTime} 
                    handleMinus={() => {
                        if(defaultTime.pomoTime > 0){
                            setDefaultTime({...defaultTime, pomoTime : parseInt(defaultTime.pomoTime) - 1})
                            setCurrentTime(defaultTime.pomoTime*60);
                        }
                    }}
                    handlePlus={() => {
                        if(!defaultTime.pomoTime) setDefaultTime({...defaultTime, pomoTime : 0});
                        setDefaultTime({...defaultTime, pomoTime : parseInt(defaultTime.pomoTime) + 1})
                        setCurrentTime(defaultTime.pomoTime*60);
                    }}
                    onChange={(value) => {
                        setDefaultTime({...defaultTime, pomoTime : value})
                        setCurrentTime(defaultTime.pomoTime*60);
                    }}
                    />
                    <ChangeTime message={'Break'} time={defaultTime.breakTime}
                     handleMinus={() => {
                        if(defaultTime.breakTime > 0)
                        setDefaultTime({...defaultTime, breakTime : parseInt(defaultTime.breakTime) - 1})
                    }}
                    handlePlus={() => {
                        setDefaultTime({...defaultTime, breakTime : parseInt(defaultTime.breakTime) + 1})
                    }}
                    onChange={(value) => {
                        setDefaultTime({...defaultTime, breakTime : value})
                    }}
                    />
                    <ChangeTime message={'Long'} time={defaultTime.longTime}
                     handleMinus={() => {
                        if(defaultTime.longTime > 0)
                        setDefaultTime({...defaultTime, longTime : parseInt(defaultTime.longTime) - 1})
                    }}
                    handlePlus={() => {
                        setDefaultTime({...defaultTime, longTime : parseInt(defaultTime.longTime) + 1})
                    }}
                    onChange={(value) => {
                        setDefaultTime({...defaultTime, longTime : value})
                    }}
                    />
                </div>
                {/* Mode auto */}
                <div className='flex w-full justify-center items-center mt-8'>
                    <div className=''>
                        <h5 className='font-semibold'>Play alarm?</h5>
                        <Switch
                            className='mx-4 mt-2'
                            onChange={() => {
                                setAlarmOn(!alarmOn)
                            }}
                            checked={alarmOn}
                            uncheckedIcon={false}
                            checkedIcon={true}
                            handleDiameter={26}
                            onHandleColor='#fff'
                            offHandleColor='#fff'
                            offColor='#14141d'
                            onColor='#f3a952'
                            height={30}
                            width={56}
                            activeBoxShadow='0px 0px 0px 0px transparent'
                        />
                    </div>
                    <div className='text-center'>
                        <h5 className='font-semibold'>Auto?</h5>
                        <Switch
                            className='mx-4 mt-2'
                            onChange={() => {
                                setAutoRun(!autoRun);
                                setInitTimesAuto({pomoTimes: 0, breakTimes: 0, longTimes: 0})
                            }}
                            checked={autoRun}
                            uncheckedIcon={false}
                            checkedIcon={false}
                            handleDiameter={26}
                            onHandleColor='#fff'
                            offHandleColor='#fff'
                            offColor='#14141d'
                            onColor='#f3a952'
                            height={30}
                            width={56}
                            activeBoxShadow='0px 0px 0px 0px transparent'
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}

function Pomodoro() {
    const [setting, setSetting] = useState(false);
    const [reset, setReset] = useState(false);
    const {
        visiableFocusType, setVisiableFocusType, 
        isRunning, setIsRunning,
        activeItem, setActiveItem,
        currentTime, setCurrentTime,
        initActiveFocus,
        defaultTime, setDefaultTime,
        setInitTimesAuto,
        setAutoRun
    } = useContext(ThemeContext)

  
    useEffect(() => {
        if(setting || reset){
            setCurrentTime(defaultTime.pomoTime*60);
            setActiveItem({...initActiveFocus, pomodoro: true});
        }
    }, [defaultTime, reset, initActiveFocus, setActiveItem, setting, setCurrentTime]);
    
    function setCurrentAndActiveTime(type, time){
        setActiveItem({...initActiveFocus, [type]: true});
        setCurrentTime(time*60);
        setIsRunning(false);
    }

    const handleNextActive = () => {
        if(activeItem.pomodoro === true){
            setCurrentAndActiveTime('break', defaultTime.breakTime);
        }
        if(activeItem.break === true){
            setCurrentAndActiveTime('long', defaultTime.longTime);
        }
        if(activeItem.long === true){
            setCurrentAndActiveTime('pomodoro', defaultTime.pomoTime);
        }
    }   
    const handleActive = (type) => {
        switch(type) {
            case 'pomodoro' :
                setCurrentAndActiveTime('pomodoro', defaultTime.pomoTime);
                break;

            case 'break' :
                setCurrentAndActiveTime('break', defaultTime.breakTime);
                break;

            case 'long' :
                setCurrentAndActiveTime('long', defaultTime.longTime);
                break;
            default :
                return
        }
    }

    return (
        <div className="absolute max-h-screen top-4 left-1/2 transform -translate-x-1/2">
            {setting ? 
             <SettingPomo 
                handleSwitch={() => {setSetting(!setting);} } 
                handleClose={() => { 
                    setVisiableFocusType({...visiableFocusType, pomodoro: false});
                }}
                defaultTime={defaultTime}
                setDefaultTime={setDefaultTime}
                setCurrentTime={setCurrentTime}
            /> :
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
                    <Button text={'Pomodoro'} active={activeItem.pomodoro} big={true}
                    handle={() => {handleActive('pomodoro')}}
                    />
                    <Button text={'Short Break'} active={activeItem.break}  big={true}
                    handle={() => {handleActive('break')}}
                    />
                    <Button text={'Long Break'} active={activeItem.long} big={true}
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

                <div className='flex flex-row items-center mt-12 mb-4 w-full relative'>
                    <Button text={'Reset'} big={true} 
                    css={`transition-all duration-200 ease-linear hover:opacity-50  min-w-[120px] 
                    border border-primary flex justify-center items-center py-1 px-4 bg-[rgba(243,169,82,.1)] 
                    font-medium text-base text-primary rounded-full absolute left-1/2 -translate-x-1/2`}
                    handle={() => {
                        setActiveItem({...setActiveItem, pomodoro: true});
                        setIsRunning(false);
                        setDefaultTime({pomoTime: 25, breakTime: 5, longTime: 10});
                        setInitTimesAuto({pomoTimes: 0, breakTimes: 0, longTimes: 0});
                        setAutoRun(false);
                        setReset(true);
                    }}
                    />
                    <div className='transition-all duration-200 ease-linear hover:opacity-50 cursor-pointer absolute right-0'
                        onClick={() => {setSetting(!setting)}}
                    >
                        <img src={settingIcon} alt='setting'/>
                    </div>
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