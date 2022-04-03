import React from 'react';
import {DateField} from '~/components';
import {useFormControl} from '../useFormControl';

export const DateOfExpiryField = () => {
    const {
        control: {createSimpleHandleChange},
        value,
    } = useFormControl(({entity: {dateOfExpiry}}) => dateOfExpiry);

    return (
        <DateField
            defaultValue={value}
            label="Date of expiry"
            onChange={createSimpleHandleChange('dateOfExpiry')}
        />
    );
};
