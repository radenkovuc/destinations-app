import {useEffect, useRef, useState} from "react";

import SearchInput from "@/components/SearchInput";
import {SearchResults} from "../SearchResults/SearchResults";
import {Destination} from "@/domain";
import {useStateContext} from "@/state";
import {getSearchDestinations} from "@/services/fake-api";

const BASE_CLASS = 'destinations-app__search';

export const Search = (): JSX.Element => {
    const [isOpen, setIsOpen] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [isError, setIsError] = useState(false)
    const [input, setInput] = useState("")
    const [destinations, setDestinations] = useState<Destination[] | undefined>();

    const {setDestination} = useStateContext()

    const ref = useRef<HTMLInputElement>(null);

    useEffect(() => {
        /**
         * close results if clicked on outside of content
         */
        function handleClickOutside(event: MouseEvent) {
            // @ts-ignore
            if (ref.current && !ref.current.contains(event.target)) {
                setIsOpen(false)
            }
        }

        // Bind the event listener
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            // Unbind the event listener on clean up
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [ref]);

    const onInput = async (input: string): Promise<void> => {
        setIsOpen(!!input)
        setInput(input)
        try {
            setIsLoading(true)
            setIsError(false)
            const destinations = await getSearchDestinations(input)
            setDestinations(destinations)
        } catch (e) {
            setIsError(true)
        } finally {
            setIsLoading(false)
        }
    };

    const onInputClick = async () => {
        if (input) {
            await onInput(input)
            setIsOpen(true)
        }
    }

    const onSelectResult = (destination: Destination) => {
        console.log('destination', destination)
        setInput(destination.name)
        setDestination(destination)
        setIsOpen(false)
    }

    return <div className={BASE_CLASS}>
        <label className={`${BASE_CLASS}__label`}>Location</label>
        <div className={`${BASE_CLASS}__content`} ref={ref}>
            <SearchInput onChange={onInput} input={input} onClick={onInputClick}/>
            {isOpen && <SearchResults isLoading={isLoading} isError={isError} onSelectResult={onSelectResult}
                                      destinations={destinations}/>}
        </div>

    </div>
}
