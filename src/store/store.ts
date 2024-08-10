import { configureStore } from '@reduxjs/toolkit';
import recipesReducer from './slices/recipeSlice';
import activeFiltersReducer from './slices/activeFiltersSlice';

const store = configureStore({
    reducer: {
        recipes: recipesReducer,
        activeFilters: activeFiltersReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;

// Экспортируем также тип dispatch, если он понадобится
export type AppDispatch = typeof store.dispatch;
export default store;