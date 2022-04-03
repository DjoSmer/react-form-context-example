import React, {useContext, useEffect, useState} from 'react';
import {shallowEqual} from 'react-redux';
import {FormControlComponent} from './FormControlComponent';

type StateSelector<S = {}, RT = any> = (state: S) => RT;

export function makeFormControl<C extends FormControlComponent = FormControlComponent>(
    context: React.Context<C>
) {
    return function <RT = undefined>(func?: StateSelector<C['state'], RT>) {
        const {
            render,
            componentWillUnmount,
            componentDidMount,
            componentDidUpdate,
            events,
            ...control
        } = useContext(context);

        const [value, setValue] = useState<RT | undefined>(func ? func(control.state) : undefined);

        useEffect(() => {
            return (
                func &&
                control.onStateUpdate((state) => {
                    const newValue = func(state);

                    if (!shallowEqual(newValue, value)) setValue(newValue);
                })
            );
            // eslint-disable-next-line react-hooks/exhaustive-deps
        }, [control, value]);

        return {
            control,
            value,
        };
    };
}
