import { FC } from "react"

interface VideoTimeProps {
    currentTime: number,
    videoTime: number
}

const VideoTime: FC<VideoTimeProps> = ({ currentTime, videoTime }) => {
    return (<div className="flex items-center gap-1 pl-2">
        <span>{Math.floor(currentTime / 60) + ':' + ('0' + Math.floor(currentTime % 60)).slice(-2)}</span>
        <span>/</span>
        <span>{Math.floor(videoTime / 60) + ':' + ('0' + Math.floor(videoTime % 60)).slice(-2)}</span>
    </div>)
}
export default VideoTime