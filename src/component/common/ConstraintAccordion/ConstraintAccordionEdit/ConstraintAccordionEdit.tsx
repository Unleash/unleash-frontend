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
    const styles = useStyles();

    useEffect(() => {
        setExpanded(true);
    }, []);

    const setContextName = (contextName: string) => {
        setLocalConstraint({ ...localConstraint, contextName });
    };

    const setOperator = (operator: string) => {
        setLocalConstraint({
            ...localConstraint,
            operator,
        });
    };

    const setValues = values => {
        setLocalConstraint({
            ...localConstraint,
            values,
        });
    };

    const onCancel = () => {
        setExpanded(false);
    };

    return (
        <Accordion
            style={{ boxShadow: 'none' }}
            className={styles.accordion}
            expanded={expanded}
            TransitionProps={{
                onExited: () => {
                    handleCancel();
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
                style={{ padding: '1rem' }}
            >
                <ConstraintAccordionEditBody
                    localConstraint={localConstraint}
                    setValues={setValues}
                    onCancel={onCancel}
                    handleSave={handleSave}
                />
            </AccordionDetails>
        </Accordion>
    );
};
