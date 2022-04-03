import React from 'react';
import {TextField} from '@mui/material';
import {PersonalDocument} from '~/features/profile/types';
import {useFormControl} from '../useFormControl';

export interface FormTextFieldProps {
    label: string;
    name: keyof PersonalDocument;
}

export const FormTextField = (props: FormTextFieldProps) => {
    const {label, name} = props;

    const {
        control: {createHandleChange},
        value,
    } = useFormControl(({entity}) => entity[name]);

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
