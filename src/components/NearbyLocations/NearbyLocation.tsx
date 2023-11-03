import {useDispatch} from "react-redux";

import {Destination} from "@/domain";
import {destinationActions} from "@/store";

const BASE_CLASS = 'destinations-app__details__nearby-locations__location';

interface NearbyLocationsProps {
    destination: Destination
}

export const NearbyLocation = ({destination}: NearbyLocationsProps): JSX.Element => {
    const dispatch = useDispatch();

    const selectDestination = (destination: Destination) => {
        dispatch(destinationActions.setDestination(destination))
    }

    return <div key={destination.id} className={BASE_CLASS}
                onClick={() => selectDestination(destination)}>{destination.name}</div>
}
