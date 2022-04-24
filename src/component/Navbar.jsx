import { logoImg } from '../assets/images';
import {fullscreenIcon, profileIcon} from '../assets/icons'

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