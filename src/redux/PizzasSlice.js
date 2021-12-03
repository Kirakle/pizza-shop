import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchPizzas = createAsyncThunk(
    'pizzas/fetchPizzas',
    async (data, { dispatch }) => {
        let sortType = ['rating', 'price', 'name'];
        let category = '';
        if (data.category != null) {
            category = `category=${data.category}`;
        }
        let result = await axios.get(`http://localhost:3000/pizzas?${category}&_sort=${sortType[data.sortBy]}&_order=asc`);
        dispatch(setPizzas(result.data));
    });

const PizzasSlice = createSlice({
    name: 'pizzas',
    initialState: {
        items: [],
        isLoaded: false,
    },
    reducers: {
        setPizzas(state, action) {
            state.items = action.payload;
        },
    },
    extraReducers: {
        [fetchPizzas.pending]: (state) => { state.isLoaded = true },
        [fetchPizzas.fulfilled]: (state) => { state.isLoaded = false },
    }
})


export const { setPizzas } = PizzasSlice.actions;
export default PizzasSlice.reducer;