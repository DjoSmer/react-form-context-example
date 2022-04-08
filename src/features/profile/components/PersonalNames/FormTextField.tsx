import React from 'react';
import {TextField} from '@mui/material';
import {useAppSelector} from '~/app/hooks';
import {createAppSelector} from '~/utils/createAppSelector';
import {FormControlState} from './FormControl';
import {useFormControl} from './useFormControl';

export interface FormTextFieldProps {
    label: string;
    name: keyof FormControlState['entity'];
}

export const FormTextField = (props: FormTextFieldProps) => {
    const {label, name} = props;
    const errorSelector = createAppSelector(
        ({profile: {errors}}) => (errors.personalNames && errors.personalNames[name]) || false
    );
    const error = useAppSelector(errorSelector);

    const {
        control: {fieldChange},
        value: {value, required} = {},
    } = useFormControl(({entity}, {requiredFields}) => ({
        value: entity[name],
        required: requiredFields[name],
    }));

    return (
        <TextField
            required={required}
            error={error}
            fullWidth
            name={name}
            label={label}
            value={value}
            onChange={({target: {value}}) => fieldChange(name, value)}
        />
    );
};
