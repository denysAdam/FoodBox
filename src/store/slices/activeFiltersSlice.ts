import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface FilterState {
    activeFilter: string;
}

const initialState: FilterState = {
    activeFilter: 'search',
};


const filterSlice = createSlice({
    name: 'filter',
    initialState,
    reducers: {
        setActiveFilter: (state, action: PayloadAction<string>) => {
            state.activeFilter = action.payload;
        },
    },
});

export const { setActiveFilter } = filterSlice.actions;
export default filterSlice.reducer;
