import {Destination} from '@/domain';

import {mapDestination, MOCKED_DESTINATIONS} from '@/mappers';
import {Destination as ResponseDestination} from '@/domain/response';

export const getDestinations = async (search: string): Promise<Destination[]> => {
    // const { data } = await axios.get<ResponseDestination[]>('https://api.test');
    if (search === "fail") {
        throw "Fail"
    }
    const data: ResponseDestination[] = MOCKED_DESTINATIONS.filter(dest => dest.country.toLowerCase().includes(search.toLowerCase()))
    console.log('search', search, 'data', data.map(dest => dest.name))
    return data.map((destination) => mapDestination(destination));
};

