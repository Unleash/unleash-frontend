import { useCallback, useEffect, useState } from 'react';
import { Button, FormControlLabel, Switch } from '@material-ui/core';
import useUnleashContext from '../../../../../hooks/api/getters/useUnleashContext/useUnleashContext';
import { IConstraint } from '../../../../../interfaces/strategy';
import { CANCEL, SAVE } from '../ConstraintAccordionEdit';

import { IUnleashContextDefinition } from 'interfaces/context';
import { useConstraintInput } from './useConstraintInput/useConstraintInput';
import useFeatureApi from 'hooks/api/actions/useFeatureApi/useFeatureApi';
import { useParams } from 'react-router-dom';
import { IFeatureViewParams } from 'interfaces/params';
import { formatUnknownError } from 'utils/format-unknown-error';
import { ConstraintFormHeader } from './ConstraintFormHeader/ConstraintFormHeader';

interface IConstraintAccordionBody {
    localConstraint: IConstraint;
    setValues: (values: string[]) => void;
    triggerTransition: () => void;
    setValue: (value: string) => void;
    setAction: React.Dispatch<React.SetStateAction<string>>;
    setCaseInsensitive: () => void;
    setInvertedOperator: () => void;
}

const resolveContextDefinition = (
    context: any[],
    contextName: string
): IUnleashContextDefinition => {
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
    setInvertedOperator,
    setAction,
}: IConstraintAccordionBody) => {
    const { context } = useUnleashContext();
    const { projectId, featureId } = useParams<IFeatureViewParams>();
    const [contextDefinition, setContextDefinition] = useState(
        resolveContextDefinition(context, localConstraint.contextName)
    );
    const { validateConstraint } = useFeatureApi();

    const removeValue = useCallback(
        (index: number) => {
            const valueCopy = [...localConstraint.values!];
            valueCopy.splice(index, 1);

            setValues(valueCopy);
        },
        [localConstraint, setValues]
    );

    const { input, validator, setError } = useConstraintInput({
        contextDefinition,
        localConstraint,
        setValue,
        setValues,
        setCaseInsensitive,
        removeValue,
    });

    useEffect(() => {
        setError('');
    }, [localConstraint.contextName, setError]);

    useEffect(() => {
        setContextDefinition(
            resolveContextDefinition(context, localConstraint.contextName)
        );
    }, [localConstraint.contextName, context]);

    const validateConstraintValues = () => {
        if (
            Boolean(localConstraint.values?.length > 0) ||
            Boolean(localConstraint.value)
        ) {
            setError('');
            return true;
        }
        setError('You must provide a value for the constraint');
        return false;
    };

    const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const frontendValidation = validateConstraintValues() && validator();

        if (frontendValidation) {
            try {
                await validateConstraint(projectId, featureId, localConstraint);

                setError('');
                setAction(SAVE);
                triggerTransition();
                return;
            } catch (error: unknown) {
                setError(formatUnknownError(error));
            }
        }
    };

    return (
        <form onSubmit={onSubmit} style={{ width: '100%' }}>
            <div style={{ padding: '1rem' }}>
                <InvertedOperator
                    inverted={localConstraint.inverted}
                    setInvertedOperator={setInvertedOperator}
                />
                {input}
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

interface IInvertedOperatorProps {
    inverted: boolean;
    setInvertedOperator: () => void;
}

export const InvertedOperator = ({
    inverted,
    setInvertedOperator,
}: IInvertedOperatorProps) => {
    return (
        <>
            <ConstraintFormHeader>
                Should the operator be inverted?
            </ConstraintFormHeader>
            <FormControlLabel
                style={{ display: 'block' }}
                control={
                    <Switch
                        checked={inverted}
                        onChange={() => setInvertedOperator()}
                        color="primary"
                    />
                }
                label={'inverted'}
            />
        </>
    );
};
