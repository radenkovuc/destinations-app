import {useEffect, useRef} from "react"

const isBrowser = typeof window !== 'undefined';

export function useEventListener(
    eventType: keyof GlobalEventHandlersEventMap,
    callback: (e: Event) => void,
    element: Window | Document | null = isBrowser ? window : null
) {
    const callbackRef = useRef(callback)

    useEffect(() => {
        callbackRef.current = callback
    }, [callback])

    useEffect(() => {
        if (element == null) return;

        const handler = (e: Event) => callbackRef.current(e)
        element.addEventListener(eventType, handler)

        return () => element.removeEventListener(eventType, handler)
    }, [eventType, element])
}