import { useEffect, useReducer, useRef } from 'react'

interface State<T> {
    data?: T;
    loading?: boolean;
    error?: Error;
}

type Cache<T> = { [url: string]: T }

// discriminated union type
type Action<T> =
    | { type: 'loading' }
    | { type: 'fetched'; payload: T }
    | { type: 'error'; payload: Error }

export default function useFetch<T = unknown>(url?: string, options?: RequestInit): State<T> {
    const cache = useRef<Cache<T>>({});
    const cancelRequest = useRef<boolean>(false); // prevent state updating if unmount
    const initialState: State<T> = {
        error: undefined,
        loading: undefined,
        data: undefined,
    };

    const fetchReducer = (state: State<T>, action: Action<T>): State<T> => {
        switch (action.type) {
            case 'loading':
                return { ...initialState, loading: true };
            case 'fetched':
                return { ...initialState, data: action.payload, loading: false };
            case 'error':
                return { ...initialState, error: action.payload, loading: false };
            default:
                return state;
        }
    };

    const [state, dispatch] = useReducer(fetchReducer, initialState);

    useEffect(() => {
        if (!url) return;

        cancelRequest.current = false;

        const fetchData = async () => {
            dispatch({ type: 'loading' });

            if (cache.current[url]) {
                dispatch({ type: 'fetched', payload: cache.current[url] });
                return;
            }

            try {
                const response = await fetch(url, options);
                if (!response.ok) throw new Error(response.statusText);

                const data = (await response.json()) as T;
                cache.current[url] = data;
                if (cancelRequest.current) return;

                dispatch({ type: 'fetched', payload: data })
            } catch (error) {
                if (cancelRequest.current) return;

                dispatch({ type: 'error', payload: error as Error })
            }
        };

        void fetchData();

        return () => { cancelRequest.current = true }
    }, [url]);

    return state;
}
