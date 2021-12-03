import { createSlice } from '@reduxjs/toolkit';

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
export default CartSlice.reducer;