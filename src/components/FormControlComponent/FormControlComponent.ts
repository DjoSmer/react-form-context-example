import React from 'react';
import {EventManager} from '~/utils/EventManager';

export type EntityControlEvent<S = {}> = (state: S) => void;

export abstract class FormControlComponent<P = any, S = any, SS = any> extends React.PureComponent<
    P,
    S,
    SS
> {
    events = new EventManager<EntityControlEvent<S>>();

    componentDidUpdate(prevProps: Readonly<P>, prevState: Readonly<S>, snapshot?: SS) {
        this.events.emit('stateUpdate', this.state);
    }

    onStateUpdate = (listener: EntityControlEvent<S>) => {
        return this.events.on('stateUpdate', listener);
    };
}
