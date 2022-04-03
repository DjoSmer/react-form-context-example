import {configureStore} from '@reduxjs/toolkit';
import profile from '../features/profile/profileSlice';

export const store = configureStore({
    reducer: {
        profile,
    },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type DispatchThink = (dispatch: AppDispatch, getState: () => RootState) => void;
