import {useAppSelector, useNearbyDestinations} from "@/hooks";

import {NearbyLocation} from "./NearbyLocation";

const BASE_CLASS = 'destinations-app__details__nearby-locations';

export const NearbyLocations = (): JSX.Element => {
    const {selectedDestination} = useAppSelector(s => s.destinations)
    const {data, isLoading} = useNearbyDestinations(selectedDestination?.id)

    return <div className={BASE_CLASS}>
        <div className={`${BASE_CLASS}__label`}>Nearby locations</div>
        {isLoading ? <div>Loading...</div> :
            <div className={`${BASE_CLASS}__locations`}>
                {data?.map(destination => <NearbyLocation key={destination.id}
                                                          destination={destination}/>)}
            </div>}
    </div>
}
