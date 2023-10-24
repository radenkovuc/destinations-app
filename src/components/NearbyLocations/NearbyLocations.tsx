import {useEffect, useMemo, useState} from "react";

import {useStateContext} from "@/state";
import {getNearbyDestinations} from "@/services";
import {Destination} from "@/domain";

const BASE_CLASS = 'destinations-app__details__nearby-locations';

interface ResultCache {
    [key: number]: Destination[];
}

export const NearbyLocations = (): JSX.Element => {
    const [nearbyDestinations, setNearbyDestinations] = useState<Destination[]>([])
    const [isLoading, setIsLoading] = useState(false)
    const {destination, setDestination} = useStateContext()
    const [resultCache, setResultCache] = useState<ResultCache>({});

    useEffect(() => {
        if (destination) {
            void findNearbyDestinations(destination)
        }
    }, [destination])

    const findNearbyDestinations = async (destination: Destination) => {
        setIsLoading(true)
        const nearbyDestinations = await getCashedNearbyDestinations(destination)
        setNearbyDestinations(nearbyDestinations)
        setIsLoading(false)
    }

    const getCashedNearbyDestinations = useMemo(() => {
        return async (destination: Destination) => {
            if (resultCache.hasOwnProperty(destination.id)) {
                return resultCache[destination.id];
            }

            const result = await getNearbyDestinations(destination);
            setResultCache(prevCache => ({...prevCache, [destination.id]: result}));
            return result;
        };
    }, [resultCache]);


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
