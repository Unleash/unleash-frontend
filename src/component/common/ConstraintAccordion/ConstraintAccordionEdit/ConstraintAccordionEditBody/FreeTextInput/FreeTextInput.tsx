import React, { useState } from 'react';
import { ConstraintFormHeader } from '../ConstraintFormHeader/ConstraintFormHeader';
import { parseParameterStrings } from 'utils/parseParameter';
import { MultiValueInput } from 'component/common/form/MultiValueInput/MultiValueInput';
import { MultiValueOutput } from 'component/common/form/MultiValueOutput/MultiValueOutput';
import { uniqueValues } from 'utils/uniqueValues';

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

    const addValues = () => {
        const newValues = uniqueValues([
            ...values,
            ...parseParameterStrings(inputValues),
        ]);

        if (newValues.length === 0) {
            setError('values cannot be empty');
        } else if (newValues.some(v => v.length > 100)) {
            setError('values cannot be longer than 100 characters');
        } else {
            setError('');
            setInputValues('');
            setValues(newValues);
        }
    };

    return (
        <div>
            <ConstraintFormHeader style={{ marginBottom: 0 }}>
                Set values (maximum 100 char length per value)
            </ConstraintFormHeader>
            <MultiValueInput
                setInputValues={setInputValues}
                inputValues={inputValues}
                addValues={addValues}
                error={error}
                setError={setError}
            />
            <MultiValueOutput values={values} removeValue={removeValue} />
        </div>
    );
};
