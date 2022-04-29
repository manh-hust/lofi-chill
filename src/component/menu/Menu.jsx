import { useState } from 'react';
import { moodIcon, templateIcon, setIcon, focusIcon } from '../../assets/icons';
import Set from './Set';


function MenuItem({icon, handleActive, active, line, top, bottom, small}){
   
    return(
        <div className={`relative w-[70px] h-[70px] cursor-pointer ${top ? `rounded-t-full` : ''} ${bottom ? `rounded-b-full` : ''} ${active ? 'bg-bg-menu' : ''}`}
        onClick={handleActive} 
        >
            <div className={small ? 'absolute w-8 h-8 top-4 left-5' : 'absolute w-[115px] h-[115px] -top-5 -left-[22px]'}>
                <img src={icon} className={`w-full h-full ${active ? 'opacity-100 brightness-100' : 'opacity-20 brightness-200 '}`} 
                    alt='background-video'/>
            </div>
            {line && <div className={`relative w-[50px] border-b-2 border-transparent-w-30 opacity-${active ? '0' : '20'} transform top-full left-1/2 -translate-x-1/2`}></div>}
        </div>
    )
}

function Menu (){

    const initActive = {mood: false, template: false, sets: false, focus: false}
    const [active, setActive] = useState(initActive);
   
    return(
        <div className="fixed top-1/2 right-0 transform -translate-y-1/2 flex flex-row-reverse items-center">
            <div className="relative mr-5 flex flex-col h-[280px] w-[70px] bg-transparent-b-60 rounded-full">

                <MenuItem
                    icon={moodIcon}
                    top={true}
                    line={true}
                    active={active.mood}
                    handleActive={() => {setActive({...initActive, mood:!active.mood })}}
                />
                 <MenuItem
                    icon={templateIcon}
                    line={true}
                    active={active.template}
                    handleActive={() => {setActive({...initActive, template:!active.template })}}
                />
                <MenuItem
                    icon={setIcon}
                    active={active.sets}
                    line={true}
                    handleActive={() => {setActive({...initActive, sets:!active.sets })}}
                />
                 <MenuItem
                    icon={focusIcon}
                    bottom={true}
                    small={true}
                    active={active.focus}
                    handleActive={() => {setActive({...initActive, focus:!active.focus })}}
                />
            </div>
            {active.sets && <Set/>}
        </div>
    )
}

export default Menu