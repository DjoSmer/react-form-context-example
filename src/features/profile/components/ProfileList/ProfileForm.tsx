import React from 'react';
import {Box} from '@mui/material';
import {useAppDispatch} from '~/app/hooks';
import {CollectionControl, CollectionForm} from '~/components';
import {addProfile} from './actions';
import {PersonalNames} from '../PersonalNames';
import {PersonalDocument} from '../PersonalDocument';
import {formReset} from '../../profileSlice';

export const ProfileForm = () => {
    const dispatch = useAppDispatch();

    const handleDone = (control: CollectionControl) => {
        if (dispatch(addProfile)) control.close();
    };

    const handleClose = () => {
        dispatch(formReset());
    };

    return (
        <CollectionForm onDone={handleDone} onClose={handleClose}>
            <PersonalNames />
            <Box sx={{height: 20}} />
            <PersonalDocument />
        </CollectionForm>
    );
};
