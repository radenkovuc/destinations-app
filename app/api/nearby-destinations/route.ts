// api/nearby-destinations?id=1

import {NextRequest, NextResponse} from "next/server";

import {Destination} from "@/domain";

import {calculateDistance, FAKE_DESTINATIONS, sleep} from "../utils";

export async function GET(req: NextRequest) {

    console.log("Nearby Destinations call - ", 'destination: ', req.nextUrl.searchParams)
    await sleep()

    const id = req.nextUrl.searchParams.get("id") as string
    const destinations = getNearbyDestinations(id)

    return NextResponse.json(destinations, {status: 200})
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