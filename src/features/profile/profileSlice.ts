import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {PersonalDocument, PersonalNames, Profile} from './types';

export interface ProfileState extends Partial<Profile> {}

const initialState: ProfileState = {};

export const profileSlice = createSlice({
    name: 'profile',
    initialState,
    reducers: {
        setPersonalNames: (state, action: PayloadAction<PersonalNames>) => {
            state.personalNames = action.payload;
        },
        setPersonalDocuments: (state, action: PayloadAction<PersonalDocument[]>) => {
            state.personalDocuments = action.payload;
        },
    },
});

export const {setPersonalDocuments, setPersonalNames} = profileSlice.actions;

export default profileSlice.reducer;
