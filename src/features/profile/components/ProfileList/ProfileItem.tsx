import React from 'react';
import {useAppDispatch} from '~/app/hooks';
import {CollectionControl, CollectionItem} from '~/components';
import {Profile} from '~/features/profile/types';
import {setProfileData} from '~/features/profile/profileSlice';
import {removeProfile} from './actions';

export interface ProfileItemProps {
    index: number;
    entity: Profile;
}

export const ProfileItem = (props: ProfileItemProps) => {
    const {index, entity} = props;

    const dispatch = useAppDispatch();
    const {personalNames} = entity;
    const name = personalNames ? `${personalNames!.firstName} ${personalNames!.lastName}` : '';

    const handleRemove = (target: Profile) => {
        dispatch(removeProfile(target));
    };

    const handleEdit = (target: Profile, control: CollectionControl) => {
        dispatch(setProfileData(target));
        control.open();
    };

    return (
        <CollectionItem
            key={entity._id}
            collection={entity}
            index={index}
            label={name}
            onRemoveItem={handleRemove}
            onEdit={handleEdit}
        />
    );
};
