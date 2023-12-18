import {useAppSelector} from "@/hooks";

import NearbyLocations from "@/components/NearbyLocations";

import classes from "./Details.module.css";

export const Details = (): JSX.Element | null => {
    const destination = useAppSelector(s => s.destinations.selectedDestination)

    if (!destination) {
        return null
    }

    return <div className={classes.details}>
        <div className={classes.name}>{destination.name}</div>
        <div className={classes.field}>{destination.description}</div>
        <div className={classes.field}><b>Country: </b>{destination.country}</div>
        <div className={classes.field}><b>Climate: </b>{destination.climate}</div>
        <div className={classes.field}><b>Currency: </b>{destination.currency}</div>
        <NearbyLocations/>
    </div>
}
