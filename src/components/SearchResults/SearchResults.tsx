import {Destination} from "@/domain";

import {Message} from "./Message";
import {DestinationItem} from "./DestinationItem";

const BASE_CLASS = 'destinations-app__search-results';

interface SearchResultsProps {
    isLoading: boolean;
    isError: boolean;
    focusedResult: number;
    onSelectResult: () => void
    onHoverResult: (index: number) => void
    destinations: Destination[]
}

export const SearchResults = ({
                                  isLoading,
                                  isError,
                                  focusedResult,
                                  destinations,
                                  onSelectResult,
                                  onHoverResult
                              }: SearchResultsProps): JSX.Element => {
    if (isLoading) {
        return <Message message="Loading..."/>
    }

    if (isError) {
        return <Message message="Error" isError/>
    }

    if (!destinations.length) {
        return <Message message="No results"/>
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
