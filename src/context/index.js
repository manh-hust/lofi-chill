import { useState, createContext } from "react";
import {SETS} from '../constants/sets'
import {cafe1Day} from "../assets/videos/index"


const ThemeContext = createContext();

function ThemeProvider({children}){
    
    const [background, setBackground] = useState(cafe1Day)
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