import { useEffect, useState } from 'react';
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
        cloneDeep(constraint)
    );
    const [expanded, setExpanded] = useState(false);
    const [action, setAction] = useState('');
    const styles = useStyles();

    useEffect(() => {
        // Setting expanded to true on mount will cause the accordion
        // animation to take effect and transition the expanded accordion in
        triggerTransition();
    }, []);

    const setContextName = (contextName: string) => {
        setLocalConstraint(prev => ({ ...prev, contextName, values: [] }));
    };

    const setOperator = (operator: string) => {
        setLocalConstraint(prev => ({
            ...prev,
            operator,
        }));
    };

    const setValues = (values: string[]) => {
        setLocalConstraint(prev => ({
            ...prev,
            values,
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
                    triggerTransition={triggerTransition}
                    setAction={setAction}
                />
            </AccordionDetails>
        </Accordion>
    );
};
