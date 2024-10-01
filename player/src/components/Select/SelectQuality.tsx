"use client"
import { FC } from "react";
import { EnumPlayerQuality } from "../Player/player.types";
import useOutside from "@/hooks/useOutside";

interface Props {
    currentValue: EnumPlayerQuality;
    onChange: (quality: EnumPlayerQuality) => void;
}


const SelectQuality: FC<Props> = ({ currentValue, onChange }) => {
    const QUALITIES: EnumPlayerQuality[] = [
        EnumPlayerQuality.original,
        EnumPlayerQuality["1080p"],
        EnumPlayerQuality["720p"],
        EnumPlayerQuality["480p"],
    ]

    const { isShow, ref, setIsShow } = useOutside(false);
    return (
        <div className="relative" ref={ref}>
            <button onClick={() => setIsShow(!isShow)}>
                {currentValue}
            </button>
            {isShow && (
                <ul className="absolute z-10 rounded bg-gray-700 p-2 bottom-full">
                    {QUALITIES.map((quality) => (
                        <li key={quality} className={currentValue === quality ? 'text-primary' : 'text-white'}>
                            <button
                                onClick={() => {
                                    onChange(quality);
                                    setIsShow(false);
                                }}
                            >
                                {quality}
                            </button>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}
export default SelectQuality