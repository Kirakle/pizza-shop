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
        let result = await axios.get(`http://localhost:3000/pizzas?${category}&_sort=${sortType[data.sortBy]}&_order=asc`);
        dispatch(setPizzas(result.data));
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

const CartSlice = createSlice({
    name: 'cart',
    initialState: {
        value: {},
        itemsCount: 0,
        totalPrice: 0,
    },
    reducers: {
        addPizza(state, action) {
            if (state.value[action.payload.id] === undefined) state.value[action.payload.id] = { items: [], totalCount: 0 };
            if (state.value[action.payload.id].items.filter(
                item => {
                    if (item.id === action.payload.id && item.type === action.payload.type && item.size === action.payload.size) return true;
                }).length !== 0) {
                state.value[action.payload.id].items.map(
                    item => {
                        if (item.id === action.payload.id && item.type === action.payload.type && item.size === action.payload.size) return ++item.count;
                        return item;
                    });
            }
            else {
                state.value[action.payload.id].items.push({ ...action.payload });
            }
            state.value[action.payload.id].totalCount++;
            state.totalPrice += action.payload.price;
            state.itemsCount++;
        },
        clearCart(state) {
            state.value = {};
            state.itemsCount = 0;
            state.totalPrice = 0;
        },
        deletePizza(state, action) {
            if (state.value[action.payload.id].items.filter(
                item => {
                    if (item.id === action.payload.id && item.type === action.payload.type && item.size === action.payload.size && item.count > 0) return true;
                }).length !== 0) {
                state.value[action.payload.id].items.map(
                    item => {
                        if (item.id === action.payload.id && item.type === action.payload.type && item.size === action.payload.size) return --item.count;
                        return item;
                    });
                state.value[action.payload.id].totalCount--;
            }
            if (state.value[action.payload.id].items.filter(
                item => {
                    if (item.id === action.payload.id && item.type === action.payload.type && item.size === action.payload.size && item.count === 0) return true;
                }).length !== 0) {
                state.value[action.payload.id].items = state.value[action.payload.id].items.filter(
                    item => {
                        if (item.id === action.payload.id && item.type === action.payload.type && item.size === action.payload.size) return false;
                        return true;
                    })
            }
            state.totalPrice -= action.payload.price;
            state.itemsCount--;
        },
        deleteAllPizza(state, action) {
            if (state.value[action.payload.id].items.filter(
                item => { if (item.id === action.payload.id && item.type === action.payload.type && item.size === action.payload.size && item.count > 0) return true }).length !== 0) {
                state.value[action.payload.id].items.map(
                    item => {
                        if (item.id === action.payload.id && item.type === action.payload.type && item.size === action.payload.size) {
                            state.totalPrice -= (item.price * item.count);
                            state.itemsCount -= item.count;
                            return item.count = 0
                        }
                        return item;
                    });
                state.value[action.payload.id].totalCount--;
            }
            if (state.value[action.payload.id].items.filter(
                item => {
                    if (item.id === action.payload.id && item.type === action.payload.type && item.size === action.payload.size && item.count === 0) return true;
                }).length !== 0) {
                state.value[action.payload.id].items = state.value[action.payload.id].items.filter(
                    item => {
                        if (item.id === action.payload.id && item.type === action.payload.type && item.size === action.payload.size) return false;
                        return true;
                    })
            }
        },
    }
})

export const { addPizza, clearCart, deletePizza, deleteAllPizza } = CartSlice.actions;

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
        cart: CartSlice.reducer,
    }
})








// addPizza(state, action) {
//     if (state.value[action.payload.id] === undefined) state.value[action.payload.id] = { items: [], totalCount: 0 };
//     if (state.value[action.payload.id].items.filter(
//         item => { if (item.id === action.payload.id && item.type === action.payload.type && item.size === action.payload.size) return true }).length !== 0) {
//         state.value[action.payload.id].items.map(
//             item => {
//                 if (item.id === action.payload.id && item.type === action.payload.type && item.size === action.payload.size) return ++item.count;
//                 return item;
//             });
//         state.value[action.payload.id].totalCount++;
//     }
//     else {
//         switch (action.payload.size) {
//             case 30:
//                 state.value[action.payload.id].items.push({ ...action.payload, price: Math.ceil(action.payload.price * 1.2) });
//                 break;

//             case 40:
//                 state.value[action.payload.id].items.push({ ...action.payload, price: Math.ceil(action.payload.price * 1.5) });
//                 break;
//             default:
//                 state.value[action.payload.id].items.push({ ...action.payload });
//                 break;
//         }

//         state.value[action.payload.id].totalCount++;
//     }
//     switch (action.payload.size) {
//         case 30:
//             state.totalPrice += Math.ceil(action.payload.price * 1.2);
//             break;
//         case 40:
//             state.totalPrice += Math.ceil(action.payload.price * 1.5);
//             break;

//         default:
//             state.totalPrice += Math.ceil(action.payload.price);
//             break;
//     }
//     state.itemsCount++;
// },