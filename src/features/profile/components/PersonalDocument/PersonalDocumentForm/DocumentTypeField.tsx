import {MenuItem, TextField} from '@mui/material';
import React from 'react';
import {useFormControl} from '../useFormControl';

export const DocumentTypeField = () => {
    const {
        control: {createHandleChange},
        value,
    } = useFormControl(({entity: {type}}) => type);

    return (
        <TextField
            fullWidth
            select
            label="Document type"
            value={value}
            onChange={createHandleChange('type')}
        >
            <MenuItem value="passport">Passport</MenuItem>
            <MenuItem value="driving">Driving License</MenuItem>
        </TextField>
    );
};
