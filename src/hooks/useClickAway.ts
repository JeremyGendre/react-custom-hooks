import {RefObject, useEffect} from "react";

export default function useClickAway(ref: RefObject<Element>, callBack: () => void){

    const handleRefClick = (event: MouseEvent) => {
        if(!ref.current?.contains(event.target as Element)){
            callBack();
        }
    };

    useEffect(() => {
        document.addEventListener('click', handleRefClick);
        return () => {document.removeEventListener('click', handleRefClick)};
    },[]);
}
