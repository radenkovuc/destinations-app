import {ChangeEvent, KeyboardEvent, useMemo, useState} from "react";
import {useDispatch} from "react-redux";

import {Destination} from "@/domain";
import {getSearchDestinations} from "@/services";

import {setDestinations, setError, setFocusedResult, setIsOpen, setLoadingFinished, updateInput} from "@/state";
import {useReduxState} from "@/state/store";

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

            const result = await getSearchDestinations(input);
            setResultCache(prevCache => ({...prevCache, [input]: result}));
            return result;
        };
    }, [resultCache]);

    const onInput = async (e: ChangeEvent<HTMLInputElement>): Promise<void> => {
        void onChange(e.target.value)
    };

    const onChange = async (input: string): Promise<void> => {
        dispatch(updateInput(input))
        dispatch(setFocusedResult(0))
        try {
            const destinations = await getCashedSearchDestinations(input)
            dispatch(setDestinations(destinations))
        } catch (e) {
            dispatch(setError())
        } finally {
            dispatch(setLoadingFinished())
        }
    };

    const onFocus = async (): Promise<void> => {
        if (input) {
            await onChange(input)
            dispatch(setIsOpen(true))
        }
    }


    return <input className={BASE_CLASS} value={input} onInput={onInput} onFocus={onFocus} onKeyDown={onKeyDown}
                  placeholder="Search for location..."/>

}
