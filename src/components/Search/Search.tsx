import {KeyboardEvent, useRef} from "react";
import {useDispatch} from "react-redux";

import {destinationActions, searchActions, useReduxState} from "@/store";

import {useClickOutside} from "@/hooks";

import SearchInput from "../SearchInput";
import SearchResults from "../SearchResults";


const BASE_CLASS = 'destinations-app__search';


export const Search = (): JSX.Element => {
    const {isOpen, focusedResult, destinations} = useReduxState(s => s.search)
    const ref = useRef<HTMLInputElement>(null);
    const dispatch = useDispatch();

    useClickOutside(ref, () => {
        dispatch(searchActions.setIsOpen(false))
    })

    const onSelectResult = (): void => {
        const selectedDestination = destinations[focusedResult];
        if (selectedDestination) {
            dispatch(searchActions.setInput(selectedDestination.name))
            dispatch(destinationActions.setDestination(selectedDestination))
        }
        dispatch(searchActions.setIsOpen(false))
    }

    const onKeyDown = (e: KeyboardEvent): void => {
        switch (e.key) {
            case 'Enter':
                onSelectResult();
                break;
            case "ArrowUp":
                if (focusedResult) {
                    dispatch(searchActions.setFocusedResult(focusedResult - 1))
                }
                break;
            case "ArrowDown":
                if (focusedResult < destinations.length - 1) {
                    dispatch(searchActions.setFocusedResult(focusedResult + 1))
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
