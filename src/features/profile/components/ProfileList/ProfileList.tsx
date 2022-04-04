import React from 'react';
import {Container} from '@mui/material';
import {useAppSelector} from '~/app/hooks';
import {CollectionList} from '~/components';
import {ProfileForm} from './ProfileForm';
import {ProfileItem} from './ProfileItem';
import {profilesSelector} from './actions';

export const ProfileList = () => {
    const profiles = useAppSelector(profilesSelector);
    return (
        <Container maxWidth="xl">
            <CollectionList
                addCollectionLabel="+ Add Profile"
                additionalCollectionLabel="+ Add more Profile"
                renderCollectionForm={() => <ProfileForm />}
            >
                {profiles.map((profile, i) => (
                    <ProfileItem key={profile._id} index={i} entity={profile} />
                ))}
            </CollectionList>
        </Container>
    );
};
