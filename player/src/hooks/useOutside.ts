import { useEffect, useRef, useState } from 'react';

const useOutside = (initialValue: boolean) => {
    const [isShow, setIsShow] = useState(initialValue);
    const ref = useRef<HTMLDivElement>(null);

    const handleClickOutside = (event: MouseEvent) => {
        if (ref.current && !ref.current.contains(event.target as Node)) {
            setIsShow(false);
        }
    };

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return { isShow, ref, setIsShow };
};

export default useOutside;
