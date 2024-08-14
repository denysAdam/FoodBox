import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import users from '../../data/materials.json'; 

export interface Delivery {
    id: number;
    address: string;
    status: string;
}

export interface User {
    id: number;
    name: string;
    email: string;
    password: string;
    address: string;
    phone: string;
    deliveries: Delivery[];
}

export interface UserState {
    currentUser: User | null;
    currentUserId: number |string | null;
}

const initialState: UserState = {
    currentUser: null,
    currentUserId: null,
};

export interface UpdateUserDetailsPayload {
    name: string;
    email: string;
    password: string;
    address: string;
    phone: string;
}

export interface UserCredentials {
    email: string;
    password: string;
}
export interface UpdateUserDeliveriesPayload {
    deliveries: Delivery[];
}
const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setUserByCredentials: (state, action: PayloadAction<UserCredentials>) => {
            const user = users.users.find(user => user.email === action.payload.email && user.password === action.payload.password);
            if (user) {
                state.currentUserId = user.id;
                state.currentUser = user;
            }
        },
        updateUserDeliveries: (state, action: PayloadAction<UpdateUserDeliveriesPayload>) => {
            if (state.currentUser) {
                state.currentUser.deliveries = action.payload.deliveries;
            }
        },
        updateUserDetails: (state, action: PayloadAction<UpdateUserDetailsPayload>) => {
            if (state.currentUser) {
                state.currentUser.name = action.payload.name;
                state.currentUser.email = action.payload.email;
                state.currentUser.password = action.payload.password;
                state.currentUser.address = action.payload.address;
                state.currentUser.phone = action.payload.phone;
            }
        },
        clearUser: (state) => {
            state.currentUser = null;
            state.currentUserId = null;
        },
    }
});

export const { setUserByCredentials, updateUserDetails, clearUser,updateUserDeliveries } = userSlice.actions;
export default userSlice.reducer;
