import {UseQueryResult} from '@tanstack/react-query';

import {Destination} from "@/domain";
import {getData} from "@/services";

import {useReactQuery} from "./ReactQuery";

export const useDestinationsBySearchTerm = (search: string): UseQueryResult<Destination[]> =>
    useReactQuery({
        queryKey: ["destinations", {search}],
        queryFn: () => getData({params: {search}, url: "destinations"})
    })

export const useNearbyDestinations = (id?: number): UseQueryResult<Destination[]> =>
    useReactQuery({
        queryKey: ["nearby-destinations", {id}],
        queryFn: () => getData({params: {id}, url: "nearby-destinations"})
    })
