import axios from "axios";

import {Destination} from "@/domain";

export const getDestinationsBySearchTerm = async (search?: string): Promise<Destination[]> => {
    const result = await axios.get<Destination[]>("/api/destinations", {params: {search: search}});
    return result.data
}

export const getNearbyDestinations = async (id?: number): Promise<Destination[]> => {
    const result = await axios.get<Destination[]>("/api/nearby-destinations", {params: {id}});
    return result.data
}