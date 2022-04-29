import { useContext } from 'react';
import { ThemeContext } from'../context'

function Background(){

    const { background } = useContext(ThemeContext);

    return (
        <div className='relative w-full h-full'>

            <div className={`absolute inset-0 transition-opacity duration-500 ease-in-out ${
                background.show ? 'opacity-100' : 'opacity-0'}`}
            >
                <video src={background.link1} className="absolute top-1/2 left-1/2 transform -translate-x-1/2 
                -translate-y-1/2 w-full min-h-full object-cover lg:aspect-video" 
                autoPlay muted loop playsInline
                />
            </div>

            <div className={`absolute inset-0 transition-opacity duration-500 ease-in-out ${
                !background.show ? 'opacity-100' : 'opacity-0'}`}
            >
                <video src={background.link2} className="absolute top-1/2 left-1/2 transform -translate-x-1/2 
                -translate-y-1/2 w-full min-h-full object-cover lg:aspect-video" 
                autoPlay muted loop playsInline
                />
            </div>
        </div>
    )
}

export default Background