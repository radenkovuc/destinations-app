import {Destination} from "@/domain";

import {Message} from "./Message";
import {DestinationItem} from "./DestinationItem";

const BASE_CLASS = 'destinations-app__search-results';

interface SearchResultsProps {
    isLoading: boolean;
    isError: boolean;
    onSelectResult: (destination: Destination) => void
    destinations?: Destination[]
}


export const SearchResults = ({isLoading, isError, destinations, onSelectResult}: SearchResultsProps): JSX.Element => {

    if (isLoading) {
        return <Message message="Loading..."/>
    }

    if (isError) {
        return <Message message="Error"/>
    }

    if (!destinations?.length) {
        return <Message message="No results"/>

    }

    return <div className={BASE_CLASS}>
        {destinations.map(destination =>
            <DestinationItem key={destination.id} onSelectResult={onSelectResult} destination={destination}/>)}
    </div>

}
