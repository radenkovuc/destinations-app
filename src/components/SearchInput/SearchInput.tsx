import {ChangeEvent} from "react";

const BASE_CLASS = 'destinations-app__search-input';


interface SearchInputProps {
    onChange: (input: string) => void
    onClick: () => void
    input: string
}

export const SearchInput = ({onChange, onClick, input}: SearchInputProps): JSX.Element => {
    const onInput = async (e: ChangeEvent<HTMLInputElement>): Promise<void> => {
        onChange(e.target.value)
    };


    return <input className={BASE_CLASS} value={input} onInput={onInput} onFocus={onClick}
                  placeholder="Search for location..."/>

}
