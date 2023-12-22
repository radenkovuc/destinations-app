import {ChangeEvent, KeyboardEvent} from "react";

import {updateInput} from "@/store";
import {useAppDispatch, useAppSelector} from "@/hooks";

import classes from "./SearchInput.module.css";

interface SearchInputProps {
    onKeyDown: (e: KeyboardEvent<HTMLInputElement>) => void
}

export const SearchInput = ({onKeyDown}: SearchInputProps): JSX.Element => {
    const {input} = useAppSelector(s => s.search)
    const dispatch = useAppDispatch();

    const onInput = async (e: ChangeEvent<HTMLInputElement>): Promise<void> => {
        dispatch(updateInput(e.target.value))
    };

    const onFocus = async (): Promise<void> => {
        if (input) {
            dispatch(updateInput(input))
        }
    }

    return <input className={classes.input} value={input} onInput={onInput} onFocus={onFocus}
                  onKeyDown={onKeyDown}
                  placeholder="Search for location..."/>

}
