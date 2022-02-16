import { useEffect, useState } from 'react';
import { Button } from '@material-ui/core';
import useUnleashContext from '../../../../../hooks/api/getters/useUnleashContext/useUnleashContext';
import { IConstraint } from '../../../../../interfaces/strategy';
import ConditionallyRender from '../../../ConditionallyRender';
import { FreeTextInput } from './FreeTextInput/FreeTextInput';
import { RestrictiveLegalValues } from './RestrictiveLegalValues/RestrictiveLegalValues';

interface IConstraintAccordionBody {
    localConstraint: IConstraint;
    setValues: (values: string[]) => void;
    handleSave: (constraint: IConstraint) => void;
    onCancel: () => void;
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
    onCancel,
    handleSave,
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
            contextDefinition.legalValues &&
            (localConstraint.operator === 'IN' ||
                localConstraint.operator === 'NOT_IN')
        ) {
            return (
                <RestrictiveLegalValues
                    legalValues={contextDefinition.legalValues}
                    values={localConstraint.values}
                    setValues={setValues}
                />
            );
        } else {
            return (
                <FreeTextInput
                    values={localConstraint.values}
                    removeValue={removeValue}
                    setValues={setValues}
                />
            );
        }
    };

    const validateConstraint = () => {
        if (localConstraint.values.length > 0) {
            return true;
        }
        return false;
    };

    const onSubmit = event => {
        event.preventDefault();
        const valid = validateConstraint();

        if (valid) {
            handleSave(localConstraint);
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
                        onClick={() => onCancel()}
                        style={{ marginLeft: '0.5rem', minWidth: '125px' }}
                    >
                        Cancel
                    </Button>
                </div>
            </div>
        </form>
    );
};
