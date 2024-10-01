import { FC } from "react"

interface Props {
    progress: number
}

const ProgressBar: FC<Props> = ({ progress }) => {

    return (
        <div className="absolute -top-0.5 left-0 w-full bg-dark-100">
            <div style={{ width: `${progress}%` }} className="h-1 bg-primary relative">
                <div className="absolute -top-1 h-3 w-3 rounded-full right-0 border-2 border-solid border-white shadow"></div>
            </div>
        </div>)
}
export default ProgressBar