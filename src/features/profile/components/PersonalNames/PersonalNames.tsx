import React from 'react';
import {Card, CardContent, CardHeader, Stack} from '@mui/material';
import {FormTextField} from './FormTextField';
import {FormControl} from './FormControl';

export const PersonalNames = () => {
    return (
        <FormControl>
            <Card>
                <CardHeader title="Your Names" />
                <CardContent>
                    <Stack direction="row" spacing={2}>
                        <FormTextField label="First Name" name="firstName" />
                        <FormTextField label="Additional Name" name="additionalName" />
                    </Stack>

                    <Stack direction="row" spacing={2} mt={4}>
                        <FormTextField label="Last Name" name="lastName" />
                        <FormTextField label="Maiden Name" name="maidenName" />
                    </Stack>
                </CardContent>
            </Card>
        </FormControl>
    );
};
