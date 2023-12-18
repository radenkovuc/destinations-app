import axios from "axios";

import {Destination} from "@/domain";

interface GetDataProps {
    url: string,
    params?: any
}

export const getData = async <T>({params, url}: GetDataProps): Promise<T[]> => {
    const result = await axios.get<T[]>(`/api/${url}`, {params});
    return result.data
}