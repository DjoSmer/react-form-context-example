import React from 'react';
import {CollectionItem} from '~/components';
import {useFormControl} from './useFormControl';
import {PersonalDocument} from '~/features/profile/types';

export interface PersonalDocumentProps {
    index: number;
    entity: PersonalDocument;
}

export const PersonalDocumentItem = (props: PersonalDocumentProps) => {
    const {index, entity} = props;

    const {
        control: {handleEditItem, handleRemove},
    } = useFormControl();

    return (
        <CollectionItem
            key={entity._id}
            collection={entity}
            index={index}
            label={entity.name}
            caption={index === 0 ? 'Standard' : undefined}
            onRemoveItem={handleRemove}
            onEdit={handleEditItem}
        />
    );
};
