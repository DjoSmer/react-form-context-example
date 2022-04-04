import React from 'react';
import {TextField} from '@mui/material';
import {useAppSelector} from '~/app/hooks';
import {createAppSelector} from '~/utils/createAppSelector';
import {FormControlState} from './FormControl';
import {useFormControl} from './useFormControl';

export interface FormTextFieldProps {
    label: string;
    name: keyof FormControlState;
    required?: boolean;
}

export const FormTextField = (props: FormTextFieldProps) => {
    const {label, name, required} = props;
    const errorSelector = createAppSelector(
        ({profile: {errors}}) => (errors.personalNames && errors.personalNames[name]) || false
    );
    const error = useAppSelector(errorSelector);

    const {
        control: {createHandleChange},
        value,
    } = useFormControl((state) => state[name]);

    return (
        <TextField
            required={required}
            error={error}
            fullWidth
            name={name}
            label={label}
            value={value}
            onChange={createHandleChange(name)}
        />
    );
};
