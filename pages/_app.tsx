import type {AppProps} from 'next/app';
import {Provider} from 'react-redux';

import wrapper from "../src/store";

import '@/styles/globals.css';

const App = ({Component, pageProps}: AppProps) => {
    const {store, props} = wrapper.useWrappedStore(pageProps);
    return <Provider store={store}> <Component {...pageProps} /></Provider>
}
export default App
