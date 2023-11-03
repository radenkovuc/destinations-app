import {NextApiRequest, NextApiResponse} from 'next';

import {FAKE_DESTINATIONS, sleep} from "./utils";
import {Destination} from "@/domain";


const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method === "GET") {
        console.log("Destinations call - ", 'destination: ', req.query)

        await sleep()

        const search = req.query.search as string
        if (search === "fail") {
            res.status(400).json({message: "Error"})
        }

        const destinations = getNearbyDestinations(search)

        res.status(200).json(destinations)
    }
}


export const getNearbyDestinations = (search: string): Destination[] => {
    return FAKE_DESTINATIONS.filter(dest => dest.name.toLowerCase().includes(search?.toLowerCase()))
}

export default handler