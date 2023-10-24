import {useDispatch} from "react-redux";

import {useReduxState} from "@/state/store";
import {setFocusedResult} from "@/state";

import {Message} from "./Message";
import {DestinationItem} from "./DestinationItem";

const BASE_CLASS = 'destinations-app__search-results';

interface SearchResultsProps {
    onSelectResult: () => void
}

export const SearchResults = ({
                                  onSelectResult,
                              }: SearchResultsProps): JSX.Element => {
    const {isLoading, isError, focusedResult, destinations} = useReduxState(s => s.search)
    const dispatch = useDispatch();

    if (isLoading) {
        return <Message message="Loading..."/>
    }

    if (isError) {
        return <Message message="Error" isError/>
    }

    if (!destinations.length) {
        return <Message message="No results"/>
    }

    const onHoverResult = (index: number): void => {
        dispatch(setFocusedResult(index))
    }

    return <div className={BASE_CLASS}>
        {destinations.map((destination, index) =>
            <DestinationItem key={destination.id}
                             isSelected={focusedResult === index}
                             onSelectResult={onSelectResult}
                             onHoverResult={() => onHoverResult(index)}
                             destination={destination}/>)}
    </div>

}
