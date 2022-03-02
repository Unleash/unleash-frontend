import { useCallback, useEffect, useState } from 'react';
import { IConstraint } from '../../../../interfaces/strategy';
import { useStyles } from '../ConstraintAccordion.styles';
import { ConstraintAccordionEditBody } from './ConstraintAccordionEditBody/ConstraintAccordionEditBody';
import { ConstraintAccordionEditHeader } from './ConstraintAccordionEditHeader/ConstraintAccordionEditHeader';
import cloneDeep from 'lodash.clonedeep';
import {
    Accordion,
    AccordionDetails,
    AccordionSummary,
} from '@material-ui/core';
import { cleanConstraint } from 'utils/cleanConstraint';
interface IConstraintAccordionEditProps {
    constraint: IConstraint;
    handleCancel: () => void;
    handleSave: (constraint: IConstraint) => void;
}

export const CANCEL = 'cancel';
export const SAVE = 'save';

export const ConstraintAccordionEdit = ({
    constraint,
    handleCancel,
    handleSave,
}: IConstraintAccordionEditProps) => {
    const [localConstraint, setLocalConstraint] = useState<IConstraint>(
        cleanConstraint(cloneDeep(constraint))
    );
    const [expanded, setExpanded] = useState(false);
    const [action, setAction] = useState('');
    const styles = useStyles();

    useEffect(() => {
        // Setting expanded to true on mount will cause the accordion
        // animation to take effect and transition the expanded accordion in
        setExpanded(true);
    }, []);

    useEffect(() => {
        setLocalConstraint(localConstraint => cleanConstraint(localConstraint));
    }, [localConstraint.operator, localConstraint.contextName]);

    const setContextName = (contextName: string) => {
        setLocalConstraint(prev => ({
            ...prev,
            contextName,
            values: [],
            value: '',
        }));
    };

    const setOperator = useCallback((operator: string) => {
        setLocalConstraint(prev => ({
            ...prev,
            operator,
            values: [],
            value: '',
        }));
    }, []);

    const setValues = (values: string[]) => {
        setLocalConstraint(prev => ({
            ...prev,
            values,
        }));
    };

    const setValue = (value: string) => {
        setLocalConstraint(prev => ({ ...prev, value }));
    };

    const setInvertedOperator = () => {
        setLocalConstraint(prev => ({ ...prev, inverted: !prev.inverted }));
    };

    const setCaseInsensitive = () => {
        setLocalConstraint(prev => ({
            ...prev,
            caseInsensitive: !prev.caseInsensitive,
        }));
    };

    const triggerTransition = () => {
        setExpanded(false);
    };

    return (
        <Accordion
            style={{ boxShadow: 'none' }}
            className={styles.accordion}
            expanded={expanded}
            TransitionProps={{
                onExited: () => {
                    if (action === CANCEL) {
                        handleCancel();
                    } else if (action === SAVE) {
                        handleSave(localConstraint);
                    }
                },
            }}
        >
            <AccordionSummary className={styles.summary}>
                <ConstraintAccordionEditHeader
                    localConstraint={localConstraint}
                    setContextName={setContextName}
                    setOperator={setOperator}
                    action={action}
                />
            </AccordionSummary>
            <AccordionDetails
                className={styles.accordionDetails}
                style={{ padding: '0' }}
            >
                <ConstraintAccordionEditBody
                    localConstraint={localConstraint}
                    setValues={setValues}
                    setValue={setValue}
                    setCaseInsensitive={setCaseInsensitive}
                    triggerTransition={triggerTransition}
                    setAction={setAction}
                    setInvertedOperator={setInvertedOperator}
                />
            </AccordionDetails>
        </Accordion>
    );
};
