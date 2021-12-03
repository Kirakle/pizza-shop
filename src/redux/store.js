import { configureStore } from '@reduxjs/toolkit';
import { CartSlice, PizzasSlice, FilterSlice } from './linkage';

export default configureStore({
    reducer: {
        allPizzas: PizzasSlice,
        filterMenu: FilterSlice,
        cart: CartSlice,
    }
})

