import {Profile} from '~/features/profile/types';
import {DispatchThink} from '~/app/store';
import {formReset, setProfileErrors, setProfileList} from '~/features/profile/profileSlice';
import {createAppSelector} from '~/utils/createAppSelector';
import {uuid} from '~/utils/uuid';

export const profileSelector = createAppSelector(({profile: {data}}) => data || []);
export const profilesSelector = createAppSelector(({profile: {list}}) => list || []);
export const errorsSelector = createAppSelector(({profile: {errors}}) => errors || []);

const validate: DispatchThink<boolean> = (dispatch, getState) => {
    const profile = profileSelector(getState());
    const errors: ReturnType<typeof errorsSelector> = {};

    /**
     * простая валидация для показа
     * обычно ошибки приходят с бэка
     */
    if (profile.personalNames) {
        if (!profile.personalNames.firstName || !profile.personalNames.lastName) {
            errors.personalNames = {};
        }
        if (!profile.personalNames.firstName) {
            errors.personalNames!.firstName = true;
        }
        if (!profile.personalNames.lastName) {
            errors.personalNames!.lastName = true;
        }
    } else {
        errors.personalNames = {firstName: true, lastName: true};
    }

    if (Object.keys(errors).length) {
        dispatch(setProfileErrors(errors));
        return false;
    }
    return true;
};

export const addProfile: DispatchThink<boolean> = (dispatch, getState) => {
    const profile = profileSelector(getState());
    if (!dispatch(validate)) return false;
    if (profile._id) return dispatch(updateProfile);

    const profiles = profilesSelector(getState());

    dispatch(setProfileList(profiles.concat({...profile, _id: uuid()})));
    dispatch(formReset());
    return true;
};

export const updateProfile: DispatchThink<boolean> = (dispatch, getState) => {
    const profiles = profilesSelector(getState());
    const profile = profileSelector(getState()) as Profile;

    dispatch(
        setProfileList(profiles.map((entity) => (entity._id === profile._id ? profile : entity)))
    );
    dispatch(formReset());
    return true;
};

export const removeProfile =
    (target: Profile): DispatchThink =>
    (dispatch, getState) => {
        const profiles = profilesSelector(getState());
        dispatch(setProfileList(profiles.filter((entity) => entity._id !== target._id)));
    };
