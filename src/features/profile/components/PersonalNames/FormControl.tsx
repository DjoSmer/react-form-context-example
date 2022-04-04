import React from 'react';
import {connect, ConnectedProps} from 'react-redux';
import {debounce} from '@mui/material';
import {FormControlComponent} from '~/components';
import {setPersonalNames} from '~/features/profile/profileSlice';
import {createAppSelector} from '~/utils/createAppSelector';
import {PersonalNames} from '../../types';

export const FormContext = React.createContext<FormControlComp>({} as FormControlComp);
const mapState = createAppSelector(
    ({
        profile: {
            data: {personalNames},
        },
    }) => ({personalNames})
);
const mapDispatch = {setPersonalNames};
const connector = connect(mapState, mapDispatch);

type ReduxProps = ConnectedProps<typeof connector>;
export interface FormControlProps extends ReduxProps {
    children: React.ReactNode;
}

export interface FormControlState extends PersonalNames {}

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

        this.state = props.personalNames ? props.personalNames : initialForm();
        this.setPersonalNames = debounce(props.setPersonalNames, 500);
    }

    createHandleChange = (name: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
        this.handleFieldChange(name, event.target.value);
    };

    handleFieldChange = (name: string, value: string | boolean) => {
        const names = {...this.state, [name]: value};
        this.setState({...names});
        this.setPersonalNames({...names});
    };

    render() {
        return <FormContext.Provider value={this}>{this.props.children}</FormContext.Provider>;
    }
}

export const FormControl = connector(FormControlComp);
