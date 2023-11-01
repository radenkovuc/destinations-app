import {NextApiRequest, NextApiResponse} from 'next';
import {FAKE_DESTINATIONS, sleep} from "./fake-api";


const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method === "GET") {
        console.log("Destinations call - ", 'destination: ', req.query)

        await sleep()

        const search = req.query.search as string
        const destinations = FAKE_DESTINATIONS.filter(dest => dest.name.toLowerCase().includes(search?.toLowerCase()))

        if (search === "fail") {
            res.status(400).json({message: "Error"})
        }

        res.status(200).json(destinations)
    }
}

export default handler