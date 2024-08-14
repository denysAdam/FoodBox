import { configureStore } from '@reduxjs/toolkit';
import recipesReducer from './slices/recipeSlice';
import activeFiltersReducer from './slices/activeFiltersSlice';
import basketReducer from './slices/basketSlice';
import deliveryReducer from './slices/deliverySlice';
import userCreateReducer from './slices/createUserSlice';
import loginReducer from './slices/loginSlice';
import modalWindReducer from './slices/modalWindSlice';
import loginLogicReducer from './slices/loginLogicSlice';
import userLogicReducer from './slices/userLogicSlice';

const store = configureStore({
    reducer: {
        recipes: recipesReducer,
        activeFilters: activeFiltersReducer,
        basket: basketReducer,
        delivery: deliveryReducer,
        createUser: userCreateReducer,
        login: loginReducer,
        modal: modalWindReducer,
        loginLogic: loginLogicReducer,
        userLogic: userLogicReducer,

    },
});

export type RootState = ReturnType<typeof store.getState>;


export type AppDispatch = typeof store.dispatch;
export default store;