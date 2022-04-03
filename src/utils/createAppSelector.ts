import {RootState} from '~/app/store';

export function createAppSelector<T extends RootState = RootState, RT = unknown>(
    func: (state: T) => RT
) {
    return func;
}
