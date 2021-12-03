import { createSlice } from '@reduxjs/toolkit';

const FilterSlice = createSlice({
    name: 'filters',
    initialState: {
        category: null,
        sortBy: 0,
    },
    reducers: {
        changeFilters(state, action) {
            state.sortBy = action.payload;
        },
        setCategory(state, action) {
            state.category = action.payload;
        },
    }
})

export const { changeFilters, setCategory } = FilterSlice.actions;
export default FilterSlice.reducer;