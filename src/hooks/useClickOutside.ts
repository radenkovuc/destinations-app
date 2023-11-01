import {useEventListener} from ".";

export function useClickOutside(ref: any, cb: (e: Event) => void) {
    useEventListener(
        "click",
        e => {
            if (ref.current == null || ref.current.contains(e.target)) return
            cb(e)
        },
        typeof document !== 'undefined' ? document : null
    )
}