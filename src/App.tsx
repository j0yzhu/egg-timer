import {ReactNode, useEffect, useState} from 'react'

function App() {
    const [timer, setTimer] = useState<number | undefined>(undefined);
    const [clicked, setClicked] = useState<boolean>(false);

    function handleClick(time: number) {
        console.log(time);
        console.log("clicked")
        setClicked(true);
        setTimer(time)
    }

    const minutes = timer === undefined ? 0 : Math.floor(timer / 60);
    const seconds = timer === undefined ? 0 : timer % 60;

    useEffect(() => {
        if (timer === 0 || timer === undefined) {
            return;
        }

        const interval = setInterval(() => setTimer(timer - 1), 1000)
        return () => clearInterval(interval)

    })

    return (
        <div className="flex justify-center">
            <div className="relative flex flex-col items-center justify-center bg-[#d6a478] w-[384px] h-[500px]
            rounded-[50%/60%_60%_40%_40%] drop-shadow-[0px_15px_3px_rgba(0,0,0,0.25)]">
                <h1 className="absolute top-15 font-serif text-[#905a2c] text-2xl font-bold">Egg Timer</h1>
                {
                    !clicked &&
                    <div className="flex flex-col items-center justify-center gap-2">
                        <MyButton onClick={() => handleClick(3)}>Soft Boiled (3min)</MyButton>
                        <MyButton onClick={() => handleClick(5 * 60)}>Medium Boiled (5min)</MyButton>
                        <MyButton onClick={() => handleClick(7 * 60)}>Hard Boiled (7min)</MyButton>
                        <MyButton onClick={() => handleClick(10 * 60)}>Extra Hard Boiled (10min)</MyButton>
                    </div>
                }
                {
                    clicked &&
                    <div className="flex flex-col items-center justify-center h-screen font-serif text-xl font-medium text-[#6b4320]">
                        <p>Your eggs are ready in...</p>
                        <p>{minutes}:{seconds < 10 && 0}{seconds}</p>
                        {timer === 0 && <h1>Enjoy your eggs!</h1>}
                        <button></button>
                    </div>
                }
            </div>
        </div>
    )
}

interface MyButtonProps {
    children: ReactNode
    onClick: () => void
}

const MyButton: React.FC<MyButtonProps> = ({ children, onClick }) => {
    return (
        <button
            onClick={onClick}
            className="border border-[#e2bd9e] rounded-sm px-4 py-2 cursor-pointer transition-transform duration-300
            hover:border-white block bg-gradient-to-b from-[#e2bd9e] to-[#caa07e] max-w-sm shadow-md hover:shadow-lg">
            {children}
        </button>
    )
}

export default App
