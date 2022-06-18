import {useEffect, useRef} from "react";

export default function useInterval(callback: () => {}, delay: number | null){
    const savedCallback = useRef(callback);

    useEffect(() => {
        savedCallback.current = callback;
    },[callback]);

    useEffect(() => {
        if (delay === null || delay < 0) return;

        const interval = setInterval(() => savedCallback.current(), delay);

        return () => clearInterval(interval)
    }, [delay])
}
