import {Destination} from "@/domain";

const BASE_CLASS = 'destinations-app__search-results__destination';

interface DestinationItemProps {
    destination: Destination
    onSelectResult: (destination: Destination) => void
}

export const DestinationItem = ({destination, onSelectResult}: DestinationItemProps): JSX.Element => {
    return <div className={BASE_CLASS} key={destination.id}
                onClick={() => onSelectResult(destination)}>{destination.name}</div>
}
