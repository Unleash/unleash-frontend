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
        setExpanded(true);
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
                    console.log(action);
                    if (action === 'cancel') {
                        handleCancel();
                    } else if (action === 'save') {
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
