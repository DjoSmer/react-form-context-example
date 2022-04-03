import React from 'react';
import {TextField} from '@mui/material';
import {FormControlState} from './FormControl';
import {useFormControl} from './useFormControl';

export interface FormTextFieldProps {
    label: string;
    name: keyof FormControlState;
}

export const FormTextField = (props: FormTextFieldProps) => {
    const {label, name} = props;

    const {
        control: {createHandleChange},
        value,
    } = useFormControl((state) => state[name]);

    return (
        <TextField
            fullWidth
            name={name}
            label={label}
            value={value}
            onChange={createHandleChange(name)}
        />
    );
};
