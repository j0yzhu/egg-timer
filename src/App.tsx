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
        <div className={"display-flex"}>
            {
                !clicked &&
                <div className="flex flex-col items-center gap-2">
                    <MyButton onClick={() => handleClick(3)}>Soft Boiled (3min)</MyButton>
                    <MyButton onClick={() => handleClick(3)}>Medium Boiled (5min)</MyButton>
                    <MyButton onClick={() => handleClick(3)}>Hard bBoiled (7min)</MyButton>
                    <MyButton onClick={() => handleClick(3)}>Extra Hard Boiled (10min)</MyButton>
                </div>
            }
            {
                clicked &&
                <div>
                    <p>Your eggs are ready in...</p>
                    <p>{minutes}:{seconds < 10 && 0}{seconds}</p>
                </div>
            }
            {
                timer === 0 && <h1>All done, enjoy your eggs!</h1>
            }
        </div>
    )
}

interface MyButtonProps {
    children: ReactNode
    onClick: () => void
}

const MyButton: React.FC<MyButtonProps> = ({children, onClick}) => {
    return (
        <button
            onClick={onClick}
            className="border-r-8 border-solid px-2 py-4 cursor-pointer transition-transform duration-300
            hover:border-white block bg-amber-100 max-w-sm">
            {children}
        </button>
    )
}

export default App
