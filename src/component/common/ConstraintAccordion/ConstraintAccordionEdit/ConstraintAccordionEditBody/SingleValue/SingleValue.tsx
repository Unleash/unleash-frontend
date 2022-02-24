import Input from 'component/common/Input/Input';
import { ConstraintFormHeader } from '../ConstraintFormHeader/ConstraintFormHeader';

interface ISingleValueProps {
    setValue: (value: string) => void;
    value?: string;
    type: string;
    error: string;
}

export const SingleValue = ({
    setValue,
    value,
    type,
    error,
}: ISingleValueProps) => {
    return (
        <>
            <ConstraintFormHeader>
                Add a single {type.toLowerCase()} value
            </ConstraintFormHeader>
            <div style={{ maxWidth: '300px', marginTop: '-1rem' }}>
                <Input
                    label={type}
                    name="value"
                    value={value || ''}
                    onChange={e => setValue(e.target.value.trim())}
                    placeholder={`Enter a single ${type} value`}
                    style={{
                        width: '100%',
                        margin: '1rem 0',
                    }}
                    error={Boolean(error)}
                    errorText={error}
                />
            </div>
        </>
    );
};
