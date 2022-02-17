import { TextField } from '@material-ui/core';
import { ConstraintFormHeader } from '../ConstraintFormHeader/ConstraintFormHeader';

interface ISingleValueProps {
    setValue: (value: string) => void;
    value?: string;
    type: string;
}

export const SingleValue = ({ setValue, value, type }: ISingleValueProps) => {
    return (
        <>
            <ConstraintFormHeader>
                Add a single {type.toLowerCase()} value
            </ConstraintFormHeader>
            <div style={{ maxWidth: '300px', marginTop: '-1rem' }}>
                <TextField
                    label={type}
                    name="value"
                    value={value}
                    onChange={e => setValue(e.target.value.trim())}
                    placeholder={`Enter a single ${type} value`}
                    style={{
                        width: '100%',
                        margin: '1rem 0',
                    }}
                    variant="outlined"
                    size="small"
                />
            </div>
        </>
    );
};
