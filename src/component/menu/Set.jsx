import { useState, useContext } from 'react';
import {SETS} from '../../constants/sets'
import { arrowLeftIcon } from '../../assets/icons'
import {ThemeContext} from '../../context/index';
import {BACKGROUND_LINKS_LIST} from '../../constants/links/videos'

function Set(){

    const {background, setBackground} = useContext(ThemeContext);   // Lấy hàm setBackground từ useContext

    const[detail, setDetail] = useState(false); // Trạng thái khi click chọn bg là chi tiết 1 scene nào đó hay chung
    const[sets, setSets] = useState(SETS);      // Set các hình ảnh hiển thị trên thanh trượt chọn bg

    function handleDetail(set){
        setDetail(set);
        setSets(sets.find((item) => item.set === set).scenes);
    }
    function handleSetBackground(scene){
        const backgroundLink = BACKGROUND_LINKS_LIST.find(item => item.set === detail && item.scene === scene)
        setBackground({...background, link1: backgroundLink.link});
    }
    // Handle nút trở lại menu bg
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
                        onClick={ detail ?(() => handleSetBackground(item.scene)) : (() => handleDetail(item.set))}
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