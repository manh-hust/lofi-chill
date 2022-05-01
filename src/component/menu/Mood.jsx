import { useState } from 'react';
// import { SLEEPY_LINKS, CHILL_LINKS, JAZZY_LINKS, NOISE_ICONS } from '../../constants';
import { sleepyIcon, jazzyIcon, chillIcon, volumeMinIcon, volumeMaxIcon } from '../../assets/icons';

function MoodItem({ iconSrc, label, className, isActive, handleClick }) {
	return (
		<div
			className='relative flex items-center h-16 col-span-1 bg-bg-200 rounded-xl cursor-pointer group'
			onClick={handleClick}
		>
			<div className={`absolute w-[150px] h-[150px] -top-12 pointer-events-none ${className}`}>
				<img
					src={iconSrc}
					alt='mood-icon'
					className={`h-full w-full transition duration-200 ease-out ${
						isActive ? 'opacity-100 brightness-100' : 'opacity-10 brightness-200'
					}	group-hover:opacity-50`}
				/>
			</div>
			<p
				className={`absolute bottom-5 left-1/2  font-semibold transition duration-200 ease-out ${
					isActive ? 'opacity-100 brightness-100' : 'opacity-10 brightness-200'
				}	group-hover:opacity-50`}
			>
				{label}
			</p>
		</div>
	);
}

function Mood(){


    const initialTab = { sleepy: false, jazzy: false, chill: false };
	const [moodTab, setMoodTab] = useState({ ...initialTab, chill: true });

    const handleMoodType = (type) => {
		// let newSong;
		// setIsPlaying(true);

		switch (type) {
			case 'sleepy':
				setMoodTab({ ...initialTab, sleepy: true });
				// newSong = randomMainSong(SLEEPY_LINKS, currentSong.index);
				// setCurrentSong({
				// 	...currentSong,
				// 	list: SLEEPY_LINKS,
				// 	index: newSong.index,
				// 	link: newSong.link,
				// });
				break;

			case 'jazzy':
				setMoodTab({ ...initialTab, jazzy: true });
				// newSong = randomMainSong(JAZZY_LINKS, currentSong.index);
				// setCurrentSong({
				// 	...currentSong,
				// 	list: JAZZY_LINKS,
				// 	index: newSong.index,
				// 	link: newSong.link,
				// });
				break;

			case 'chill':
				setMoodTab({ ...initialTab, chill: true });
				// newSong = randomMainSong(CHILL_LINKS, currentSong.index);
				// setCurrentSong({
				// 	...currentSong,
				// 	list: CHILL_LINKS,
				// 	index: newSong.index,
				// 	link: newSong.link,
				// });
				break;

			default:
				break;
		}
	};

    return (
        <div className='absolute right-[88px] w-[345px] bg-bg-menu rounded-3xl p-4 z-20'>
            <div className='mb-4 flex justify-between items-center'>
                <h4 className='font-bold mb-4 text-xl text-white'>Mood</h4>
            </div>
            <div className='my-4 grid grid-cols-2 gap-y-2 gap-x-4 flex-wrap justify-between items-center text-white'>
                <MoodItem
					isActive={moodTab.sleepy}
					iconSrc={sleepyIcon}
					label='Sleepy'
					className='-left-7'
					handleClick={() => handleMoodType('sleepy')}
				/>
				<MoodItem
					isActive={moodTab.jazzy}
					iconSrc={jazzyIcon}
					label='Jazzy'
					className='-left-7'
					handleClick={() => handleMoodType('jazzy')}
				/>
				<MoodItem
					isActive={moodTab.chill}
					iconSrc={chillIcon}
					label='Chill'
					className='-left-8'
					handleClick={() => handleMoodType('chill')}
				/>
            </div>
        </div>
    )
}

export default Mood