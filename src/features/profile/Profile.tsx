import React from 'react';
import {Container, Box} from '@mui/material';
import {PersonalNames, PersonalDocument} from './components';

export const Profile = () => {
    return (
        <Container maxWidth="xl">
            <PersonalNames />
            <Box sx={{height: 20}} />
            <PersonalDocument />
        </Container>
    );
};
