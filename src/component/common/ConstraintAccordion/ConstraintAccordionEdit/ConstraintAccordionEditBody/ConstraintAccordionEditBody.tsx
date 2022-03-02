import { useCallback, useEffect, useState } from 'react';
import {
    AccordionDetails,
    AccordionSummary,
    Button,
    FormControlLabel,
    Switch,
} from '@material-ui/core';
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
import { useStyles } from '../../ConstraintAccordion.styles';
import { ConstraintAccordionEditHeader } from '../ConstraintAccordionEditHeader/ConstraintAccordionEditHeader';

interface IConstraintAccordionBody {
    localConstraint: IConstraint;
    setValues: (values: string[]) => void;
    triggerTransition: () => void;
    setValue: (value: string) => void;
    setAction: React.Dispatch<React.SetStateAction<string>>;
    setCaseInsensitive: () => void;
    setInvertedOperator: () => void;
    input: JSX.Element;
}

export const ConstraintAccordionEditBody = ({
    localConstraint,
    input,
    triggerTransition,
    setInvertedOperator,
    setAction,
}: IConstraintAccordionBody) => {
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

    return (
        <>
            <div style={{ padding: '1rem' }}>
                <InvertedOperator
                    inverted={Boolean(localConstraint.inverted)}
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
                        style={{
                            marginRight: '0.5rem',
                            minWidth: '125px',
                        }}
                    >
                        Save
                    </Button>
                    <Button
                        onClick={() => {
                            setAction(CANCEL);
                            triggerTransition();
                        }}
                        style={{
                            marginLeft: '0.5rem',
                            minWidth: '125px',
                        }}
                    >
                        Cancel
                    </Button>
                </div>
            </div>
        </>
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
