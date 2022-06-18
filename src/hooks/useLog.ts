import {useEffect} from "react";

export default function useLog(state: any){
    useEffect(() => {
        console.log(state);
    }, [state]);
}
