import {configureStore} from "@reduxjs/toolkit";
import {createWrapper} from "next-redux-wrapper";
import {useSelector} from 'react-redux';

import {DestinationSlice, SearchSlice} from ".";

const makeStore = () =>
    configureStore({
        reducer: {
            destinations: DestinationSlice.reducer,
            search: SearchSlice.reducer,
        }
    });


export type AppStore = ReturnType<typeof makeStore>;
export type AppState = ReturnType<AppStore["getState"]>;

export const wrapper = createWrapper<AppStore>(makeStore);

export const useReduxState = <T>(select: (s: AppState) => T): T => useSelector((s: AppState) => select(s));
