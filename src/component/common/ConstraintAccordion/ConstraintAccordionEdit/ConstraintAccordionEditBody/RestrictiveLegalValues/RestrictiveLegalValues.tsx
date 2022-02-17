import { Checkbox, FormControlLabel } from '@material-ui/core';
import { useEffect, useState } from 'react';
import { ConstraintValueSearch } from '../../../ConstraintValueSearch/ConstraintValueSearch';
import { ConstraintFormHeader } from '../ConstraintFormHeader/ConstraintFormHeader';

interface IRestrictiveLegalValuesProps {
    legalValues: string[];
    values: string[];
    setValues: (values: string[]) => void;
    beforeValues?: JSX.Element;
}

type ValuesMap = { [key: string]: Boolean };

const createValuesMap = (values: string[]): ValuesMap => {
    return values.reduce((result: ValuesMap, currentValue: string) => {
        if (!result[currentValue]) {
            result[currentValue] = true;
        }
        return result;
    }, {});
};

export const RestrictiveLegalValues = ({
    legalValues,
    values,
    setValues,
}: IRestrictiveLegalValuesProps) => {
    const [filter, setFilter] = useState('');
    const [valuesMap, setValuesMap] = useState(createValuesMap(values));

    useEffect(() => {
        setValuesMap(createValuesMap(values));
    }, [values, setValuesMap]);

    const handleChange = (legalValue: string) => {
        if (valuesMap[legalValue]) {
            const index = values.findIndex(value => value === legalValue);
            const newValues = [...values];
            newValues.splice(index, 1);
            setValues(newValues);
            return;
        }

        setValues([...values, legalValue]);
    };

    const renderLegalValueInputs = () => {
        return legalValues
            .filter(legalValue => legalValue.includes(filter))
            .map(legalValue => {
                return (
                    <FormControlLabel
                        key={legalValue}
                        control={
                            <Checkbox
                                checked={Boolean(valuesMap[legalValue])}
                                onChange={() => handleChange(legalValue)}
                                color="primary"
                            />
                        }
                        label={legalValue}
                    />
                );
            });
    };

    return (
        <>
            <ConstraintFormHeader>
                Select values from a predefined set
            </ConstraintFormHeader>
            <ConstraintValueSearch filter={filter} setFilter={setFilter} />
            {renderLegalValueInputs()}
        </>
    );
};
