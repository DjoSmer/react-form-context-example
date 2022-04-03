import {Collection} from '~/app/types';

export interface PersonalNames {
    firstName: string;
    lastName: string;
    additionalName: string;
    maidenName: string;
}

export interface PersonalDocument extends Collection {
    type: string;
    name: string;
    number: string;
    dateOfExpiry: string;
}

export interface Profile {
    personalNames: PersonalNames;
    personalDocuments: PersonalDocument[];
}
