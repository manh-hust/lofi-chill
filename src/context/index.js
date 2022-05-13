import { useState, createContext, useRef, useEffect } from "react";
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
    const initActiveFocus ={pomodoro: true, break: false, long: false};
    const [defaultTime, setDefaultTime] = useState({pomoTime: 1, breakTime: 5, longTime: 10});
    const [autoModePomo, setAutoModePomo] = useState(true);
    const[activeItem, setActiveItem] = useState(initActiveFocus); 
    const [initTimes, setInitTime] = useState({
        pomoTime: defaultTime.pomoTime * 60,
        breakTime: defaultTime.breakTime * 60,
        longTime:  defaultTime.longTime * 60
    });
    const[currentTime, setCurrentTime] = useState(initTimes.pomoTime);
    const[isRunning, setIsRunning] = useState(false);

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
            else{
                setIsRunning(false);
            }
        }            
    }, [isRunning, currentTime]);

    const [alarmOn, setAlarmOn] = useState(true);
    const [autoRun, setAutoRun] = useState(true);


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
        autoRun, setAutoRun
    }

    return(
        <ThemeContext.Provider value={value}>
            {children}
        </ThemeContext.Provider>
    )
}

export  {ThemeProvider, ThemeContext, randomAudio};