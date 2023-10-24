import {createSlice} from "@reduxjs/toolkit";

import {Destination} from "@/domain";

export interface DestinationState {
    isLoading: boolean;
    selectedDestination?: Destination
    nearbyDestinations: Destination[]
}

const initialState: DestinationState = {
    isLoading: false,
    nearbyDestinations: []
};

export const DestinationSlice = createSlice({
    name: "destinations",
    initialState,
    reducers: {
        setDestination(state, action) {
            state.selectedDestination = action.payload;
        },
        setNearbyDestinations(state, action) {
            state.nearbyDestinations = action.payload;
        },
        setIsLoading(state, action) {
            state.isLoading = action.payload
        },
    }
});

export const {
    setIsLoading,
    setDestination,
    setNearbyDestinations
} = DestinationSlice.actions;


export default DestinationSlice.reducer;