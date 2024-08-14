import { createSlice, PayloadAction, createAsyncThunk  } from "@reduxjs/toolkit";
import users from '../../data/materials.json'; 

export interface LoginLogicState {
    email: string;
    password: string;
    isFormValid: boolean;
    errorMessage: string | null;
}

const initialState: LoginLogicState = {
    email: '',
    password: '',
    isFormValid: false,
    errorMessage: null,
};
interface CheckCredentialsArgs {
    email: string;
    password: string;
}

interface CheckCredentialsResult {
    valid: boolean;
    errorMessage: string | null;
}

export const checkCredentialsAsync = createAsyncThunk<CheckCredentialsResult, CheckCredentialsArgs>(
    'loginLogic/checkCredentials',
    async ({ email, password }: CheckCredentialsArgs) => {
        const user = users.users.find(user => user.email === email && user.password === password);

        if (user) {
            return { valid: true, errorMessage: null };
        } else {
            return { valid: false, errorMessage: 'Invalid email or password' };
        }
    }
);

const loginLogicSlice = createSlice({
    name: 'loginLogic',
    initialState,
    reducers: {
        setEmail: (state, action: PayloadAction<string>) => {
            state.email = action.payload;
            state.isFormValid = state.email !== '' && state.password !== '';
        },
        setPassword: (state, action: PayloadAction<string>) => {
            state.password = action.payload;
            state.isFormValid = state.email !== '' && state.password !== '';
        },
        resetForm: (state) => {
            state.email = '';
            state.password = '';
            state.isFormValid = false;
            state.errorMessage = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(checkCredentialsAsync.fulfilled, (state, action: PayloadAction<CheckCredentialsResult>) => {
                if (action.payload.valid) {
                    state.errorMessage = null;
                } else {
                    state.errorMessage = action.payload.errorMessage;
                }
            });
    }
});

export const { setEmail, setPassword, resetForm } = loginLogicSlice.actions;
export default loginLogicSlice.reducer;

