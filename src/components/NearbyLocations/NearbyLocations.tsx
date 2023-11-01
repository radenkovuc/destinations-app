import {useEffect, useMemo, useState} from "react";
import {useDispatch} from "react-redux";

import {Destination} from "@/domain";

import {useReduxState} from "@/state/store";
import {setIsLoading, setNearbyDestinations} from "@/state";

import {NearbyLocation} from "./NearbyLocation";
import axios from "axios";

const BASE_CLASS = 'destinations-app__details__nearby-locations';

interface ResultCache {
    [key: number]: Destination[];
}

export const NearbyLocations = (): JSX.Element => {
    const [resultCache, setResultCache] = useState<ResultCache>({});
    const {nearbyDestinations, selectedDestination, isLoading} = useReduxState(s => s.destinations)
    const dispatch = useDispatch();

    useEffect(() => {
        if (selectedDestination) {
            void findNearbyDestinations(selectedDestination)
        }
    }, [selectedDestination])

    const findNearbyDestinations = async (destination: Destination) => {
        dispatch(setIsLoading(true))
        const nearbyDestinations = await getCashedNearbyDestinations(destination)
        dispatch(setNearbyDestinations(nearbyDestinations))
        dispatch(setIsLoading(false))
    }

    const getCashedNearbyDestinations = useMemo(() => {
        return async (destination: Destination) => {
            if (resultCache.hasOwnProperty(destination.id)) {
                return resultCache[destination.id];
            }

            const result = await axios.get<Destination[]>("/api/nearby-destinations", {params: {id: destination.id}});
            const data = result.data

            setResultCache(prevCache => ({...prevCache, [destination.id]: data}));
            return data;
        };
    }, [resultCache]);

    return <div className={BASE_CLASS}>
        <div className={`${BASE_CLASS}__label`}>Nearby locations</div>
        {isLoading ? <div>Loading...</div> :
            <div className={`${BASE_CLASS}__locations`}>
                {nearbyDestinations.map(destination => <NearbyLocation key={destination.id}
                                                                       destination={destination}/>)}
            </div>}
    </div>
}