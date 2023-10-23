import {useEffect, useState} from "react";

import {useStateContext} from "@/state";
import {getNearbyDestinations} from "@/services/fake-api";
import {Destination} from "@/domain";

const BASE_CLASS = 'destinations-app__details__nearby-locations';

export const NearbyLocations = (): JSX.Element | null => {
    const [nearbyDestinations, setNearbyDestinations] = useState<Destination[]>([])
    const [isLoading, setIsLoading] = useState(false)
    const {destination, setDestination} = useStateContext()

    useEffect(() => {
        const findNearbyDestinations = async () => {
            setIsLoading(true)
            const nearbyDestinations = await getNearbyDestinations(destination)
            setNearbyDestinations(nearbyDestinations)
            setIsLoading(false)
        }

        void findNearbyDestinations()
    }, [destination])

    return <div className={BASE_CLASS}>
        <div className={`${BASE_CLASS}__label`}>Nearby locations</div>
        {isLoading ? <div>Loading...</div> :
            <div className={`${BASE_CLASS}__locations`}>
                {nearbyDestinations.map(destination =>
                    <div key={destination.id} className={`${BASE_CLASS}__location`}
                         onClick={() => setDestination(destination)}>{destination.name}</div>)}
            </div>}
    </div>
}
