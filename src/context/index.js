import { useState, createContext, useRef, useEffect, useCallback, useMemo } from "react";
import CHILL_LINKS from '../constants/links/chill'
import {BACKGROUND_LINKS_LIST} from "../constants/links/videos"


const ThemeContext = createContext();

function randomAudio(type){
    const random = Math.floor(Math.random() * type.length )
    return {
        currentAu: type[random],
        index: random
      };
}

function ThemeProvider({children}){
    const [background, setBackground] = useState(() => {
        const link = BACKGROUND_LINKS_LIST.find(item => item.set === 'desk' && item.scene === 'scene1' &&
        item.day === true && item.rainy === false).link
        return{
            show: true,
            day: true,
            rainy: false,
            set: null,
            scene: null,
            link1: link,
            link2: '',
        }
    })
    const controlRef = useRef();
    // Mood hiện tại phát nhạc
    const [currentMood, setCurrentMood] = useState(CHILL_LINKS)
    const [currentAudio, setCurrentAudio] = useState(randomAudio(currentMood))
    // Active các tab Mood-Menu
    const initialTab = { sleepy: false, jazzy: false, chill: false, youtube: false };
	const [moodTab, setMoodTab] = useState({ ...initialTab, chill: true });

    const [playing, setPlaying] = useState(false);
    const buttonP = useRef();

    const noisesRefs = useRef([]);

    const [fullScreen, setFullScreen] = useState(false);
    // Focus active
    const initVisiableFocusType = {
        pomodoro: false,
        session: false,
        notes: false,
        history: false
    }
    const [visiableFocusType, setVisiableFocusType] = useState(initVisiableFocusType);
    // Menu active
    const initActive = {mood: false, template: false, sets: false, focus: false}
    const [active, setActive] = useState(initActive);



    // Pomodoro
    const initActiveFocus = useMemo(() => {
        return {pomodoro: false, break: false, long: false};
    }, [])
    const [defaultTime, setDefaultTime] = useState({
            pomoTime: localStorage.getItem('pomodoro') || 25, 
            breakTime: localStorage.getItem('break') || 5, 
            longTime: localStorage.getItem('long') || 10
        });
    localStorage.setItem('pomodoro', defaultTime.pomoTime);
    localStorage.setItem('break', defaultTime.breakTime);
    localStorage.setItem('long', defaultTime.longTime);

    const[activeItem, setActiveItem] = useState({...initActiveFocus, pomodoro: true}); 
    const [initTimes, setInitTime] = useState({
        pomoTime: defaultTime.pomoTime * 60,
        breakTime: defaultTime.breakTime * 60,
        longTime:  defaultTime.longTime * 60
    });
    const[currentTime, setCurrentTime] = useState(initTimes.pomoTime);
    const[isRunning, setIsRunning] = useState(false);

    const [alarmOn, setAlarmOn] = useState(localStorage.getItem('alarmOn') === 'true');
    const [autoRun, setAutoRun] = useState(localStorage.getItem('autoRun') === 'true');
    localStorage.setItem('alarmOn', alarmOn);
    localStorage.setItem('autoRun', autoRun);
    const [initTimesAuto, setInitTimesAuto] = useState({pomoTimes: 0, breakTimes: 0, longTimes: 0});

    
    const setCurrentAndActiveTime = useCallback((type, time) => {
        setActiveItem({...initActiveFocus, [type]: true});
        setCurrentTime(time * 60);
    }, [initActiveFocus])

    useEffect(() => {
        if(isRunning){
            if(currentTime > 0){
                var coundown = setInterval(() => {
                    setCurrentTime(prev => prev - 1);
                }, 1000)
                   
                return () => {
                    clearInterval(coundown);
                }
            }
            else if(currentTime === 0 && !autoRun){
                setIsRunning(false);
                if(alarmOn){
                    refAlarm.current.play();
                }
            }
            else if(currentTime <= 0 && autoRun){
                if(activeItem.pomodoro === true){
                    if(initTimesAuto.pomoTimes === 3 ){
                        setCurrentAndActiveTime('long', defaultTime.longTime);
                    }
                    else{
                        setCurrentAndActiveTime('break', defaultTime.breakTime);
                        setInitTimesAuto({...initTimesAuto, pomoTimes: initTimesAuto.pomoTimes + 1});
                    }
                    if(alarmOn){
                        refAlarm.current.play();
                    }
                }
                else if(activeItem.break === true){
                    setCurrentAndActiveTime('pomodoro', defaultTime.pomoTime);
                    setInitTimesAuto({...initTimesAuto, breakTimes: initTimesAuto.breakTimes + 1});
                    if(alarmOn){
                        refAlarm.current.play();
                    }
                }
                else if(activeItem.long === true){
                    setCurrentAndActiveTime('pomodoro', defaultTime.pomoTime);
                    setInitTimesAuto({pomoTimes: 0, breakTimes: 0, longTimes: 0});
                    if(alarmOn){
                        refAlarm.current.play();
                    }
                }
            }
        }            
    }, [isRunning, currentTime, activeItem.break, activeItem.long, activeItem.pomodoro,
    alarmOn, autoRun, defaultTime.breakTime, defaultTime.longTime, defaultTime.pomoTime,
    initTimesAuto, setCurrentAndActiveTime
    ]);

    // function setCurrentAndActiveTime(type, time){
    // }

    const refAlarm = useRef();

    const value = {
        background, setBackground,
        controlRef,
        currentAudio, setCurrentAudio,
        playing, setPlaying,
        buttonP,
        currentMood, setCurrentMood,
        moodTab, setMoodTab,
        noisesRefs,
        fullScreen, setFullScreen,
        initVisiableFocusType,
        visiableFocusType, setVisiableFocusType,
        initActive,
        active, setActive,
        initTimes, setInitTime,
        currentTime, setCurrentTime,
        activeItem, setActiveItem,
        isRunning, setIsRunning,
        defaultTime,setDefaultTime,
        alarmOn, setAlarmOn,
        autoRun, setAutoRun,
        setInitTimesAuto,
        refAlarm,

    }

    return(
        <ThemeContext.Provider value={value}>
            {children}
        </ThemeContext.Provider>
    )
}



export  {ThemeProvider, ThemeContext, randomAudio};