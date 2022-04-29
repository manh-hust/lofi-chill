import { logoImg } from '../assets/images';
import {fullscreenIcon, profileIcon} from '../assets/icons'
import Switch from 'react-switch';
import { moonIcon, sunIcon, rainyIcon, sunnyIcon} from  "../assets/icons"

function Navbar(){

    return(
        <>
            <div className="fixed w-screen h-20 z-10 mt-4">
                <div className='flex justify-between mx-16 items-center'>
                    <div>
                        <img src={logoImg} className="h-[100px]" alt='logo'/>
                    </div>
                    <div>
                        <button className='text-white font-bold text-lg mx-4'>How it works</button>
                        <button className='text-white font-bold text-lg mx-4'>Upgrade</button>
                        <button className='text-white font-bold text-lg mx-4'>Contact us</button>
                        <button className='text-white font-bold text-lg mx-4'>More</button>
                    </div>
                    <div className='flex justify-center items-center'>
                        <div className='transition-all duration-300 ease-in hover:opacity-50 '>
                            <Switch
                                // onChange={() => handleChangeBg('day')}
                                // checked={background.day}
                                handleDiameter={26}
                                offColor='#545459'
                                onColor='#f3a952'
                                height={30}
                                width={62}
                                activeBoxShadow='0px 0px 0px 0px transparent'
                                uncheckedIcon={
                                    <div className='flex justify-center items-center h-full '>
                                        <img src={moonIcon} alt='moon' />
                                    </div>
                                }
                                checkedIcon={
                                    <div className='flex justify-center items-center h-full '>
                                        <img src={sunIcon} alt='sun' />
                                    </div>
                                }
                            />
                        </div>

                        <div className='transition-all duration-300 ease-in hover:opacity-50 ml-4 mr-4'>
                            <Switch
                                // onChange={() => handleChangeBg('rainy')}
                                // checked={background.rainy}
                                handleDiameter={26}
                                offColor='#545459'
                                onColor='#f3a952'
                                height={30}
                                width={62}
                                activeBoxShadow='0px 0px 0px 0px transparent'
                                uncheckedIcon={
                                    <div className='flex justify-center items-center h-full '>
                                        <img src={rainyIcon} alt='rainy' />
                                    </div>
                                }
                                checkedIcon={
                                    <div className='relative -top-0.5 flex justify-center items-center h-full '>
                                        <img src={sunnyIcon} alt='sunny' />
                                    </div>
                                }
                            />
                        </div>           

                        <button className='text-white font-bold text-lg mx-2'>
                            <img src={fullscreenIcon} alt='full-screen' />
                        </button>
                        <button className='text-white font-bold text-lg mx-2'>
                            <img src={profileIcon} alt='profile' />
                        </button>
                        <button className='text-white font-bold mx-2 py-1 px-3 bg-transparent-w-10 border border-transparent-w-30 rounded-full text-xs'>
                            Share
                        </button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Navbar