import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {MakePartialBoolean} from '~/app/types';
import {PersonalDocument, PersonalNames, Profile} from './types';

export interface ProfileState {
    data: Partial<Profile>;
    list: Profile[];
    errors: MakePartialBoolean<Profile>;
}

const initialState: ProfileState = {
    data: {},
    list: [],
    errors: {},
};

export const profileSlice = createSlice({
    name: 'profile',
    initialState,
    reducers: {
        setPersonalNames: (state, action: PayloadAction<PersonalNames>) => {
            const {personalNames, ...errors} = state.errors;
            state.errors = errors;
            state.data.personalNames = action.payload;
        },
        setPersonalDocuments: (state, action: PayloadAction<PersonalDocument[]>) => {
            state.data.personalDocuments = action.payload;
        },
        setProfileData: (state, action: PayloadAction<ProfileState['data']>) => {
            state.data = action.payload;
        },
        setProfileList: (state, action: PayloadAction<ProfileState['list']>) => {
            state.list = action.payload;
        },
        setProfileErrors: (state, action: PayloadAction<ProfileState['errors']>) => {
            state.errors = action.payload;
        },
        formReset: (state) => {
            state.data = {};
            state.errors = {};
        },
    },
});

export const {
    setPersonalDocuments,
    setPersonalNames,
    setProfileData,
    setProfileList,
    setProfileErrors,
    formReset,
} = profileSlice.actions;

export default profileSlice.reducer;
