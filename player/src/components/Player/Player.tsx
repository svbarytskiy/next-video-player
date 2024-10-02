"use client"
import { FC, useRef, useState } from "react"
import { CustomVideoElemant, EnumPlayerQuality } from "./player.types"
import { usePlayer } from "./hooks/usePlayer"
import { Maximize, Pause, Play, RotateCcw, RotateCw, Volume2, VolumeX } from "lucide-react"
import SelectQuality from "../Select/SelectQuality"
import ProgressBar from "../ProgressBar/ProgressBar"
import ChangeSound from "../ChangeSound/ChangeSound"
import VideoTime from "../VideoTime/VideoTime"
import Bottombar from "../Bottombar/Bottombar"

const Player: FC = () => {
    const { ChangeQuality,
        toggleFullScreen,
        SkipTime,
        togglePlayPause,
        playerRef,
        isPlay,
        quality,
        progress,
        currentTime,
        videoTime,
        volume,
        changeVolume,
        updateProgress,
        showBackward,
        showForward
    } = usePlayer()

    const [isOnLoad, setisOnLoad] = useState<boolean>(false)
    return (
        <section className="max-w-5xl rounded-xl m-auto relative mt-[100px] overflow-hidden">
            <video
                src="/uploads/1080/1727785873904-418616528.mp4#t=2"
                ref={playerRef}
                controls={false}
                className="w-full h-full object-cover"
                onCanPlayThrough={() => {
                    console.log('Video can play through');
                    setisOnLoad(false); // Відео готове до відтворення
                }}
                onWaiting={() => {
                    console.log('Video is buffering');
                    setisOnLoad(true); // Показуємо спінер, коли відео буферизується
                }}
                onPlaying={() => {
                    console.log('Video is playing');
                    setisOnLoad(false); // Ховаємо спінер, коли відео починає відтворюватися
                }}
                onEnded={() => {
                    console.log('Video has ended');
                    setisOnLoad(false); // Ховаємо спінер, коли відео закінчується
                }}
                onClick={togglePlayPause}
            />


            {isOnLoad && (
                <div className="absolute inset-0 flex justify-center items-center">
                    <div className="loader">
                        <svg
                            className="animate-spin h-40 w-40 text-primary"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                        >
                            {/* Темний круг на фон */}
                            <circle
                                cx="12"
                                cy="12"
                                r="12" // Зробіть радіус більшим для фону
                                fill="rgba(0, 0, 0, 0.15)" // Темний з великою прозорістю
                            />
                            {/* Основний круг спінера */}
                            <circle
                                cx="12"
                                cy="12"
                                r="8"
                                stroke="currentColor"
                                strokeWidth="3"
                                strokeDasharray="40 75" // Зменшуємо видиму частину
                                strokeDashoffset="0" // Починаємо з нуля
                            />
                        </svg>
                    </div>
                </div>


            )}
            <div
                className={`absolute h-[80%] w-[40%] top-1/2 left-0 transform -translate-y-1/2 flex justify-center items-center transition-opacity duration-700 ease-in-out`}>
                <RotateCcw
                    size={100}  // Збільшуємо розмір до 100
                    className={`transition-opacity duration-500 text-primary ease-in-out ${showBackward ? 'opacity-100 drop-shadow-2xl' : 'opacity-0'
                        }`}  // Додаємо дроп-шедоу і плавне зникнення
                />
            </div>

            <div
                className={`absolute h-[80%] w-[40%] top-1/2 right-0 transform -translate-y-1/2 flex justify-center items-center transition-opacity duration-700 ease-in-out`}>
                <RotateCw
                    size={100}  
                    className={`transition-opacity duration-500 text-primary ease-in-out ${showForward ? 'opacity-100 drop-shadow-2xl' : 'opacity-0'
                        }`}  // Додаємо дроп-шедоу і плавне зникнення
                />
            </div>

            {/* {!isPlay && (<div className="absolute h-full w-full top-0 hoverPrimary"><Play size={190} /></div>)} */}
            <Bottombar updateProgress={updateProgress}
                progress={progress}
                togglePlayPause={togglePlayPause}
                isPlay={isPlay}
                SkipTime={SkipTime}
                currentTime={currentTime}
                videoTime={videoTime}
                volume={volume}
                changeVolume={changeVolume}
                quality={quality}
                ChangeQuality={ChangeQuality}
                toggleFullScreen={toggleFullScreen} />
        </section>
    )
}


export default Player