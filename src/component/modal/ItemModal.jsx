import Pomodoro from "./Pomodoro"
import { ThemeContext } from '../../context'
import { useContext} from 'react'
import Draggable from 'react-draggable';

function ItemModal(){

    const { visiableFocusType: {
        pomodoro, session, notes, history
    }} = useContext(ThemeContext)

    return(
        <>
            {pomodoro && (
				<Draggable handle='.handle'>
					<div className='relative z-40'>
						<Pomodoro />
					</div>
				</Draggable>
			)}
        </>
    )
}

export default ItemModal