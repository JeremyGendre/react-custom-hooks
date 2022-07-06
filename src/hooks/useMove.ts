import {RefObject, useEffect} from "react";
import {useDebounceLeading} from "./index";

export default function useMove(ref: RefObject<HTMLElement>) {
    const debouncedDragOver = useDebounceLeading(
        (e: DragEvent, element: HTMLElement, shiftX, shiftY) => {
            element.style.left = e.pageX - shiftX + "px";
            element.style.top = e.pageY - shiftY + "px";
        },
        50
    );

    useEffect(() => {
        if (!ref.current) return;

        let shiftX = 0, shiftY = 0;
        const element = ref.current;

        const dragOver = (e: DragEvent) => debouncedDragOver(e, element, shiftX, shiftY);
        const dragStart = (e: DragEvent) => {
            shiftX = e.clientX - element.getBoundingClientRect().left;
            shiftY = e.clientY - element.getBoundingClientRect().top;
            document.addEventListener("dragover", dragOver);

            e.dataTransfer!.setDragImage(
                element,
                window.outerWidth * 2,
                window.outerHeight * 2
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
    }, [ref, debouncedDragOver]);
}
