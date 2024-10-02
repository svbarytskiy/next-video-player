import { Pause, Play, RotateCcw, RotateCw, Maximize } from "lucide-react";
import { FC } from "react";
import ChangeSound from "../ChangeSound/ChangeSound";
import ProgressBar from "../ProgressBar/ProgressBar";
import SelectQuality from "../Select/SelectQuality";
import VideoTime from "../VideoTime/VideoTime";
import { EnumPlayerQuality } from "../Player/player.types";

interface BottombarProps {
  updateProgress: (progress: number) => void; // Функція для оновлення прогресу
  progress: number; // Прогрес відео (у відсотках)
  togglePlayPause: () => void; // Функція для перемикання відтворення/паузи
  isPlay: boolean; // Статус відтворення (грає чи на паузі)
  SkipTime: (direction: 'forward' | 'backward') => void; // Функція для скіпу часу вперед/назад
  currentTime: number; // Поточний час відео
  videoTime: number; // Загальний час відео
  volume: number; // Поточний рівень гучності
  changeVolume: (volume: number) => void; // Функція для зміни гучності
  quality: EnumPlayerQuality; // Поточна якість відео
  ChangeQuality: (quality: EnumPlayerQuality) => void; // Функція для зміни якості відео
  toggleFullScreen: () => void; // Функція для перемикання повноекранного режиму
}

const Bottombar: FC<BottombarProps> = ({
  updateProgress,
  progress,
  togglePlayPause,
  isPlay,
  SkipTime,
  currentTime,
  videoTime,
  volume,
  changeVolume,
  quality,
  ChangeQuality,
  toggleFullScreen,
}) => {
  return (
    <div className="absolute bottom-0 left-0 right-0 w-full p-3 bg-black bg-opacity-50 backdrop-blur-md">
      <div className="flex items-center justify-between w-full">
        <ProgressBar setProgress={updateProgress} progress={progress} />
        <div className="flex w-full gap-2">
          <button className="hoverPrimary" onClick={togglePlayPause}>
            {isPlay ? <Pause /> : <Play />}
          </button>
          <button className="hoverPrimary" onClick={() => SkipTime('backward')}>
            <RotateCcw size={16} />
          </button>
          <button className="hoverPrimary" onClick={() => SkipTime('forward')}>
            <RotateCw size={16} />
          </button>
          <VideoTime currentTime={currentTime} videoTime={videoTime} />
          <ChangeSound volume={volume} changeVolume={changeVolume} />
        </div>
        <div className="flex gap-2 items-center">
          <SelectQuality currentValue={quality} onChange={ChangeQuality} />
          <button className="hoverPrimary" onClick={toggleFullScreen}>
            <Maximize />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Bottombar;