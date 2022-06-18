import {useEffect, useRef} from "react";

export default function useTimeout(callback: () => {}, delay: number | null){
    const savedCallback = useRef(callback);

    useEffect(() => {
        savedCallback.current = callback;
    },[callback]);

    useEffect(() => {
        if (delay === null || delay < 0) return;

        const timeout = setTimeout(() => savedCallback.current(), delay);

        return () => clearTimeout(timeout)
    }, [delay])
}
