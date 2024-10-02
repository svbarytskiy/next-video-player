// components/ChangeSound.tsx
"use client";
import { Volume2, VolumeX } from "lucide-react";
import { FC, useState } from "react";

interface ChangeSoundProps {
    volume: number;
    changeVolume: (volume: number) => void;
}

const ChangeSound: FC<ChangeSoundProps> = ({ volume, changeVolume }) => {
    const [previousVolume, setPreviousVolume] = useState<number>(volume); // Додано для зберігання попереднього значення

    const toggleVolume = () => {
        if (volume === 0) {
            changeVolume(previousVolume);
        } else {
            setPreviousVolume(volume);
            changeVolume(0);
        }
    };
    return (
        <div className="flex items-center gap-2 max-w-[100px]">
            <button className="hoverPrimary" onClick={toggleVolume}>
                {volume === 0 ? <VolumeX size={16} /> : <Volume2 size={16} />}
            </button>
            <input
                type="range"
                min="0"
                max="1"
                step="0.1"
                value={volume}
                onChange={(e) => changeVolume(parseFloat(e.target.value))}
                className="mx-2 appearance-none bg-transparent" // Зменшено до w-10 (ширина)
                style={{ cursor: 'pointer' }} // Додано для курсору "pointer"
            />
            <style jsx>{`
                input[type='range'] {
                    -webkit-appearance: none; /* Safari */
                    width: 100%; /* Ширина слайдера, що заповнює контейнер */
                    margin: 0; /* Зменшити дожим */
                }

                input[type='range']::-webkit-slider-thumb {
                    -webkit-appearance: none;
                    appearance: none;
                    width: 12px;
                    height: 12px;
                    border-radius: 50%;
                    background: #FA8A5D; /* Колір точки (thumb) */
                    cursor: pointer;
                    transition: background-color 0.3s ease;
                    margin-top: -4%; /* Центрування thumb по вертикалі */
                }

                // /* Зміни для Firefox */
                // input[type='range']::-moz-range-thumb {
                //      width: 12px;
                    // height: 12px;
                //     border-radius: 50%;
                //     background: #FA8A5D; /* Колір точки (thumb) */
                //     cursor: pointer;
                //     transition: background-color 0.3s ease;
                // }

                // /* Зміни для Internet Explorer */
                // input[type='range']::-ms-thumb {
                //      width: 12px;
                    // height: 12px;
                //     border-radius: 50%;
                //     background: #FA8A5D; /* Колір точки (thumb) */
                //     cursor: pointer;
                //     transition: background-color 0.3s ease;
                // }

                input[type='range']::-webkit-slider-runnable-track {
                    height: 5px;
                    background: #ccc; /* Колір доріжки */
                    border-radius: 4px;
                }

                input[type='range']::-moz-range-track {
                    height: 5px;
                    background: #ccc; /* Колір доріжки */
                    border-radius: 4px;
                }

                input[type='range']::-ms-track {
                    height: 5px;
                    background: #ccc; /* Колір доріжки */
                    border-radius: 4px;
                    border: none;
                }
            `}</style>
        </div>
    );
};

export default ChangeSound;
