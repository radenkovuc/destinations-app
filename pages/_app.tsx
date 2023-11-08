import type {AppProps} from 'next/app';
import {Provider} from 'react-redux';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import {useState} from "react";

import wrapper from "../src/store";

import '@/styles/globals.css';

const App = ({Component, pageProps}: AppProps) => {
    const {store} = wrapper.useWrappedStore(pageProps);
    const [queryClient] = useState(() => new QueryClient());

    return (<QueryClientProvider client={queryClient}>
        <Provider store={store}>
            <Component {...pageProps} />
        </Provider>
    </QueryClientProvider>)
}
export default App
