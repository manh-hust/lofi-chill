import { useState, useContext } from 'react';
import {SETS} from '../../constants/sets'
import { arrowLeftIcon } from '../../assets/icons'
import {ThemeContext} from '../../context/index';


function Set(){

    const {setBackground} = useContext(ThemeContext);
    const[detail, setDetail] = useState(false);
    const[sets, setSets] = useState(SETS);

    function handleDetail(set){
        setDetail(true);
        setSets(sets.find((item) => item.set === set).scenes);
    }
    function handleSetBackground(background){
        console.log(background);
        setBackground(background);
    }

    function handleResetSet(){
        setSets(SETS);
        setDetail(false);
    }
    return (
        <div className="absolute right-[88px] w-[345px] bg-bg-menu min-h-[400px] rounded-[24px] p-4 z-20">
            {detail ? 
                (<div className='flex justify-between items-center'>
                    <div className='transition-all duration-200 ease-linear hover:opacity-50 cursor-pointer'>
                        <img src={arrowLeftIcon} alt='back' className='w-[14px] h-[14px]'
                            onClick={handleResetSet}
                        />
                    </div>

                    <h4 className='font-bold text-xl text-white'>Switch scene</h4>

                    <div className='w-[14px] h-[14px]' />
				</div>) :
                <h4 className="text-white font-bold text-xl mb-2">Change Set</h4>
            }
            <div className="max-h-[500px] text-center overflow-auto rounded-lg">
                {sets.map((item) => (
                    <div
                        onClick={ detail ?(() => handleSetBackground(item.img)) : (() => handleDetail(item.set))}
                        key={item.link}
                        className='mt-2 cursor-pointer transition-all duration-200 ease-linear hover:opacity-50'
                    >
                        <img src={item.img} alt='set' className='animate-fadeIn1s' />
                    </div>
				))}
            </div>
        </div>
    )
}


export default Set;