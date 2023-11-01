import {KeyboardEvent, useRef} from "react";
import {useDispatch} from "react-redux";

import {useReduxState} from "@/state/store";

import {setDestination, setFocusedResult, setInput, setIsOpen} from "@/state";

import SearchInput from "../SearchInput";
import SearchResults from "../SearchResults";
import {useClickOutside} from "@/hooks";


const BASE_CLASS = 'destinations-app__search';


export const Search = (): JSX.Element => {
    const {isOpen, focusedResult, destinations} = useReduxState(s => s.search)
    const ref = useRef<HTMLInputElement>(null);
    const dispatch = useDispatch();

    useClickOutside(ref, () => {
        dispatch(setIsOpen(false))
    })

    const onSelectResult = (): void => {
        const selectedDestination = destinations[focusedResult];
        if (selectedDestination) {
            dispatch(setInput(selectedDestination.name))
            dispatch(setDestination(selectedDestination))
        }
        dispatch(setIsOpen(false))
    }

    const onKeyDown = (e: KeyboardEvent): void => {
        switch (e.key) {
            case 'Enter':
                onSelectResult();
                break;
            case "ArrowUp":
                if (focusedResult) {
                    dispatch(setFocusedResult(focusedResult - 1))
                }
                break;
            case "ArrowDown":
                if (focusedResult < destinations.length - 1) {
                    dispatch(setFocusedResult(focusedResult + 1))
                }
        }
    };

    return <div className={BASE_CLASS}>
        <label className={`${BASE_CLASS}__label`}>Location</label>
        <div className={`${BASE_CLASS}__content`} ref={ref}>
            <SearchInput onKeyDown={onKeyDown}/>
            {isOpen && <SearchResults onSelectResult={onSelectResult}/>}
        </div>
    </div>
}
