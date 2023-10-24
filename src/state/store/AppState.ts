import {configureStore} from "@reduxjs/toolkit";
import {createWrapper} from "next-redux-wrapper";
import {useSelector} from 'react-redux';

import {DestinationSlice} from "@/state/DestinationSlice";
import {SearchSlice} from "@/state/SearchSlice";

const makeStore = () =>
    configureStore({
        reducer: {
            [DestinationSlice.name]: DestinationSlice.reducer,
            [SearchSlice.name]: SearchSlice.reducer,
        },
        devTools: true,
    });


export type AppStore = ReturnType<typeof makeStore>;
export type AppState = ReturnType<AppStore["getState"]>;

export const wrapper = createWrapper<AppStore>(makeStore);

export const useReduxState = <T>(select: (s: AppState) => T, comparator?: (left: T, right: T) => boolean): T =>
    useSelector((s: AppState) => select(s), comparator);
