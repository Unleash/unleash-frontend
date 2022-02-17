import { Button, Chip, TextField } from '@material-ui/core';
import { getValueByPointer } from 'fast-json-patch';
import { useState } from 'react';

interface IFreeTextInputProps {
    values: string[];
    removeValue: (index: number) => void;
    setValues: (values: string[]) => void;
    beforeValues?: JSX.Element;
}

export const FreeTextInput = ({
    values,
    removeValue,
    setValues,
}: IFreeTextInputProps) => {
    const [inputValues, setInputValues] = useState('');

    const renderCurrentValues = () => {
        return values.map((value, index) => {
            return (
                <Chip
                    label={value}
                    key={value}
                    onDelete={() => removeValue(index)}
                    style={{ margin: '0 0.5rem 0.5rem 0' }}
                />
            );
        });
    };

    const handleAddValues = () => {
        if (inputValues.includes(',')) {
            const newValues = inputValues
                .split(',')
                .filter(values => values)
                .map(value => value.trim());
            setValues([...values, ...newValues]);
        } else {
            setValues([...values, inputValues.trim()]);
        }
        setInputValues('');
    };

    return (
        <div>
            <div style={{ display: 'flex', alignItems: 'center' }}>
                <div style={{ minWidth: '300px' }}>
                    <TextField
                        label="Values"
                        name="values"
                        value={inputValues}
                        onChange={e => setInputValues(e.target.value)}
                        placeholder="Enter comma separated values here"
                        style={{
                            width: '100%',
                            margin: '1rem 0',
                        }}
                        variant="outlined"
                        size="small"
                    />
                </div>
                <Button
                    style={{ marginLeft: '1rem' }}
                    variant="contained"
                    color="primary"
                    onClick={() => handleAddValues()}
                >
                    Add values
                </Button>
            </div>
            <div style={{ marginTop: '1rem' }}>{renderCurrentValues()}</div>
        </div>
    );
};
