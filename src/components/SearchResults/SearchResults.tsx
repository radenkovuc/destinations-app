import {useQuery} from "@tanstack/react-query";
import {useEffect} from "react";

import {setDestinations, setFocusedResult} from "@/store";
import {useAppDispatch, useAppSelector} from "@/hooks";
import {getDestinationsBySearchTerm} from "@/services";

import {Message} from "./Message";
import {DestinationItem} from "./DestinationItem";


const BASE_CLASS = 'destinations-app__search-results';

interface SearchResultsProps {
    onSelectResult: () => void
}

export const SearchResults = ({onSelectResult}: SearchResultsProps): JSX.Element => {
    const {input, focusedResult} = useAppSelector(s => s.search)
    const dispatch = useAppDispatch();
    const {data, isLoading, isError} = useQuery({
        queryKey: ["destinations", {input}],
        queryFn: () => getDestinationsBySearchTerm(input),
        staleTime: Infinity
    })

    useEffect(() => {
        dispatch(setDestinations(data))
    }, [data, dispatch]);

    if (isLoading) {
        return <Message message="Loading..."/>
    }

    if (isError) {
        return <Message message="Error" isError/>
    }

    if (!data?.length) {
        return <Message message="No results"/>
    }

    const onHoverResult = (index: number): void => {
        dispatch(setFocusedResult(index))
    }

    return <div className={BASE_CLASS}>
        {data?.map((destination, index) =>
            <DestinationItem key={destination.id}
                             isSelected={focusedResult === index}
                             onSelectResult={onSelectResult}
                             onHoverResult={() => onHoverResult(index)}
                             destination={destination}/>)}
    </div>

}
