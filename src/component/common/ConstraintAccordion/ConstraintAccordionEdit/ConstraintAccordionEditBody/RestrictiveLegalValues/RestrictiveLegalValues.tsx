import { Checkbox, FormControlLabel } from '@material-ui/core';
import { useCommonStyles } from 'common.styles';
import ConditionallyRender from 'component/common/ConditionallyRender';
import { useEffect, useState } from 'react';
import { ConstraintValueSearch } from '../../../ConstraintValueSearch/ConstraintValueSearch';
import { ConstraintFormHeader } from '../ConstraintFormHeader/ConstraintFormHeader';

// Parent component
interface IRestrictiveLegalValuesProps {
    legalValues: string[];
    values: string[];
    setValues: (values: string[]) => void;
    beforeValues?: JSX.Element;
    error: string;
    setError: React.Dispatch<React.SetStateAction<string>>;
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
    error,
    setError,
}: IRestrictiveLegalValuesProps) => {
    const [filter, setFilter] = useState('');
    const [valuesMap, setValuesMap] = useState(createValuesMap(values));
    const styles = useCommonStyles();

    useEffect(() => {
        setValuesMap(createValuesMap(values));
    }, [values, setValuesMap]);

    const onChange = (legalValue: string) => {
        setError('');
        if (valuesMap[legalValue]) {
            const index = values.findIndex(value => value === legalValue);
            const newValues = [...values];
            newValues.splice(index, 1);
            setValues(newValues);
            return;
        }

        setValues([...values, legalValue]);
    };

    return (
        <>
            <ConstraintFormHeader>
                Select values from a predefined set
            </ConstraintFormHeader>
            <ConstraintValueSearch filter={filter} setFilter={setFilter} />
            <LegalValueOptions
                legalValues={legalValues}
                filter={filter}
                onChange={onChange}
                valuesMap={valuesMap}
            />
            <ConditionallyRender
                condition={Boolean(error)}
                show={<p className={styles.error}>{error}</p>}
            />
        </>
    );
};

// Child component
interface ILegalValueOptionsProps {
    legalValues: string[];
    filter: string;
    onChange: (legalValue: string) => void;
    valuesMap: ValuesMap;
}

const LegalValueOptions = ({
    legalValues,
    filter,
    onChange,
    valuesMap,
}: ILegalValueOptionsProps) => {
    return (
        <>
            {legalValues
                .filter(legalValue => legalValue.includes(filter))
                .map(legalValue => {
                    return (
                        <FormControlLabel
                            key={legalValue}
                            control={
                                <Checkbox
                                    checked={Boolean(valuesMap[legalValue])}
                                    onChange={() => onChange(legalValue)}
                                    color="primary"
                                    name={legalValue}
                                />
                            }
                            label={legalValue}
                        />
                    );
                })}
        </>
    );
};
