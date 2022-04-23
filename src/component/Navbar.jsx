import { logoImg } from '../assets/images';


function Navbar(){

    return(
        <>
            <div className="fixed w-screen h-20 z-10">
                <div className='flex justify-between mx-12 items-center'>
                    <div>
                        <img src={logoImg} className="h-[100px]" alt='logo'/>
                    </div>
                    <div>
                        <button className='text-white font-bold text-lg mx-4'>How it works</button>
                        <button className='text-white font-bold text-lg mx-4'>Upgrade</button>
                        <button className='text-white font-bold text-lg mx-4'>Contact us</button>
                        <button className='text-white font-bold text-lg mx-4'>More</button>
                    </div>
                    <div>

                    </div>
                </div>
            </div>
        </>
    )
}

export default Navbar