import {ChangeEvent, KeyboardEvent} from "react";

const BASE_CLASS = 'destinations-app__search-input';


interface SearchInputProps {
    onChange: (input: string) => void
    onClick: () => void
    onKeyDown: (e: KeyboardEvent<HTMLInputElement>) => void
    input: string
}

export const SearchInput = ({onChange, onClick, onKeyDown, input}: SearchInputProps): JSX.Element => {
    const onInput = async (e: ChangeEvent<HTMLInputElement>): Promise<void> => {
        onChange(e.target.value)
    };

    return <input className={BASE_CLASS} value={input} onInput={onInput} onFocus={onClick} onKeyDown={onKeyDown}
                  placeholder="Search for location..."/>

}
