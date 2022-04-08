import React from 'react';
import {EventManager} from '~/utils/EventManager';

export type EntityControlEvent<S = {}, P = {}> = (state: S, props: P) => void;

export abstract class FormControlComponent<P = any, S = any, SS = any> extends React.PureComponent<
    P,
    S,
    SS
> {
    events = new EventManager<EntityControlEvent<S, P>>();

    componentDidUpdate(prevProps: Readonly<P>, prevState: Readonly<S>, snapshot?: SS) {
        /**
         * при изменение state или props
         * вызываем stateUpdate событие, которое опросит всех подписциков
         */
        this.events.emit('stateUpdate', this.state, this.props);
    }

    onStateUpdate = (listener: EntityControlEvent<S, P>) => {
        return this.events.on('stateUpdate', listener);
    };
}
