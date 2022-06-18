import {RefObject, useEffect} from "react";

type Handler = (event: MouseEvent) => void

export default function useClickAway(ref: RefObject<Element>, callBack: Handler){

    const handleRefClick = (event: MouseEvent) => {
        if(!ref.current?.contains(event.target as Element)){
            callBack(event);
        }
    };

    useEffect(() => {
        window.addEventListener('mousedown', handleRefClick);
        return () => {window.removeEventListener('mousedown', handleRefClick)};
    },[]);
}
