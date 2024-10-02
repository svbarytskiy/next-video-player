// components/ProgressBar.tsx
"use client";
import { FC } from "react";

interface Props {
    progress: number;
    onProgressChange: (newProgress: number) => void; // Змінюємо тип для передачі нової логіки
}

const ProgressBar: FC<Props> = ({ progress, onProgressChange }) => {
    return (
        <div
            className="absolute -top-0.5 left-0 w-full bg-dark-100 cursor-pointer"
            onClick={(e) => {
                const { clientX } = e;
                const { left, width } = e.currentTarget.getBoundingClientRect();
                const newProgress = ((clientX - left) / width) * 100; // Обчислення нового прогресу
                onProgressChange(newProgress); // Виклик функції для зміни прогресу
            }}
        >
            <div style={{ width: `${progress}%` }} className="h-1 bg-primary relative">
                <div className="absolute -top-1 h-3 w-3 rounded-full right-0 border-2 border-solid border-white shadow"></div>
            </div>
        </div>
    );
};

export default ProgressBar;
