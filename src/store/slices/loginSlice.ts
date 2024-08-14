import { createSlice} from "@reduxjs/toolkit";

export interface LoginState {
    login: boolean;
}

const initialState: LoginState = {
    login: false,
};

const loginSlice = createSlice({
    name: 'login',
    initialState,
    reducers: {
        login: (state ) => {
            state.login = true;
        },
        logout: (state) => {
            state.login = false;
        },
    },
});

export const { login, logout } = loginSlice.actions;
export default loginSlice.reducer;