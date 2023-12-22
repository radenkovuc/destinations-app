"use client"

import {Provider} from 'react-redux';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import {ReactNode, useState} from "react";

import store from "@/store";

interface Props {
    children: ReactNode
}

export const Wrapper = ({children}: Props) => {
    const [queryClient] = useState(() => new QueryClient());

    return (<QueryClientProvider client={queryClient}>
        <Provider store={store}>
            {children}
        </Provider>
    </QueryClientProvider>)
}
