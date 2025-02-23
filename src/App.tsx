import {useEffect, useState} from 'react'
import './App.css'

function App() {
    const [timer, setTimer] = useState<number | undefined>(undefined);
    const [clicked, setClicked] = useState<boolean>(false);

    function handleClick(time: number) {
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
        <>
            {
                !clicked &&
                <div>
                    <button onClick={() => handleClick(3)}>Soft Boiled (3min)</button>
                    <button onClick={() => handleClick(5 * 60)}>Medium Boiled (5min)</button>
                    <button onClick={() => handleClick(7 * 60)}>Hard Boiled (7min)</button>
                    <button onClick={() => handleClick(10 * 60)}>Extra Hard Boiled (10min)</button>
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
        </>
    )
}

export default App
