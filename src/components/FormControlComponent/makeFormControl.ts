import React, {useContext, useEffect, useState} from 'react';
import {shallowEqual} from 'react-redux';
import {FormControlComponent} from './FormControlComponent';

type StateSelector<S = {}, P = {}, RT = any> = (state: S, props: P) => RT;

export function makeFormControl<C extends FormControlComponent = FormControlComponent>(
    context: React.Context<C>
) {
    return function <RT = undefined>(func?: StateSelector<C['state'], C['props'], RT>) {
        const {
            render,
            componentWillUnmount,
            componentDidMount,
            componentDidUpdate,
            events,
            ...control
        } = useContext(context);

        const [value, setValue] = useState<RT | undefined>(
            func ? func(control.state, control.props) : undefined
        );

        /**
         * подписываемся на событие stateUpdate, возвращем функцию отписки
         * после срабатывание, проверяем текущее с прерыдущем состоянием
         * если есть изменение, то обновляем, и происходит рендер компонента
         */
        useEffect(() => {
            return (
                func &&
                control.onStateUpdate((state, props) => {
                    const newValue = func(state, props);

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
