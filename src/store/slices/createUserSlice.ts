import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface UserState {
    user: User[];
}
export interface User {
    email: string;
    password: string;
    userId: string;
    userName: string;
    userAdress: string;
    deliveries: string[];
}

const initialState: UserState = {
    user: [],
};  

const userSlice = createSlice({
    name: 'userCreate',
    initialState,
    reducers: {
        addUser: (state, action: PayloadAction<User>) => {
            state.user.push(action.payload);
        },
    },
});

export const { addUser } = userSlice.actions;
export default userSlice.reducer;