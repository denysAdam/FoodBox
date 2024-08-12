import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface DeliveryItem {
    id: string; // уникальный идентификатор для каждой доставки
    status: boolean; // статус: выполнено (true) или не выполнено (false)
    items: string[]; // элементы доставки
    date: string; // дата доставки в формате строки
}

export interface DeliveryState {
    delivery: DeliveryItem[];
}

const initialState: DeliveryState = {
    delivery: [],
};

const deliverySlice = createSlice({
    name: 'delivery',
    initialState,
    reducers: {
        // Создание новой доставки
        addDelivery: (state, action: PayloadAction<Omit<DeliveryItem, 'id'>>) => {
            const newDelivery: DeliveryItem = {
                id: new Date().toISOString(), // генерируем уникальный ID на основе времени
                ...action.payload,
            };
            state.delivery.push(newDelivery);
        },

        // Обновление статуса доставки на выполненное
        completeDelivery: (state, action: PayloadAction<string>) => {
            const delivery = state.delivery.find(item => item.id === action.payload);
            if (delivery) {
                delivery.status = true; // переводим статус на выполненное
            }
        },

        // Установка всех доставок (например, при инициализации)
        setDelivery: (state, action: PayloadAction<DeliveryItem[]>) => {
            state.delivery = action.payload;
        },
        removeDelivery: (state, action: PayloadAction<string>) => {
            state.delivery = state.delivery.filter(item => item.id !== action.payload);
        },
    },
});

export const { addDelivery, completeDelivery, setDelivery, removeDelivery } = deliverySlice.actions;
export default deliverySlice.reducer;
