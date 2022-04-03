import React from 'react';
import {Grid} from '@mui/material';
import {CollectionForm} from '~/components';
import {DocumentTypeField} from './DocumentTypeField';
import {DateOfExpiryField} from './DateOfExpiryField';
import {FormTextField} from './FormTextField';
import {useFormControl} from '../useFormControl';

export const PersonalDocumentForm = () => {
    const {
        control: {handleDone, handleClose},
    } = useFormControl();

    return (
        <CollectionForm onDone={handleDone} onClose={handleClose}>
            <Grid container spacing={2}>
                <Grid item xs={6}>
                    <DocumentTypeField />
                </Grid>
                <Grid item xs={6}>
                    <FormTextField label="Document name" name="name" />
                </Grid>
                <Grid item xs={6}>
                    <DateOfExpiryField />
                </Grid>
                <Grid item xs={6}>
                    <FormTextField label="Document number" name="number" />
                </Grid>
            </Grid>
        </CollectionForm>
    );
};
