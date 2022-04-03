import React from 'react';
import {connect, ConnectedProps} from 'react-redux';
import {uuid} from '~/utils/uuid';
import {
    addPersonalDocument,
    updatePersonalDocument,
    removePersonalDocument,
    reorderPersonalDocument,
} from './actions';
import {PersonalDocument} from '~/features/profile/types';
import {CollectionControl, FormControlComponent} from '~/components';

export const FormContext = React.createContext<FormControlComp>({} as FormControlComp);
const mapDispatch = {
    addPersonalDocument,
    updatePersonalDocument,
    removePersonalDocument,
    reorderPersonalDocument,
};
const connector = connect(null, mapDispatch);
type ReduxProps = ConnectedProps<typeof connector>;

export interface FormControlProps extends ReduxProps {
    children: React.ReactNode;
}

export interface FormControlState {
    entity: PersonalDocument;
}

const initialForm = (): PersonalDocument => ({
    _id: uuid(),
    type: '',
    name: '',
    number: '',
    dateOfExpiry: '',
});

class FormControlComp extends FormControlComponent<FormControlProps, FormControlState> {
    editMode: boolean = false;
    loading: boolean = false;

    constructor(props: FormControlProps) {
        super(props);

        this.state = {entity: initialForm()};
    }

    createHandleChange = (name: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
        this.handleFieldChange(name, event.target.value);
    };

    createSimpleHandleChange = (name: string) => (value: string) => {
        this.handleFieldChange(name, value);
    };

    handleFieldChange = (name: string, value: string | boolean) => {
        this.setState(({entity}) => ({
            entity: {...entity, [name]: value},
        }));
    };

    handleDone = async (control: CollectionControl) => {
        const {addPersonalDocument, updatePersonalDocument} = this.props;
        const {entity} = this.state;

        this.editMode ? updatePersonalDocument(entity) : addPersonalDocument(entity);

        this.reset();
        control.close();
    };

    handleClose = () => {
        this.reset();
    };

    handleEditItem = (entity: PersonalDocument, control: CollectionControl) => {
        this.setState({entity});
        this.editMode = true;
        control.open();
    };

    handleReorder = (current: PersonalDocument, target: PersonalDocument) => {
        this.props.reorderPersonalDocument(current, target);
    };

    handleRemove = (target: PersonalDocument) => {
        this.props.removePersonalDocument(target);
    };

    reset = () => {
        this.setState({entity: initialForm()});
        this.editMode = false;
        this.loading = false;
    };

    render() {
        return <FormContext.Provider value={this}>{this.props.children}</FormContext.Provider>;
    }
}

export const FormControl = connector(FormControlComp);
