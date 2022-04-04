import {PersonalDocument} from '~/features/profile/types';
import {DispatchThink} from '~/app/store';
import {setPersonalDocuments} from '~/features/profile/profileSlice';
import {createAppSelector} from '~/utils/createAppSelector';

export const personalDocumentsSelector = createAppSelector(
    ({
        profile: {
            data: {personalDocuments},
        },
    }) => personalDocuments || []
);

export const addPersonalDocument =
    (target: PersonalDocument): DispatchThink =>
    (dispatch, getState) => {
        const personalDocuments = personalDocumentsSelector(getState());
        dispatch(setPersonalDocuments(personalDocuments.concat(target)));
    };

export const updatePersonalDocument =
    (target: PersonalDocument): DispatchThink =>
    (dispatch, getState) => {
        const personalDocuments = personalDocumentsSelector(getState());
        dispatch(
            setPersonalDocuments(
                personalDocuments.map((entity) => (entity._id === target._id ? target : entity))
            )
        );
    };

export const removePersonalDocument =
    (target: PersonalDocument): DispatchThink =>
    (dispatch, getState) => {
        const personalDocuments = personalDocumentsSelector(getState());
        dispatch(
            setPersonalDocuments(personalDocuments.filter((entity) => entity._id !== target._id))
        );
    };
