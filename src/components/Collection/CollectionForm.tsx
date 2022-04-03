import React, {useContext} from 'react';
import styled from '@mui/material/styles/styled';
import {CollectionContext} from './CollectionContext';
import {CollectionControl} from './types';
import {Divider} from '@mui/material';
import {Button} from '@mui/material';

export interface CollectionFormProps {
    onDone: (control: CollectionControl) => void;
    onClose?: () => void;
}

export const Actions = styled('div')({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    flex: '0 0 auto',
    '& > :not(:first-of-type)': {
        marginLeft: 8,
    },
});

export const CollectionForm: React.FC<CollectionFormProps> = (props) => {
    const {onDone, onClose = () => {}, children} = props;

    const control = useContext(CollectionContext);

    const handleDoneClick = () => {
        onDone(control);
    };

    const handleCloseClick = () => {
        onClose();
        control.close();
    };

    return (
        <>
            {children}
            <Divider sx={{my: 2, borderStyle: 'dashed'}} />
            <Actions>
                <Button color="secondary" onClick={handleCloseClick}>
                    Cancel
                </Button>
                <Button onClick={handleDoneClick}>Done</Button>
            </Actions>
        </>
    );
};
