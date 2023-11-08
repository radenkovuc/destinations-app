import {createSlice} from "@reduxjs/toolkit";

import {Destination} from "@/domain";

interface SearchState {
    input: string;
    isOpen: boolean;
    focusedResult: number
    destinations: Destination[]
}

const initialState: SearchState = {
    input: "",
    isOpen: false,
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
            state.isOpen = !!action.payload
        },
        setInput(state, action) {
            state.input = action.payload;
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

export const {updateInput,setInput,setIsOpen,setFocusedResult,setDestinations} = SearchSlice.actions;