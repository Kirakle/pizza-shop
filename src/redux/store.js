import { createSlice, configureStore, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';


export const fetchPizzas = createAsyncThunk(
    'pizzas/fetchPizzas',
    async (data, { dispatch }) => {
        let sortType = ['rating', 'price', 'name'];
        let category = '';
        if (data.category != null) {
            category = `category=${data.category}`;
        }
        let result = await axios.get(`http://localhost:3001/pizzas?${category}&_sort=${sortType[data.sortBy]}&_order=asc`);
        dispatch(setPizzas(result.data));
        console.log(data)
    })


const filterSlice = createSlice({
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


export const { filters } = filterSlice.actions;

const pizzasSlice = createSlice({
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
        [fetchPizzas.pending]: (state, action) => { state.isLoaded = true },
        [fetchPizzas.fulfilled]: (state, action) => { state.isLoaded = false },
    }
})


export const { changeFilters, setCategory } = filterSlice.actions;
export const { setPizzas } = pizzasSlice.actions;





export default configureStore({
    reducer: {
        allPizzas: pizzasSlice.reducer,
        filterMenu: filterSlice.reducer,
    }
})


