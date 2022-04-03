import React from 'react';
import {shallowEqual} from 'react-redux';
import {useAppSelector} from '~/app/hooks';
import {CollectionList} from '~/components';
import {FormControl} from './FormControl';
import {PersonalDocumentForm} from './PersonalDocumentForm';
import {PersonalDocumentItem} from './PersonalDocumentItem';
import {personalDocumentsSelector} from './actions';

export const PersonalDocumentList = () => {
    const personalDocuments = useAppSelector(personalDocumentsSelector, shallowEqual);

    return (
        <FormControl>
            <CollectionList
                addCollectionLabel="+ Add document"
                additionalCollectionLabel="+ Add more document"
                renderCollectionForm={() => <PersonalDocumentForm />}
            >
                {personalDocuments.map((document, i) => (
                    <PersonalDocumentItem key={document._id} index={i} entity={document} />
                ))}
            </CollectionList>
        </FormControl>
    );
};
