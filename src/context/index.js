import { useState, createContext, useRef } from "react";
import CHILL_LINKS from '../constants/links/chill'
import {BACKGROUND_LINKS_LIST} from "../constants/links/videos"

const ThemeContext = createContext();

function ThemeProvider({children}){
    
    const [background, setBackground] = useState(() => {
        const link = BACKGROUND_LINKS_LIST.find(item => item.set === 'chill' && item.scene === 'scene1' &&
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

    const [currentAudio, setCurrentAudio] = useState(() => {
        const random = Math.floor(Math.random() * CHILL_LINKS.length )
        return {
          currentAu: CHILL_LINKS[random],
          index: random
        };
    })
    const [playing, setPlaying] = useState(false);
    const buttonP = useRef();



    const value = {
        background,
        setBackground,
        controlRef,
        currentAudio,
        setCurrentAudio,
        playing,
        setPlaying,
        buttonP
    }

    return(
        <ThemeContext.Provider value={value}>
            {children}
        </ThemeContext.Provider>
    )
}

export  {ThemeProvider, ThemeContext};