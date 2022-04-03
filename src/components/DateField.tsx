import React, {useEffect} from 'react';
import parseISO from 'date-fns/parseISO';
import {DatePicker, LocalizationProvider} from '@mui/lab';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import {TextField} from '@mui/material';

interface DateFieldProps {
    label?: string;
    defaultValue?: string;
    onChange?: (value: string) => void;
}

export const DateField: React.FC<DateFieldProps> = (inProps) => {
    const {defaultValue, onChange, ...props} = inProps;

    const [date, setDate] = React.useState<Date | null>(null);

    useEffect(() => {
        if (!date && defaultValue) {
            setDate(parseISO(defaultValue));
        }
    }, [date, defaultValue]);

    const handleChange = (value: Date | null) => {
        if (onChange) onChange(value?.toJSON() || '');
        setDate(value);
    };

    return (
        <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DatePicker
                {...props}
                value={date}
                onChange={handleChange}
                renderInput={(params) => {
                    return <TextField {...params} fullWidth={true} />;
                }}
            />
        </LocalizationProvider>
    );
};
