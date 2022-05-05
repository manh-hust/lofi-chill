import { useContext } from 'react';
import { SLEEPY_LINKS, CHILL_LINKS, JAZZY_LINKS, NOISE_ICONS } from '../../constants';
import { sleepyIcon, jazzyIcon, chillIcon, volumeMinIcon, volumeMaxIcon } from '../../assets/icons';
import { ThemeContext, randomAudio } from '../../context';
import ReactSlider from 'react-slider';

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
						isActive ? 'opacity-100 brightness-100' : 'opacity-10 brightness-200 group-hover:opacity-50'
					}`}
				/>
			</div>
			<p
				className={`absolute bottom-5 left-1/2  font-semibold transition duration-200 ease-out ${
					isActive ? 'opacity-100 brightness-100' : 'opacity-10 brightness-200 group-hover:opacity-50'
				}`}
			>
				{label}
			</p>
		</div>
	);
}

function Mood(){

	const {setCurrentMood, setCurrentAudio, setPlaying, moodTab, setMoodTab, controlRef, noisesRefs} = useContext(ThemeContext)
    const initialTab = { sleepy: false, jazzy: false, chill: false, youtube: false };

	const handleMoodType = (type) => {
		setPlaying(true);

		switch (type) {
			case 'sleepy':
				setMoodTab({ ...initialTab, sleepy: true });
				setCurrentMood(SLEEPY_LINKS)
				setCurrentAudio(randomAudio(SLEEPY_LINKS))
				break;

			case 'jazzy':
				setMoodTab({ ...initialTab, jazzy: true });
				setCurrentMood(JAZZY_LINKS)
				setCurrentAudio(randomAudio(JAZZY_LINKS))
				break;

			case 'chill':
				setMoodTab({ ...initialTab, chill: true });
				setCurrentMood(CHILL_LINKS)	
				setCurrentAudio(randomAudio(CHILL_LINKS))
				break;
			case 'youtube':
				setMoodTab({ ...moodTab, youtube: true });
				break;

			default:
				break;
		}
	};

    return (
        <div className='absolute right-[88px] w-[345px] bg-bg-menu rounded-3xl p-6 z-20'>
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
				<MoodItem
					isActive={moodTab.youtube}
					iconSrc={'https://lifo-95316.web.app/assets/search.0845ee8a.svg'}
					label='Youtube'
					className='left-6 w-9 -top-10'
					handleClick={() => handleMoodType('youtube')}
				/>
            </div>

			<div className="my-8 flex justify-between items-center">
				<img src={volumeMinIcon} alt='volume-min' className='relative -top-1 left-1' />
				<ReactSlider
					className='h-3 w-[200px] bg-bg-200 rounded-full'
					defaultValue={controlRef.current.volume * 50}
					onChange={(value) => {
						controlRef.current.volume = value / 100;
					}}
					renderTrack={(props, state) => (
						<div
							{...props}
							className={`inset-y-0 rounded-full ${state.index === 0 ? 'bg-primary' : ''}`}
							index={state.index}
						/>
					)}
					renderThumb={(props) => (
						<div
							{...props}
							className='-top-0.5 h-4 w-4 bg-white rounded-full cursor-pointer outline-none'
						/>
					)}
				>
				</ReactSlider>
				<img src={volumeMaxIcon} alt='volume-max' className='relative -top-1 right-1' />
			</div>
			
			<div className='mb-4 flex justify-between items-center'>
                <h4 className='font-bold mb-4 text-xl text-white'>Background noises</h4>
            </div>

			<div className='max-h-[280px] border border-transparent-w-20 rounded-xl px-2 overflow-y-auto'>
				{NOISE_ICONS.map((noise, index) => {
					return(
						<div key={index} className='my-4 flex justify-between items-center'>
							<p className='text-sm opacity-40 text-white'>{noise.label}</p>

							<ReactSlider
								className='h-6 w-[148px] bg-bg-200 rounded-full mr-1'
								defaultValue={noisesRefs.current[index].volume * 100}
								onBeforeChange={() => {
									const thisAudio = noisesRefs.current[index];
									if (thisAudio.paused) thisAudio.play();
									if (thisAudio.muted) thisAudio.muted = false;
								}}
								onChange={(value) => {

									console.log(value);
									return noisesRefs.current[index].volume = value / 100;
								}}
								renderTrack={(props, state) => {
									return (
									<div
										{...props}
										className={`inset-y-0 rounded-full ${state.index === 0 ? 'bg-primary' : ''}`}
										index={state.index}
									/>
								)}}
								renderThumb={(props) => (
									<div {...props} className='h-6 w-6 rounded-full cursor-pointer outline-none'>
										<img src={noise.icon} alt='icon' />
									</div>
								)}
							/>
						</div>
					)
				})}
			</div>
			
        </div>
    )
}

export default Mood