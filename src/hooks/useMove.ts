import {RefObject, useEffect} from "react";

export default function useMove(ref: RefObject<HTMLElement>){
    useEffect(() => {
        if (!ref.current) return;

        let shiftX = 0, shiftY = 0;
        const element = ref.current;

        const dragOver = (e: DragEvent) => {
            const dragX = e.pageX, dragY = e.pageY;
            element.style.left = dragX - shiftX + "px";
            element.style.top = dragY - shiftY*2 + "px";
        };
        const dragStart = (e:DragEvent) => {
            shiftX = e.clientX - element.getBoundingClientRect().left;
            shiftY = e.clientY - element.getBoundingClientRect().top;
            document.addEventListener("dragover", dragOver);

            e.dataTransfer!.setDragImage(
                element,
                window.outerWidth,
                window.outerHeight
            );
            element.style.bottom = "unset";
            element.style.right = "unset";
            element.style.position = "absolute";
        };
        const end = () => {
            document.removeEventListener("dragover", dragOver);
        };

        element.addEventListener("dragstart", dragStart);
        element.addEventListener("dragend", end);

        return () => {
            document.removeEventListener("dragover", dragOver);
            if (!element) return;
            element.removeEventListener("dragstart", dragStart);
            element.removeEventListener("dragend", end);
        };
    }, [ref]);
}
