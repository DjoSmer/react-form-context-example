import React from 'react';
import {PersonalDocumentList} from './PersonalDocumentList';
import {Card, CardContent, CardHeader} from '@mui/material';

export const PersonalDocument = () => {
    return (
        <Card>
            <CardHeader title="Your Documents" />
            <CardContent>
                <PersonalDocumentList />
            </CardContent>
        </Card>
    );
};
