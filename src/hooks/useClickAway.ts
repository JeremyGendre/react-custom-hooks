import {RefObject, useEffect} from "react";

type Handler = (event: MouseEvent) => void

export default function useClickAway(ref: RefObject<Element>, callback: Handler){

    const handleRefClick = (event: MouseEvent) => {
        if(!ref.current?.contains(event.target as Element)){
            callback(event);
        }
    };

    useEffect(() => {
        window.addEventListener('mousedown', handleRefClick);
        return () => {window.removeEventListener('mousedown', handleRefClick)};
    },[]);
}
