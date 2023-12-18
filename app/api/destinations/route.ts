import {NextRequest, NextResponse} from "next/server";

import {FAKE_DESTINATIONS, sleep} from "../utils";
import {Destination} from "@/domain";

export async function GET(req: NextRequest, res: NextResponse) {
    console.log("Destinations call - ", 'destination: ', req.nextUrl.searchParams)

    await sleep()

    const search = req.nextUrl.searchParams.get("search") as string
    if (search === "fail") {
        return NextResponse.json({message: "Error"}, {status: 400})

    }

    const destinations = getNearbyDestinations(search)

    return NextResponse.json(destinations, {status: 200})
}


const getNearbyDestinations = (search: string): Destination[] => {
    return FAKE_DESTINATIONS.filter(dest => dest.name.toLowerCase().includes(search?.toLowerCase()))
}
