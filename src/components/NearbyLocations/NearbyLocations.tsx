import {useAppSelector, useNearbyDestinations} from "@/hooks";

import {NearbyLocation} from "./NearbyLocation";

import classes from "./NearbyLocations.module.css";

export const NearbyLocations = (): JSX.Element => {
    const {selectedDestination} = useAppSelector(s => s.destinations)
    const {data, isLoading} = useNearbyDestinations(selectedDestination?.id)

    return <div className={classes.nearbyLocations}>
        <div className={classes.label}>Nearby locations</div>
        {isLoading ? <div>Loading...</div> :
            <div className={classes.locations}>
                {data?.map(destination => <NearbyLocation key={destination.id}
                                                          destination={destination}/>)}
            </div>}
    </div>
}
