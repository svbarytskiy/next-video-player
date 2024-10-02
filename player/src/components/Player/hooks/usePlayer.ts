import { useEffect, useRef, useState } from "react"
import { CustomVideoElemant, EnumPlayerQuality } from "../player.types"

export function usePlayer() {
    const SKIP_NUM = 15;

    const playerRef = useRef<CustomVideoElemant>(null);
    const [videoTime, setVideoTime] = useState<number>(0);
    const [currentTime, setCurrentTime] = useState<number>(0);
    const [progress, setProgress] = useState<number>(0);
    const [isPlay, setIsPlay] = useState<boolean>(false);
    const [quality, setQuality] = useState(EnumPlayerQuality['1080p']);
    const [volume, setVolume] = useState<number>(1); // Додано для гучності (0 до 1)
    const [showBackward, setShowBackward] = useState<boolean>(false);
    const [showForward, setShowForward] = useState<boolean>(false);

    const togglePlayPause = () => {
        if (isPlay) {
            playerRef.current?.pause();
        } else {
            playerRef.current?.play();
        }
        setIsPlay(!isPlay);
    };

    const SkipTime = (type?: 'forward' | 'backward') => {
        if (playerRef.current) {
            if (type === 'forward') {
                playerRef.current.currentTime += SKIP_NUM;
                setShowForward(true);  // Показуємо іконку для скіпу вперед
                setTimeout(() => setShowForward(false), 500);  // Ховаємо іконку через 2 секунди
            } else {
                playerRef.current.currentTime -= SKIP_NUM;
                setShowBackward(true);  // Показуємо іконку для скіпу назад
                setTimeout(() => setShowBackward(false), 500);  // Ховаємо іконку через 2 секунди
            }
        }
    };
    const updateProgress = (newProgress: number) => {
        const video = playerRef.current;
        if (video) {
            video.currentTime = (newProgress / 100) * video.duration;
            setProgress(newProgress);
        }
    };

    const toggleFullScreen = () => {
        if (playerRef.current) {
            if (playerRef.current.requestFullscreen) {
                playerRef.current.requestFullscreen();
            } else if (playerRef.current.webkitRequestFullScreen) {
                playerRef.current.webkitRequestFullScreen();
            } else if (playerRef.current.msRequestFullScreen) {
                playerRef.current.msRequestFullScreen();
            } else if (playerRef.current.mozRequestFullScreen) {
                playerRef.current.mozRequestFullScreen();
            }
        }
    };

    const ChangeQuality = (newQuality: EnumPlayerQuality) => {
        if (playerRef.current) {
            setQuality(newQuality);
            playerRef.current.src = `/uploads/${quality}/1727785873904-418616528.mp4`; // Реальний шлях до відео
            playerRef.current.currentTime = currentTime;
            playerRef.current.play();
            setIsPlay(true);
        }
    };

    // Новий метод для зміни гучності
    const changeVolume = (newVolume: number) => {
        if (playerRef.current) {
            playerRef.current.volume = newVolume; // Змінюємо гучність
            setVolume(newVolume);
        }
    };

    useEffect(() => {
        const originalTime = playerRef.current?.duration;
        if (originalTime) {
            setVideoTime(originalTime);
            const currentTime = playerRef.current.currentTime;
            const duration = playerRef.current.duration;
            setCurrentTime(currentTime);
            setProgress((currentTime / duration) * 100);
        }
    }, [playerRef.current?.duration]);

    useEffect(() => {
        const updateProgress = () => {
            if (!playerRef.current) return;
            const currentTime = playerRef.current.currentTime;
            const duration = playerRef.current.duration;
            setCurrentTime(currentTime);
            setProgress((currentTime / duration) * 100);
        };

        playerRef?.current?.addEventListener('timeupdate', updateProgress);
        return () => {
            playerRef?.current?.removeEventListener('timeupdate', updateProgress);
        };
    }, []);

    return {
        ChangeQuality,
        toggleFullScreen,
        SkipTime,
        togglePlayPause,
        changeVolume, // Додаємо метод для зміни гучності
        playerRef,
        isPlay,
        quality,
        progress,
        currentTime,
        videoTime,
        volume,
        updateProgress,
        showBackward,
        showForward
    };
}