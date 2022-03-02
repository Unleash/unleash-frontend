import {
    inOperators,
    stringOperators,
    numOperators,
    semVerOperators,
    dateOperators,
} from 'constants/operators';
import { IUnleashContextDefinition } from 'interfaces/context';
import { IConstraint } from 'interfaces/strategy';
import React, { useCallback, useEffect, useState } from 'react';
import { exists } from 'utils/exists';
import { oneOf } from 'utils/one-of';
import { CaseInsensitive } from '../CaseInsensitive/CaseInsensitive';
import { DateSingleValue } from '../DateSingleValue/DateSingleValue';
import { FreeTextInput } from '../FreeTextInput/FreeTextInput';
import { RestrictiveLegalValues } from '../RestrictiveLegalValues/RestrictiveLegalValues';
import { SingleLegalValue } from '../SingleLegalValue/SingleLegalValue';
import { SingleValue } from '../SingleValue/SingleValue';
import {
    numberValidatorGenerator,
    stringValidatorGenerator,
    semVerValidatorGenerator,
    dateValidatorGenerator,
} from './constraintValidators';

interface IUseConstraintInputProps {
    contextDefinition: IUnleashContextDefinition;
    localConstraint: IConstraint;
    setValue: (value: string) => void;
    setValues: (values: string[]) => void;
    setCaseInsensitive: () => void;
    removeValue: (index: number) => void;
}

interface IUseConstraintOutput {
    input: JSX.Element;
    validator: () => void;
    setError: React.Dispatch<React.SetStateAction<string>>;
}

export const useConstraintInput = ({
    contextDefinition,
    localConstraint,
    setValue,
    setValues,
    setCaseInsensitive,
    removeValue,
}: IUseConstraintInputProps): IUseConstraintOutput => {
    const [input, setInput] = useState<JSX.Element>(<></>);
    const [validator, setValidator] = useState(() => {
        return () => false;
    });
    const [error, setError] = useState('');

    const resolveInputType = useCallback(() => {
        if (
            exists(contextDefinition.legalValues) &&
            oneOf(inOperators, localConstraint.operator)
        ) {
            setInput(
                <RestrictiveLegalValues
                    legalValues={contextDefinition.legalValues || []}
                    values={localConstraint.values || []}
                    setValues={setValues}
                    error={error}
                />
            );
        } else if (
            exists(contextDefinition.legalValues) &&
            oneOf(stringOperators, localConstraint.operator)
        ) {
            setInput(
                <>
                    <CaseInsensitive
                        setCaseInsensitive={setCaseInsensitive}
                        caseInsensitive={Boolean(
                            localConstraint.caseInsensitive
                        )}
                    />
                    <RestrictiveLegalValues
                        legalValues={contextDefinition.legalValues || []}
                        values={localConstraint.values || []}
                        setValues={setValues}
                        error={error}
                    />
                </>
            );
        } else if (
            exists(contextDefinition.legalValues) &&
            oneOf(numOperators, localConstraint.operator)
        ) {
            setInput(
                <>
                    <SingleLegalValue
                        setValue={setValue}
                        value={localConstraint.value}
                        type="number"
                        legalValues={
                            contextDefinition.legalValues?.filter(
                                (value: string) => Number(value)
                            ) || []
                        }
                        error={error}
                    />
                </>
            );
        } else if (
            exists(contextDefinition.legalValues) &&
            oneOf(semVerOperators, localConstraint.operator)
        ) {
            setInput(
                <>
                    <SingleLegalValue
                        setValue={setValue}
                        value={localConstraint.value}
                        type="semver"
                        legalValues={contextDefinition.legalValues || []}
                        error={error}
                    />
                </>
            );
        } else if (oneOf(dateOperators, localConstraint.operator)) {
            setInput(
                <DateSingleValue
                    value={localConstraint.value}
                    setValue={setValue}
                    error={error}
                />
            );
        } else if (oneOf(inOperators, localConstraint.operator)) {
            setInput(
                <FreeTextInput
                    values={localConstraint.values || []}
                    removeValue={removeValue}
                    setValues={setValues}
                    error={error}
                    setError={setError}
                />
            );
        } else if (oneOf(stringOperators, localConstraint.operator)) {
            setInput(
                <>
                    {' '}
                    <CaseInsensitive
                        setCaseInsensitive={setCaseInsensitive}
                        caseInsensitive={Boolean(
                            localConstraint.caseInsensitive
                        )}
                    />
                    <FreeTextInput
                        values={localConstraint.values || []}
                        removeValue={removeValue}
                        setValues={setValues}
                        error={error}
                        setError={setError}
                    />
                </>
            );
        } else if (oneOf(numOperators, localConstraint.operator)) {
            setInput(
                <SingleValue
                    setValue={setValue}
                    value={localConstraint.value}
                    type="number"
                    error={error}
                />
            );
        } else if (oneOf(semVerOperators, localConstraint.operator)) {
            setInput(
                <SingleValue
                    setValue={setValue}
                    value={localConstraint.value}
                    type="semver"
                    error={error}
                />
            );
        }
    }, [
        setValue,
        setValues,
        localConstraint,
        contextDefinition,
        setCaseInsensitive,
        removeValue,
        error,
    ]);

    const resolveValidator = useCallback(
        (operator: string) => {
            if (oneOf(numOperators, operator)) {
                setValidator(() =>
                    numberValidatorGenerator(localConstraint.value, setError)
                );
            }

            if (oneOf([...stringOperators, ...inOperators], operator)) {
                setValidator(() =>
                    stringValidatorGenerator(
                        localConstraint.values || [],
                        setError
                    )
                );
            }

            if (oneOf(semVerOperators, operator)) {
                setValidator(() =>
                    semVerValidatorGenerator(
                        localConstraint.value || '',
                        setError
                    )
                );
            }

            if (oneOf(dateOperators, operator)) {
                setValidator(() =>
                    dateValidatorGenerator(
                        localConstraint.value || '',
                        setError
                    )
                );
            }
        },
        [setValidator, localConstraint.value, localConstraint.values]
    );

    useEffect(() => {
        resolveValidator(localConstraint.operator);
    }, [
        localConstraint.operator,
        localConstraint.value,
        localConstraint.values,
        resolveValidator,
    ]);

    useEffect(() => {
        resolveInputType();
    }, [contextDefinition, localConstraint, resolveInputType]);

    return { input, validator, setError };
};
