import { useCallback, useEffect, useState } from 'react';
import { Button } from '@material-ui/core';
import useUnleashContext from '../../../../../hooks/api/getters/useUnleashContext/useUnleashContext';
import { IConstraint } from '../../../../../interfaces/strategy';
import { CANCEL, SAVE } from '../ConstraintAccordionEdit';

import { IUnleashContextDefinition } from 'interfaces/context';
import { useConstraintInput } from './useConstraintInput/useConstraintInput';

interface IConstraintAccordionBody {
    localConstraint: IConstraint;
    setValues: (values: string[]) => void;
    triggerTransition: () => void;
    setValue: (value: string) => void;
    setAction: React.Dispatch<React.SetStateAction<string>>;
    setCaseInsensitive: () => void;
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
    setAction,
}: IConstraintAccordionBody) => {
    const { context } = useUnleashContext();
    const [contextDefinition, setContextDefinition] = useState(
        resolveContextDefinition(context, localConstraint.contextName)
    );

    const removeValue = useCallback(
        (index: number) => {
            const valueCopy = [...localConstraint.values];
            valueCopy.splice(index, 1);

            setValues(valueCopy);
        },
        [localConstraint, setValues]
    );

    const { input, validator } = useConstraintInput({
        contextDefinition,
        localConstraint,
        setValue,
        setValues,
        setCaseInsensitive,
        removeValue,
    });

    useEffect(() => {
        setContextDefinition(
            resolveContextDefinition(context, localConstraint.contextName)
        );
    }, [localConstraint.contextName, context]);

    const validateConstraint = () => {
        return (
            localConstraint.values.length > 0 || Boolean(localConstraint.value)
        );
    };

    const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const valid = validateConstraint() && validator();

        if (valid) {
            setAction(SAVE);
            triggerTransition();
            return;
        }
    };

    return (
        <form onSubmit={onSubmit} style={{ width: '100%' }}>
            <div style={{ padding: '1rem' }}>{input}</div>
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
