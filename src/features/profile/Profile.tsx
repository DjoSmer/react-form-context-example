import React from 'react';
import {Container} from '@mui/material';
import {ProfileList} from './components';

export const Profile = () => {
    return (
        <Container maxWidth="xl">
            <ProfileList />
        </Container>
    );
};
