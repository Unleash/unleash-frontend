import { TextField } from '@material-ui/core';
import { ConstraintFormHeader } from '../ConstraintFormHeader/ConstraintFormHeader';

interface IDateSingleValueProps {
    setValue: (value: string) => void;
    value?: string;
}

export const DateSingleValue = ({ setValue, value }: IDateSingleValueProps) => {
    const parseValue = (value?: string) => {
        console.log(value);
        if (!value) return;
        return value.substring(0, value.length - 1);
    };

    return (
        <>
            <ConstraintFormHeader>Select a date</ConstraintFormHeader>
            <TextField
                id="date"
                label="Date"
                type="datetime-local"
                defaultValue={
                    parseValue(value) || parseValue(new Date().toISOString())
                }
                value={parseValue(value)}
                variant="outlined"
                size="small"
                onChange={e => {
                    console.log(e.target.value);
                    console.log(new Date(e.target.value).toISOString());
                    setValue(new Date(e.target.value).toISOString());
                }}
                InputLabelProps={{
                    shrink: true,
                }}
            />
        </>
    );
};
