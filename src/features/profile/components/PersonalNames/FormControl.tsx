import React from 'react';
import {connect, ConnectedProps} from 'react-redux';
import {debounce} from '@mui/material';
import {FormControlComponent} from '~/components';
import {setPersonalNames} from '~/features/profile/profileSlice';
import {createAppSelector} from '~/utils/createAppSelector';
import {PersonalNames} from '../../types';
import {MakePartialBoolean} from '~/app/types';

export const FormContext = React.createContext<FormControlComp>({} as FormControlComp);
const mapState = createAppSelector(
    ({
        profile: {
            data: {personalNames},
            requiredFields: {personalNames: requiredFields = {}},
            errors: {personalNames: errors = {}},
        },
    }) => ({personalNames, requiredFields, errors})
);
const mapDispatch = {setPersonalNames};
const connector = connect(mapState, mapDispatch);

type ReduxProps = ConnectedProps<typeof connector>;
export interface FormControlProps extends ReduxProps {
    children: React.ReactNode;
}

export interface FormControlState {
    entity: PersonalNames;
    /**
     * если у поля есть ошибка,
     */
    errors: MakePartialBoolean<PersonalNames>;
}

const initialForm = (): PersonalNames => ({
    firstName: '',
    lastName: '',
    additionalName: '',
    maidenName: '',
});

class FormControlComp extends FormControlComponent<FormControlProps, FormControlState> {
    setPersonalNames: (entry: PersonalNames) => void;

    constructor(props: FormControlProps) {
        super(props);

        this.state = {
            entity: props.personalNames ? props.personalNames : initialForm(),
            errors: {},
        };
        this.setPersonalNames = debounce(props.setPersonalNames, 500);
    }

    componentDidUpdate(
        prevProps: Readonly<FormControlProps>,
        prevState: Readonly<FormControlState>,
        snapshot?: any
    ) {
        super.componentDidUpdate(prevProps, prevState, snapshot);
        const {errors} = this.props;

        if (prevProps.errors !== errors) {
            this.setState({errors});
        }
    }

    fieldChange = (name: keyof PersonalNames, value: PersonalNames[keyof PersonalNames]) => {
        const {entity: prevEntity} = this.state;
        const entity = {...prevEntity, [name]: value};
        this.setState({entity});
        this.setPersonalNames(entity);
    };

    render() {
        return <FormContext.Provider value={this}>{this.props.children}</FormContext.Provider>;
    }
}

export const FormControl = connector(FormControlComp);
