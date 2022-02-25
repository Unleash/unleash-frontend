import { TextField } from '@material-ui/core';
import { useEffect } from 'react';
import { ConstraintFormHeader } from '../ConstraintFormHeader/ConstraintFormHeader';
import { format } from 'date-fns';
interface IDateSingleValueProps {
    setValue: (value: string) => void;
    value?: string;
}

export const DateSingleValue = ({ setValue, value }: IDateSingleValueProps) => {
    const parseValue = (value?: string) => {
        if (!value) return;
        const date = new Date(value);
        return format(date, 'yyyy-MM-dd') + 'T' + format(date, 'kk:mm');
    };

    useEffect(() => {
        if (!value) {
            setValue(new Date().toISOString());
        }
    }, []);

    return (
        <>
            <ConstraintFormHeader>Select a date</ConstraintFormHeader>
            <TextField
                id="date"
                label="Date"
                type="datetime-local"
                value={parseValue(value)}
                variant="outlined"
                size="small"
                onChange={e => {
                    setValue(new Date(e.target.value).toISOString());
                }}
                InputLabelProps={{
                    shrink: true,
                }}
            />
        </>
    );
};
