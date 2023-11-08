import {useQuery} from "@tanstack/react-query";

import {useAppSelector} from "@/hooks";
import {getNearbyDestinations} from "@/services";

import {NearbyLocation} from "./NearbyLocation";

const BASE_CLASS = 'destinations-app__details__nearby-locations';


export const NearbyLocations = (): JSX.Element => {
    const {selectedDestination} = useAppSelector(s => s.destinations)
    const {data, isLoading} = useQuery({
        queryKey: ["nearby-destinations", {selected: selectedDestination?.id}],
        queryFn: () => getNearbyDestinations(selectedDestination?.id),
        staleTime: Infinity
    })

    return <div className={BASE_CLASS}>
        <div className={`${BASE_CLASS}__label`}>Nearby locations</div>
        {isLoading ? <div>Loading...</div> :
            <div className={`${BASE_CLASS}__locations`}>
                {data?.map(destination => <NearbyLocation key={destination.id}
                                                          destination={destination}/>)}
            </div>}
    </div>
}
