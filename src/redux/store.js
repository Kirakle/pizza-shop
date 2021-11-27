import { createSlice, configureStore } from '@reduxjs/toolkit'

const filterSlice = createSlice({
    name: 'filters',
    initialState: {
        category: 0,
        sortBy: 'popular',
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


