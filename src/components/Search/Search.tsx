import {KeyboardEvent, useEffect, useMemo, useRef, useState} from "react";

import {Destination} from "@/domain";
import {useStateContext} from "@/state";

import {getSearchDestinations} from "@/services";

import SearchInput from "../SearchInput";
import SearchResults from "../SearchResults";

const BASE_CLASS = 'destinations-app__search';

interface ResultCache {
    [key: string]: Destination[];
}

export const Search = (): JSX.Element => {
    const [isOpen, setIsOpen] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [isError, setIsError] = useState(false)
    const [input, setInput] = useState("")
    const [focusedResult, setFocusedResult] = useState(0)
    const [destinations, setDestinations] = useState<Destination[]>([]);
    const [resultCache, setResultCache] = useState<ResultCache>({});

    const {setDestination} = useStateContext()

    const ref = useRef<HTMLInputElement>(null);

    useEffect(() => {
        /**
         * close results if clicked on outside of content
         */
        function handleClickOutside(event: MouseEvent): void {
            if (ref.current && !ref.current.contains(event.target as Node)) {
                setIsOpen(false)
            }
        }

        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [ref]);


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

    const onInput = async (input: string): Promise<void> => {
        setFocusedResult(0)
        setIsOpen(!!input)
        setInput(input)
        setIsLoading(true)
        setIsError(false)
        try {
            const destinations = await getCashedSearchDestinations(input)
            setDestinations(destinations)
        } catch (e) {
            setIsError(true)
        } finally {
            setIsLoading(false)
        }
    };

    const onInputClick = async (): Promise<void> => {
        if (input) {
            await onInput(input)
            setIsOpen(true)
        }
    }

    const onSelectResult = (): void => {
        const selectedDestination = destinations[focusedResult];
        if (selectedDestination) {
            setInput(selectedDestination.name)
            setDestination(selectedDestination)
        }
        setIsOpen(false)
    }

    const onHoverResult = (index: number): void => {
        setFocusedResult(index)
    }

    const onKeyDown = (e: KeyboardEvent): void => {
        switch (e.key) {
            case 'Enter':
                onSelectResult();
                break;
            case "ArrowUp":
                if (focusedResult) {
                    setFocusedResult(focusedResult - 1)
                }
                break;
            case "ArrowDown":
                if (focusedResult < destinations.length - 1) {
                    setFocusedResult(focusedResult + 1)
                }
        }
    };

    return <div className={BASE_CLASS}>
        <label className={`${BASE_CLASS}__label`}>Location</label>
        <div className={`${BASE_CLASS}__content`} ref={ref}>
            <SearchInput onChange={onInput} input={input} onClick={onInputClick} onKeyDown={onKeyDown}/>
            {isOpen && <SearchResults isLoading={isLoading}
                                      isError={isError}
                                      onSelectResult={onSelectResult}
                                      onHoverResult={onHoverResult}
                                      destinations={destinations}
                                      focusedResult={focusedResult}/>}
        </div>

    </div>
}
