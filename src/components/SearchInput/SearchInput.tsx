import {ChangeEvent, KeyboardEvent, useMemo, useState} from "react";
import {useDispatch} from "react-redux";
import axios from "axios";

import {Destination} from "@/domain";
import {searchActions, useReduxState} from "@/store";

const BASE_CLASS = 'destinations-app__search-input';

interface ResultCache {
    [key: string]: Destination[];
}

interface SearchInputProps {
    onKeyDown: (e: KeyboardEvent<HTMLInputElement>) => void
}

export const SearchInput = ({onKeyDown}: SearchInputProps): JSX.Element => {
    const [resultCache, setResultCache] = useState<ResultCache>({});

    const {input} = useReduxState(s => s.search)
    const dispatch = useDispatch();


    const getCashedSearchDestinations = useMemo(() => {
        return async (input: string): Promise<Destination[]> => {
            if (resultCache.hasOwnProperty(input)) {
                return resultCache[input];
            }

            const result = await axios.get<Destination[]>("/api/destinations", {params: {search: input}});
            const data = result.data

            setResultCache(prevCache => ({...prevCache, [input]: data}));
            return data;
        };
    }, [resultCache]);

    const onInput = async (e: ChangeEvent<HTMLInputElement>): Promise<void> => {
        void onChange(e.target.value)
    };

    const onChange = async (input: string): Promise<void> => {
        dispatch(searchActions.updateInput(input))
        dispatch(searchActions.setFocusedResult(0))
        try {
            const destinations = await getCashedSearchDestinations(input)
            dispatch(searchActions.setDestinations(destinations))
        } catch (e) {
            dispatch(searchActions.setError())
        } finally {
            dispatch(searchActions.setLoadingFinished())
        }
    };

    const onFocus = async (): Promise<void> => {
        if (input) {
            await onChange(input)
            dispatch(searchActions.setIsOpen(true))
        }
    }


    return <input className={BASE_CLASS} value={input} onInput={onInput} onFocus={onFocus} onKeyDown={onKeyDown}
                  placeholder="Search for location..."/>

}
