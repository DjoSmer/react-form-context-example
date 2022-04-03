import React, {PropsWithChildren, useMemo, useState} from 'react';
import {Button, Divider} from '@mui/material';
import {CollectionContext} from './CollectionContext';
import {CollectionControl} from './types';

export interface CollectionListProps {
    renderCollectionForm: (params: {control: CollectionControl}) => React.ReactNode;
    addCollectionLabel: string;
    additionalCollectionLabel: string;
    disableHeaderDivider?: boolean;
}

export function CollectionList(props: PropsWithChildren<CollectionListProps>) {
    const {addCollectionLabel, additionalCollectionLabel, renderCollectionForm} = props;

    const [open, setOpen] = useState(false);

    const control = useMemo<CollectionControl>(
        () => ({
            open: () => {
                setOpen(true);
            },
            close: () => {
                setOpen(false);
            },
        }),
        []
    );

    const children = React.Children.toArray(props.children);

    return (
        <CollectionContext.Provider value={control}>
            {open ? (
                renderCollectionForm({control: control})
            ) : (
                <>
                    {children.length ? (
                        <>
                            <Divider sx={{mb: 1}} />
                            {children}
                        </>
                    ) : null}
                    <Divider sx={{mb: 1, borderStyle: 'dashed'}} />
                    <Button variant="text" onClick={control.open}>
                        {children.length ? additionalCollectionLabel : addCollectionLabel}
                    </Button>
                </>
            )}
        </CollectionContext.Provider>
    );
}
