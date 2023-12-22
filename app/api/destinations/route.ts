import {NextRequest, NextResponse} from "next/server";

import {Destination} from "@/domain";
import {connectToDatabase} from "@/services/db";

export async function GET(req: NextRequest, res: NextResponse) {
    console.log("Destinations call - ", 'destination: ', req.nextUrl.searchParams)

    const search = req.nextUrl.searchParams.get("search") as string
    if (search === "fail") {
        return NextResponse.json({message: "Error"}, {status: 400})

    }

    try {
        const client = await connectToDatabase()
        const db = client.db()

        const regex = new RegExp(search, "i");
        const destinations = await db.collection<Destination>("destinations").find({name: {$regex: regex}}).toArray()

        void client.close()

        return NextResponse.json(destinations, {status: 200})
    } catch (e) {
        return NextResponse.json({message: "Error"}, {status: 400})
    }

}