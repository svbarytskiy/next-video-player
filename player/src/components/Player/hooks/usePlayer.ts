import { useEffect, useRef, useState } from "react"
import { CustomVideoElemant, EnumPlayerQuality } from "../player.types"

export function usePlayer() {
    const SKIP_NUM = 15

    const playerRef = useRef<CustomVideoElemant>(null)
    const [videoTime, setVideoTime] = useState<number>(0)
    const [currentTime, setCurrentTime] = useState<number>(0)
    const [progress, setProgress] = useState<number>(0)

    const [isPlay, setIsPlay] = useState<boolean>(false)
    const [quality, setQuality] = useState(EnumPlayerQuality['1080p'])

    const togglPlayPause = () => {
        if (isPlay) {
            playerRef.current?.pause()
        } else {

            playerRef.current?.play()
        }
        setIsPlay(!isPlay)
    }

    const SkipTime = (type?: 'forward' | 'backward') => {
        if (playerRef.current) {
            if (type === 'forward') {
                playerRef.current.currentTime += SKIP_NUM
            } else {
                playerRef.current.currentTime -= SKIP_NUM
            }
        }
    }
    const toggleFullScreen = () => {
        if (playerRef.current) {
            if (playerRef.current.requestFullscreen) {
                playerRef.current.requestFullscreen(); // Додано дужки
            } else if (playerRef.current.webkitRequestFullScreen) {
                playerRef.current.webkitRequestFullScreen(); // Додано дужки
            } else if (playerRef.current.msRequestFullScreen) {
                playerRef.current.msRequestFullScreen(); // Додано дужки
            } else if (playerRef.current.mozRequestFullScreen) {
                playerRef.current.mozRequestFullScreen(); // Додано дужки
            }
        }
    }


    const ChangeQuality = (newQuality: EnumPlayerQuality) => {
        if (playerRef.current) {
            setQuality(newQuality);

            // Зміна джерела відео відповідно до якості (приклад, потрібно додати реальне джерело)
            playerRef.current.src = `/uploads/${quality}/1727785873904-418616528.mp4`; // Додайте реальний шлях до відео
            playerRef.current.currentTime = currentTime
            playerRef.current.play(); // Відтворення відео
            setIsPlay(true);
        }
    }


    useEffect(() => {
        const originalTime = playerRef.current?.duration
        if (originalTime) {
            setVideoTime(originalTime)
            const currentTime = playerRef.current.currentTime
            const duration = playerRef.current.duration
            setCurrentTime(currentTime)
            setProgress((currentTime / duration) * 100)
        }
    }, [playerRef.current?.duration])

    useEffect(() => {
        const updateProgress = () => {
            if (!playerRef.current) return
            const currentTime = playerRef.current.currentTime
            const duration = playerRef.current.duration
            setCurrentTime(currentTime)
            setProgress((currentTime / duration) * 100)
        }

        playerRef?.current?.addEventListener('timeupdate', updateProgress)
        return () => {
            playerRef?.current?.removeEventListener('timeupdate', updateProgress)
        }
    }, [])

    return {
        ChangeQuality,
        toggleFullScreen,
        SkipTime,
        togglPlayPause,
        playerRef,
        isPlay,
        quality,
        progress,
        currentTime,
        videoTime
    }
}