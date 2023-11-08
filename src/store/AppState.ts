import {configureStore} from "@reduxjs/toolkit";
import {createWrapper} from "next-redux-wrapper";

import {DestinationSlice, SearchSlice} from ".";

const makeStore = (updateInput: any) =>
    configureStore({
        reducer: {
            destinations: DestinationSlice.reducer,
            search: SearchSlice.reducer,
        }
    });

export type AppDispatch = typeof makeStore
export type AppStore = ReturnType<typeof makeStore>;
export type AppState = ReturnType<AppStore["getState"]>;

export const wrapper = createWrapper<AppStore>(makeStore);
