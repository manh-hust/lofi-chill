
function Button({ big, css, text, active}){

    return(
        <div className={`${big ? 'w-1/3' : 'w-20 font-medium mx-2'} ${css} text white cursor-pointer`}>
            <div className={`${active ? 'bg-primary text-black' : 'text-current'} text-center rounded-full py-1`}>
                {text}
            </div>
        </div>
    )
}

function Pomodoro() {

    return (
        <div className="absolute max-h-screen top-4 left-1/2 transform -translate-x-1/2">
            <div className="p-6 w-[440px] flex flex-col justify-center items-center rounded-3xl bg-black text-white">
                <h1 className="text-4xl font-medium	mb-4">Pomodoro</h1>

                <div className="flex w-full rounded-full bg-bg-200 p-2 mb-4">
                    <Button text={'Pomodoro'} active={true} big={true}/>
                    <Button text={'Short Break'}  big={true}/>
                    <Button text={'Long Break'}  big={true}/>
                </div>

                <div className="flex flex-col justify-center w-full rounded-lg bg-bg-200 w p-2 mb-4">
                    <div className="text-center text-5xl font-bold mb-8">25:00</div>
                    <div className="flex justify-center mb-4">
                        <Button text={'Start'} active={true}/>
                        <Button text={'Stop'}  active={true}/>
                        <Button text={'Reset'} active={true}/>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default  Pomodoro