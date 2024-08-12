import { createSlice, PayloadAction } from "@reduxjs/toolkit";


export interface BasketState {
    basket: BasketItem[];
}
export interface BasketItem {
    image: string;
    label: string;
}
const initialState: BasketState = {
    basket: [],
};

const basketSlice = createSlice({
    name: 'basket',
    initialState,
    reducers: {
        addToBasket: (state, action: PayloadAction<BasketItem>) => {
            state.basket.push(action.payload);
        },
        deleteFromBasket: (state, action: PayloadAction<string>) => {
            const index = state.basket.findIndex(item => item.label === action.payload);
            if (index !== -1) {
                state.basket.splice(index, 1);
            }
        },
        
        clearBasket: (state) => {
            state.basket = [];
        }
    },
});

export const { addToBasket , deleteFromBasket, clearBasket } = basketSlice.actions;
export default basketSlice.reducer;