import {useStateContext} from "@/state";

import NearbyLocations from "@/components/NearbyLocations";

const BASE_CLASS = 'destinations-app__details';

export const Details = (): JSX.Element | null => {
    const {destination} = useStateContext()

    if (!destination) {
        return null
    }

    return <div className={BASE_CLASS}>
        <div className={`${BASE_CLASS}__name`}>{destination.name}</div>
        <div className={`${BASE_CLASS}__field`}>{destination.description}</div>
        <div className={`${BASE_CLASS}__field`}><b>Country: </b>{destination.country}</div>
        <div className={`${BASE_CLASS}__field`}><b>Climate: </b>{destination.climate}</div>
        <div className={`${BASE_CLASS}__field`}><b>Currency: </b>{destination.currency}</div>
        <NearbyLocations/>
    </div>
}
