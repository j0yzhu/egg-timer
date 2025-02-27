import { ReactNode, useEffect, useState, useRef } from 'react';
import bgImage from './assets/Chick.png';
import click from './assets/ChickenSounds.mp3';

export const useWithSound = (audioSource: string) => {
    const soundRef = useRef<HTMLAudioElement | null>(null);

    useEffect(() => {
        soundRef.current = new Audio(audioSource);
    }, [audioSource]);

    const playSound = () => {
        if (soundRef.current) {
            soundRef.current.play();
        }
    };

    return { playSound };
};

function App() {
    const [timer, setTimer] = useState<number | undefined>(undefined);
    const [clicked, setClicked] = useState<boolean>(false);
    const { playSound } = useWithSound(click);

    function handleClick(time: number) {
        setClicked(true);
        setTimer(time);
    }

    const minutes = timer === undefined ? 0 : Math.floor(timer / 60);
    const seconds = timer === undefined ? 0 : timer % 60;

    useEffect(() => {
        if (timer === undefined || timer === 0) {
            if (timer === 0) playSound();
            return;
        }

        const interval = setInterval(() => {
            setTimer((prev) => (prev !== undefined ? prev - 1 : prev));
        }, 1000);

        return () => clearInterval(interval);
    }, [timer]); // Add `timer` as a dependency

    return (
        <div style={{ backgroundImage: `url(${bgImage})` }} className="bg-cover bg-center h-screen">
            <div className="flex justify-center p-6">
                <div className="relative flex flex-col items-center justify-center bg-gradient-to-b from-[#e2c3a8]
                to-[#c28d5c] w-[384px] h-[500px] rounded-[50%/65%_65%_45%_45%] drop-shadow-[0px_25px_10px_rgba(0,0,0,0.3)]">
                    <h1 className="absolute top-15 font-serif text-[#905a2c] text-2xl font-bold">Egg Timer</h1>
                    {!clicked ? (
                        <div className="flex flex-col items-center justify-center gap-2">
                            <MyButton onClick={() => handleClick(3)}>TEST</MyButton>
                            <MyButton onClick={() => handleClick(3 * 60)}>Soft Boiled (3min)</MyButton>
                            <MyButton onClick={() => handleClick(5 * 60)}>Medium Boiled (5min)</MyButton>
                            <MyButton onClick={() => handleClick(7 * 60)}>Hard Boiled (7min)</MyButton>
                            <MyButton onClick={() => handleClick(10 * 60)}>Extra Hard Boiled (10min)</MyButton>
                        </div>
                    ) : (
                        <div className="flex flex-col items-center justify-center h-screen font-serif text-xl
                        font-medium text-[#6b4320]">
                            <p>Your eggs are ready in...</p>
                            <p>{minutes}:{seconds < 10 ? `0${seconds}` : seconds}</p>
                            {timer === 0 && <h1>Enjoy your eggs!</h1>}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

interface MyButtonProps {
    children: ReactNode;
    onClick: () => void;
}

const MyButton: React.FC<MyButtonProps> = ({ children, onClick }) => {
    return (
        <button
            onClick={onClick}
            className="border border-[#e2bd9e] rounded-sm px-4 py-2 cursor-pointer transition-transform duration-300
            hover:border-white block bg-gradient-to-b from-[#e2bd9e] to-[#caa07e] max-w-sm shadow-md hover:shadow-lg">
            {children}
        </button>
    );
};

export default App;
