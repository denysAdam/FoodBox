import { configureStore } from '@reduxjs/toolkit';
import recipesReducer from './slices/recipeSlice';
import activeFiltersReducer from './slices/activeFiltersSlice';
import basketReducer from './slices/basketSlice';
import deliveryReducer from './slices/deliverySlice';

const store = configureStore({
    reducer: {
        recipes: recipesReducer,
        activeFilters: activeFiltersReducer,
        basket: basketReducer,
        delivery: deliveryReducer,

    },
});

export type RootState = ReturnType<typeof store.getState>;


export type AppDispatch = typeof store.dispatch;
export default store;