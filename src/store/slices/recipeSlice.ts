import { Recipe } from '../../api/api';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface IRecipesState {  
    recipes: Recipe[];  
}

const initialState: IRecipesState = {
    recipes: [],
};

const recipesSlice = createSlice({
    name: 'recipes',
    initialState,
    reducers: {
        setRecipes: (state, action: PayloadAction<Recipe[]>) => {
            state.recipes = action.payload;
        },
        addRecipes: (state, action: PayloadAction<Recipe[]>) => {
            state.recipes = [...state.recipes, ...action.payload];
        },
    },
});

export const { setRecipes, addRecipes } = recipesSlice.actions;
export default recipesSlice.reducer;
