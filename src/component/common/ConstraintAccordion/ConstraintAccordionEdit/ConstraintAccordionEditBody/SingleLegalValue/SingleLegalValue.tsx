import { useState } from 'react';
import { ConstraintFormHeader } from '../ConstraintFormHeader/ConstraintFormHeader';
import {
    FormControl,
    FormLabel,
    FormControlLabel,
    RadioGroup,
    Radio,
} from '@material-ui/core';
import { ConstraintValueSearch } from '../../../ConstraintValueSearch/ConstraintValueSearch';
import ConditionallyRender from '../../../../ConditionallyRender';
import { useTheme } from '@material-ui/core/styles';

interface ISingleLegalValueProps {
    setValue: (value: string) => void;
    value?: string;
    type: string;
    legalValues: string[];
    error: string;
}

export const SingleLegalValue = ({
    setValue,
    value,
    type,
    legalValues,
    error,
}: ISingleLegalValueProps) => {
    const theme = useTheme();
    const [filter, setFilter] = useState('');
    const renderRadioButtons = () => {
        return legalValues
            .filter(legalValue => legalValue.includes(filter))
            .map((value, index) => {
                return (
                    <FormControlLabel
                        key={`${value}-${index}`}
                        value={value}
                        control={<Radio />}
                        label={value}
                    />
                );
            });
    };

    return (
        <>
            <ConstraintFormHeader>
                Add a single {type.toLowerCase()} value
            </ConstraintFormHeader>

            <ConstraintValueSearch filter={filter} setFilter={setFilter} />
            <ConditionallyRender
                condition={Boolean(legalValues.length)}
                show={
                    <FormControl component="fieldset">
                        <FormLabel component="legend">
                            Available values
                        </FormLabel>
                        <RadioGroup
                            aria-label="selected-value"
                            name="selected"
                            value={value}
                            onChange={e => setValue(e.target.value)}
                        >
                            {renderRadioButtons()}
                        </RadioGroup>
                    </FormControl>
                }
                elseShow={
                    <p>No valid legal values available for this operator.</p>
                }
            />
            <ConditionallyRender
                condition={Boolean(error)}
                show={
                    <p
                        style={{
                            fontSize: '0.9rem',
                            color: theme.palette.error.main,
                        }}
                    >
                        {error}
                    </p>
                }
            />
        </>
    );
};
