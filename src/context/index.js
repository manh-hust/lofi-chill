import { useState, createContext, useRef } from "react";
import {cafe1Day} from "../assets/videos/index"
import CHILL_LINKS from '../constants/links/chill'

const ThemeContext = createContext();

function ThemeProvider({children}){
    
    const [background, setBackground] = useState({
        link1: cafe1Day,
        show: true
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