import {createSlice} from "@reduxjs/toolkit";

import {Destination} from "@/domain";

interface DestinationState {
    selectedDestination?: Destination
}

const initialState: DestinationState = {};

export const DestinationSlice = createSlice({
    name: "destinations",
    initialState: initialState,
    reducers: {
        setDestination(state, action) {
            state.selectedDestination = action.payload;
        },
    }
});

export const {setDestination} = DestinationSlice.actions;