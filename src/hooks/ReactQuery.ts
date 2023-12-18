import {useQuery, UseQueryOptions, UseQueryResult} from '@tanstack/react-query';

export const useReactQuery = <T>({queryKey, queryFn}: UseQueryOptions): UseQueryResult<T[]> =>
    useQuery({
        queryKey,
        queryFn,
        staleTime: Infinity,
        retry: false,
    });