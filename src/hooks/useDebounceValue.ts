import {useEffect, useState} from "react";
import useDebounce from "./useDebounce";

/**
 * Debounce the given value
 * @param value value to debounce
 * @param timer in ms (default 500) : debounce time
 */
export default function useDebounceValue(value: string, timer: number = 500) {
    const [debouncedValue, setDebouncedValue] = useState("");

    const debouncedValueCallback = useDebounce((newValue) => {
        setDebouncedValue(newValue);
    }, timer);

    useEffect(() => {
        debouncedValueCallback(value);
    }, [value, debouncedValueCallback]);

    return debouncedValue;
}
