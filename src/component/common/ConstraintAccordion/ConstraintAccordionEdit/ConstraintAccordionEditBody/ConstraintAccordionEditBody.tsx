import { useEffect, useState } from 'react';
import { Button } from '@material-ui/core';
import useUnleashContext from '../../../../../hooks/api/getters/useUnleashContext/useUnleashContext';
import { IConstraint } from '../../../../../interfaces/strategy';
import ConditionallyRender from '../../../ConditionallyRender';
import { FreeTextInput } from './FreeTextInput/FreeTextInput';
import { RestrictiveLegalValues } from './RestrictiveLegalValues/RestrictiveLegalValues';
import { CANCEL, SAVE } from '../ConstraintAccordionEdit';
import {
    numOperators,
    semVerOperators,
    inOperators,
    stringOperators,
    dateOperators,
} from '../../../../../constants/operators';
import { oneOf } from '../../../../../utils/one-of';
import { exists } from '../../../../../utils/exists';
import { CaseInsensitive } from './CaseInsensitive/CaseInsensitive';
import { SingleValue } from './SingleValue/SingleValue';
import { SingleLegalValue } from './SingleLegalValue/SingleLegalValue';
import { number } from 'prop-types';
import { DateSingleValue } from './DateSingleValue/DateSingleValue';

interface IConstraintAccordionBody {
    localConstraint: IConstraint;
    setValues: (values: string[]) => void;
    triggerTransition: () => void;
    setValue: (value: string) => void;
    setAction: React.Dispatch<React.SetStateAction<string>>;
    setCaseInsensitive: () => void;
}

const resolveContextDefinition = (context: any[], contextName: string) => {
    const definition = context.find(
        contextDef => contextDef.name === contextName
    );
    return definition;
};

export const ConstraintAccordionEditBody = ({
    localConstraint,
    setValues,
    setValue,
    triggerTransition,
    setCaseInsensitive,
    setAction,
}: IConstraintAccordionBody) => {
    const [error, setError] = useState('');
    const { context } = useUnleashContext();
    const [contextDefinition, setContextDefinition] = useState(
        resolveContextDefinition(context, localConstraint.contextName)
    );

    useEffect(() => {
        setContextDefinition(
            resolveContextDefinition(context, localConstraint.contextName)
        );
    }, [localConstraint.contextName, context]);

    const removeValue = (index: number) => {
        const valueCopy = [...localConstraint.values];
        valueCopy.splice(index, 1);

        setValues(valueCopy);
    };

    const resolveInputType = () => {
        if (
            exists(contextDefinition.legalValues) &&
            oneOf(inOperators, localConstraint.operator)
        ) {
            return (
                <RestrictiveLegalValues
                    legalValues={contextDefinition.legalValues}
                    values={localConstraint.values}
                    setValues={setValues}
                />
            );
        } else if (
            exists(contextDefinition.legalValues) &&
            oneOf(stringOperators, localConstraint.operator)
        ) {
            return (
                <>
                    <CaseInsensitive
                        setCaseInsensitive={setCaseInsensitive}
                        caseInsensitive={Boolean(
                            localConstraint.caseInsensitive
                        )}
                    />
                    <RestrictiveLegalValues
                        legalValues={contextDefinition.legalValues}
                        values={localConstraint.values}
                        setValues={setValues}
                    />
                </>
            );
        } else if (
            exists(contextDefinition.legalValues) &&
            oneOf(numOperators, localConstraint.operator)
        ) {
            return (
                <>
                    <SingleLegalValue
                        setValue={setValue}
                        value={localConstraint.value}
                        type="number"
                        legalValues={contextDefinition.legalValues.filter(
                            (value: string) => Number(value)
                        )}
                    />
                </>
            );
        } else if (
            exists(contextDefinition.legalValues) &&
            oneOf(semVerOperators, localConstraint.operator)
        ) {
            return (
                <>
                    <SingleLegalValue
                        setValue={setValue}
                        value={localConstraint.value}
                        type="semver"
                        legalValues={contextDefinition.legalValues}
                    />
                </>
            );
        } else if (oneOf(dateOperators, localConstraint.operator)) {
            return (
                <DateSingleValue
                    value={localConstraint.value}
                    setValue={setValue}
                />
            );
        } else if (oneOf(inOperators, localConstraint.operator)) {
            return (
                <FreeTextInput
                    values={localConstraint.values}
                    removeValue={removeValue}
                    setValues={setValues}
                />
            );
        } else if (oneOf(stringOperators, localConstraint.operator)) {
            return (
                <>
                    {' '}
                    <CaseInsensitive
                        setCaseInsensitive={setCaseInsensitive}
                        caseInsensitive={Boolean(
                            localConstraint.caseInsensitive
                        )}
                    />
                    <FreeTextInput
                        values={localConstraint.values}
                        removeValue={removeValue}
                        setValues={setValues}
                    />
                </>
            );
        } else if (oneOf(numOperators, localConstraint.operator)) {
            return (
                <SingleValue
                    setValue={setValue}
                    value={localConstraint.value}
                    type="number"
                />
            );
        } else if (oneOf(semVerOperators, localConstraint.operator)) {
            return (
                <SingleValue
                    setValue={setValue}
                    value={localConstraint.value}
                    type="semver"
                />
            );
        }
    };

    const validateConstraint = () => {
        return (
            localConstraint.values.length > 0 || Boolean(localConstraint.value)
        );
    };

    const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const valid = validateConstraint();

        if (valid) {
            setAction(SAVE);
            triggerTransition();
            return;
        }
        setError('You must choose at least one value in order to save.');
    };

    return (
        <form onSubmit={onSubmit} style={{ width: '100%' }}>
            <div style={{ padding: '1rem' }}>
                {resolveInputType()}
                <ConditionallyRender
                    condition={Boolean(error)}
                    show={<p style={{ color: 'red' }}>{error}</p>}
                />
            </div>
            <div
                style={{
                    display: 'flex',
                    alignItems: 'center',
                    marginTop: '1rem',
                    borderTop: '1px solid #e0e0e0',
                    width: '100%',
                    padding: '1rem',
                }}
            >
                <div style={{ marginLeft: 'auto' }}>
                    <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        style={{ marginRight: '0.5rem', minWidth: '125px' }}
                    >
                        Save
                    </Button>
                    <Button
                        onClick={() => {
                            setAction(CANCEL);
                            triggerTransition();
                        }}
                        style={{ marginLeft: '0.5rem', minWidth: '125px' }}
                    >
                        Cancel
                    </Button>
                </div>
            </div>
        </form>
    );
};
