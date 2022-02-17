import { TextField } from '@material-ui/core';
import { useEffect } from 'react';
import { ConstraintFormHeader } from '../ConstraintFormHeader/ConstraintFormHeader';

interface IDateSingleValueProps {
    setValue: (value: string) => void;
    value?: string;
}

export const DateSingleValue = ({ setValue, value }: IDateSingleValueProps) => {
    const parseValue = (value?: string) => {
        if (!value) return;
        return value.substring(0, value.length - 1);
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
