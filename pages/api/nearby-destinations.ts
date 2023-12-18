// api/nearby-destinations?id=1

import {NextApiRequest, NextApiResponse} from 'next';

import {Destination} from "@/domain";

import {calculateDistance, FAKE_DESTINATIONS, sleep} from "./utils";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method === "GET") {
        console.log("Nearby Destinations call - ", 'destination: ', req.query)

        await sleep()

        const id = req.query.id as string
        const destinations = getNearbyDestinations(id)

        res.status(200).json(destinations)
    }
}


const getNearbyDestinations = (id: string): Destination[] => {
    const dest = FAKE_DESTINATIONS.find(d => d.id === parseFloat(id))

    if (!dest) {
        return []
    }

    return FAKE_DESTINATIONS.map(destination => ({
        distance: calculateDistance(dest, destination),
        destination
    }))
        .sort((a, b) => a.distance - b.distance)
        .slice(1, 6) // Get only the first 5 nearby destinations, 0 element is selected destination
        .map(item => item.destination);
}

export default handler