// api/nearby-destinations?id=1

import {NextRequest, NextResponse} from "next/server";

import {Destination} from "@/domain";
import {connectToDatabase} from "@/services/db";

export async function GET(req: NextRequest) {
    console.log("Nearby Destinations call - ", 'destination: ', req.nextUrl.searchParams)

    const id = req.nextUrl.searchParams.get("id") as string

    try {

        const client = await connectToDatabase()
        const db = client.db()

        let destinations: Destination[] = await db.collection<Destination>("destinations").find().toArray()

        void client.close()

        destinations = getNearbyDestinations(destinations, id)

        return NextResponse.json(destinations, {status: 200})
    } catch (e) {
        return NextResponse.json({message: "Error"}, {status: 400})
    }
}

const getNearbyDestinations = (destinations: Destination[], id: string): Destination[] => {
    const dest = destinations.find(d => d.id === parseFloat(id))

    if (!dest) {
        return []
    }

    return destinations.map(destination => ({
        distance: calculateDistance(dest, destination),
        destination
    }))
        .sort((a, b) => a.distance - b.distance)
        .slice(1, 6) // Get only the first 5 nearby destinations, 0 element is selected destination
        .map(item => item.destination);
}

const calculateDistance = (dest1: Destination, dest2: Destination): number => {
    const R = 6371; // Radius of the Earth in kilometers
    const dLat = (dest2.latitude - dest1.latitude) * (Math.PI / 180);
    const dLon = (dest2.longitude - dest1.longitude) * (Math.PI / 180);

    const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(dest1.longitude * (Math.PI / 180)) * Math.cos(dest2.latitude * (Math.PI / 180)) *
        Math.sin(dLon / 2) * Math.sin(dLon / 2);

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    // Distance in kilometers
    return R * c;
}