"use client"
import { FC, useRef, useState } from "react"
import { CustomVideoElemant, EnumPlayerQuality } from "./player.types"
import { usePlayer } from "./hooks/usePlayer"
import { Maximize, Pause, Play, RotateCcw, RotateCw } from "lucide-react"
import SelectQuality from "../Select/SelectQuality"
import ProgressBar from "../ProgressBar/ProgressBar"

const Player: FC = () => {
    const { ChangeQuality,
        toggleFullScreen,
        SkipTime,
        togglPlayPause,
        playerRef,
        isPlay,
        quality,
        progress,
        currentTime,
        videoTime } = usePlayer()

    const [isOnLoad, setisOnLoad] = useState<boolean>(false)
    return (
        <section className="max-w-5xl rounded-lg m-auto relative border">
            <video
                src="/uploads/1080/1727785873904-418616528.mp4#t=2"
                ref={playerRef}
                controls={false}
                className="w-full h-full object-cover"
                onLoad={() => setisOnLoad}
                onCanPlayThrough={() => {
                    console.log('Loading...')
                    setisOnLoad(true)
                }}
            />
            <div className="flex items-center justify-between p-3 bg-gray-900 relative">
                <ProgressBar progress={progress} />
                <div className="flex gap-2">
                    <button className="hoverPrimary" onClick={togglPlayPause}>
                        {isPlay ? <Pause /> : <Play />}
                    </button>
                    <button className="hoverPrimary" onClick={() => { SkipTime('backward') }}><RotateCcw size={16} /></button>
                    <button className="hoverPrimary" onClick={() => { SkipTime('forward') }}><RotateCw size={16} /></button>
                    <div className="flex items-center gap-1 border-l pl-2">
                        <span>{Math.floor(currentTime / 60) + ':' + ('0' + Math.floor(currentTime % 60)).slice(-2)}</span>
                        <span>/</span>
                        <span>{Math.floor(videoTime / 60) + ':' + ('0' + Math.floor(videoTime % 60)).slice(-2)}</span>
                    </div>
                </div>

                <div className="flex gap-2">
                    <SelectQuality currentValue={quality} onChange={ChangeQuality} />
                    <button className="hoverPrimary" onClick={toggleFullScreen}>
                        <Maximize />
                    </button>
                </div>
            </div>
        </section >)
}


export default Player