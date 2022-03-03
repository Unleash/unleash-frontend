import { useEffect } from 'react';
import { ConstraintFormHeader } from '../ConstraintFormHeader/ConstraintFormHeader';
import { format } from 'date-fns';
import Input from 'component/common/Input/Input';
interface IDateSingleValueProps {
    setValue: (value: string) => void;
    value?: string;
    error: string;
    setError: React.Dispatch<React.SetStateAction<string>>;
}

export const DateSingleValue = ({
    setValue,
    value,
    error,
    setError,
}: IDateSingleValueProps) => {
    const parseValue = (value?: string) => {
        if (!value) return;
        const date = new Date(value);
        return format(date, 'yyyy-MM-dd') + 'T' + format(date, 'kk:mm');
    };

    useEffect(() => {
        if (!value) {
            setValue(new Date().toISOString());
        }
    }, [value, setValue]);

    return (
        <>
            <ConstraintFormHeader>Select a date</ConstraintFormHeader>
            <Input
                id="date"
                label="Date"
                type="datetime-local"
                value={parseValue(value) || ''}
                onChange={e => {
                    setError('');
                    setValue(new Date(e.target.value).toISOString());
                }}
                InputLabelProps={{
                    shrink: true,
                }}
                error={Boolean(error)}
                errorText={error}
            />
        </>
    );
};
