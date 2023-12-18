import {Destination} from "@/domain";
import {setDestination, setInput} from "@/store";
import {useAppDispatch} from "@/hooks";

import classes from "./NearbyLocations.module.css";

interface NearbyLocationsProps {
    destination: Destination
}

export const NearbyLocation = ({destination}: NearbyLocationsProps): JSX.Element => {
    const dispatch = useAppDispatch();

    const selectDestination = (destination: Destination) => {
        dispatch(setDestination(destination))
        dispatch(setInput(destination.name))

    }

    return <div key={destination.id} className={classes.location}
                onClick={() => selectDestination(destination)}>{destination.name}</div>
}
