import {useCallback, useRef} from "react";

export default function useDebounceLeading(
    callback: (...args: any) => void,
    timeout: number = 300
) {
    const timer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
    const callBackRef = useCallback(callback, [callback]);

    return (...args: any) => {
        if (!timer.current) {
            callBackRef.apply(null, args);
            clearTimeout(timer.current);
            timer.current = setTimeout(() => {
                timer.current = undefined;
            }, timeout);
        }
    };
}
