import { useState, createContext } from "react";
import {cafe1Day} from "../assets/videos/index"


const ThemeContext = createContext();

function ThemeProvider({children}){
    
    const [background, setBackground] = useState({
        link1: cafe1Day,
        show: true
    })
    const value = {
        background,
        setBackground
    }

    return(
        <ThemeContext.Provider value={value}>
            {children}
        </ThemeContext.Provider>
    )
}

export  {ThemeProvider, ThemeContext};