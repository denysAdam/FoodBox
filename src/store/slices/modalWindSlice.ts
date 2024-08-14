import { createSlice} from '@reduxjs/toolkit';

export interface ModalState {
    isOpen: boolean;
    formType: 'login' | 'signup';  
}

const initialState: ModalState = {
    isOpen: false,
    formType: 'login',
};

const modalSlice = createSlice({
    name: 'modal',
    initialState,
    reducers: {
        openModal: (state) => {
            state.isOpen = true;
            
        },
        closeModal: (state) => {
            state.isOpen = false;
        },
        openLogin: (state) => {
            state.formType = 'login';
            
        },
        openCreate: (state) => {
            state.formType = 'signup';
        },
    },
});

export const { openModal, closeModal, openLogin, openCreate } = modalSlice.actions;
export default modalSlice.reducer;
