import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import users from '../../data/materials.json'; 
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
        addUser: (state, action: PayloadAction<Omit<User, 'userId'>>) => {
            const lastUserId = Math.max(...users.users.map(user => user.id));
            const newUserId = lastUserId + 1;
            state.user.push({ ...action.payload, userId: newUserId.toString() });
            console.log(state.user)
        },
    },
});

export const { addUser } = userSlice.actions;
export default userSlice.reducer;