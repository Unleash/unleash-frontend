import { Button, Chip, TextField } from '@material-ui/core';
import Input from 'component/common/Input/Input';
import { getValueByPointer } from 'fast-json-patch';
import React, { useState } from 'react';
import { ConstraintFormHeader } from '../ConstraintFormHeader/ConstraintFormHeader';

interface IFreeTextInputProps {
    values: string[];
    removeValue: (index: number) => void;
    setValues: (values: string[]) => void;
    beforeValues?: JSX.Element;
    error: string;
    setError: React.Dispatch<React.SetStateAction<string>>;
}

export const FreeTextInput = ({
    values,
    removeValue,
    setValues,
    error,
    setError,
}: IFreeTextInputProps) => {
    const [inputValues, setInputValues] = useState('');
    const [focused, setFocused] = useState(false);

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
        if (inputValues.length === 0) {
            setError('values can not be empty');
            return;
        }

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
            <ConstraintFormHeader style={{ marginBottom: 0 }}>
                Set values (maximum 100)
            </ConstraintFormHeader>
            <div style={{ display: 'flex', alignItems: 'center' }}>
                <div style={{ minWidth: '300px' }}>
                    <Input
                        label="Values"
                        name="values"
                        value={inputValues}
                        onBlur={e => setFocused(false)}
                        onFocus={() => {
                            setError('');
                            setFocused(true);
                        }}
                        onChange={e => setInputValues(e.target.value)}
                        placeholder="Enter comma separated values here"
                        style={{
                            width: '100%',
                            margin: '1rem 0',
                        }}
                        error={Boolean(error)}
                        errorText={error}
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
