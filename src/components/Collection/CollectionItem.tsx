import React, {useContext} from 'react';
import styled from '@mui/material/styles/styled';
import {Box, Typography, Button} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import {Collection} from '~/app/types';
import {CollectionContext} from './CollectionContext';
import {CollectionControl} from './types';

export interface CollectionItemProps<T extends Collection> {
    collection: T;
    index: number;
    label: string;
    caption?: string;
    onEdit?: (target: T, control: CollectionControl) => void;
    onRemoveItem: (target: T, control: CollectionControl) => void;
}

export const CollectionItemRoot = styled('div')(({theme}) => ({
    display: 'flex',
    alignItems: 'center',
    margin: '2px 0',
    padding: '0 .5rem',
    height: '50px',
    '&:hover': {
        backgroundColor: theme.palette.action.hover,
    },
}));

export function CollectionItem<T extends Collection = Collection>(props: CollectionItemProps<T>) {
    const {collection, index, label, caption, onEdit, onRemoveItem} = props;

    const control = useContext(CollectionContext);

    const handleRemoveClick = () => {
        onRemoveItem(collection, control);
    };

    const handleEditClick = () => {
        if (onEdit) onEdit(collection, control);
    };

    return (
        <CollectionItemRoot>
            <Box
                sx={{
                    flexGrow: 1,
                    display: 'flex',
                    alignItems: 'center',
                }}
            >
                <Typography className="item-index" typography="h6" sx={{fontSize: '1.1rem', mr: 1}}>
                    {index + 1}.
                </Typography>
                <Typography typography="h6">{label || 'No name'}</Typography>
                {caption && (
                    <Typography color="primary" typography="subtitle1" sx={{ml: 1}}>
                        ({caption})
                    </Typography>
                )}
            </Box>
            {onEdit && (
                <Button startIcon={<EditIcon />} variant="outlined" onClick={handleEditClick}>
                    Edit
                </Button>
            )}
            <Button
                color="error"
                variant="outlined"
                onClick={handleRemoveClick}
                sx={{minWidth: 'auto', padding: '5px', mx: 1}}
            >
                <DeleteIcon />
            </Button>
        </CollectionItemRoot>
    );
}
