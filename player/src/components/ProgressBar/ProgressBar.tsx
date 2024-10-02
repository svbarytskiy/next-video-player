// components/ProgressBar.tsx
"use client";
import { FC } from "react";

interface Props {
    progress: number;
    setProgress?: (progress: number) => void; // Додано для оновлення прогресу ззовні
}

const ProgressBar: FC<Props> = ({ progress, setProgress }) => {
    // Обробник кліку для зміни прогресу
    const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
        if (!setProgress) return; // Перевірка, чи передано setProgress
        const progressBar = event.currentTarget; // Отримуємо елемент прогрес бару
        const rect = progressBar.getBoundingClientRect(); // Отримуємо розміри та позицію прогрес бару
        const offsetX = event.clientX - rect.left; // Відстань від лівого краю
        const newProgress = Math.min(Math.max((offsetX / rect.width) * 100, 0), 100); // Обчислюємо новий прогрес
        setProgress(newProgress); // Оновлюємо прогрес
    };

    return (
        <div 
            className="absolute -top-0.5 left-0 w-full bg-dark-100 cursor-pointer" 
            onClick={handleClick} // Додаємо обробник подій
        >
            <div 
                style={{ width: `${progress}%` }} 
                className="h-1 bg-primary relative"
            >
                <div className="absolute -top-1 h-3 w-3 rounded-full right-0 border-2 border-solid border-white shadow"></div>
            </div>
        </div>
    );
};

export default ProgressBar;
