import {createSlice} from "@reduxjs/toolkit";

import {Destination} from "@/domain";

interface SearchState {
    input: string;
    isOpen: boolean;
    isLoading: boolean;
    isError: boolean;
    focusedResult: number
    destinations: Destination[]
}

const initialState: SearchState = {
    input: "",
    isOpen: false,
    isLoading: false,
    isError: false,
    focusedResult: 0,
    destinations: []
};

export const SearchSlice = createSlice({
    name: "search",
    initialState,
    reducers: {
        updateInput(state, action) {
            state.input = action.payload;
            state.focusedResult = 0
            state.isLoading = true
            state.isOpen = !!action.payload
            state.isLoading = true
            state.isError = false
        },
        setInput(state, action) {
            state.input = action.payload;
        },
        setError(state) {
            state.isError = true
        },
        setLoadingFinished(state) {
            state.isLoading = false
        },
        setIsOpen(state, action) {
            state.isOpen = action.payload
        },
        setFocusedResult(state, action) {
            state.focusedResult = action.payload
        },
        setDestinations(state, action) {
            state.destinations = action.payload
        },
    }
});

export const searchActions = SearchSlice.actions;