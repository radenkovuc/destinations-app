import {configureStore} from "@reduxjs/toolkit";

import {DestinationSlice} from "./DestinationSlice";
import {SearchSlice} from "./SearchSlice";

export const store = configureStore({
    reducer: {
        destinations: DestinationSlice.reducer,
        search: SearchSlice.reducer,
    }
});

export type AppDispatch = typeof store
export type AppState = ReturnType<AppDispatch["getState"]>;
