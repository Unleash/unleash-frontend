import { useState } from 'react';
import { IConstraint } from '../../../../interfaces/strategy';
import { useStyles } from '../ConstraintAccordion.styles';
import { ConstraintAccordionEditBody } from './ConstraintAccordionEditBody/ConstraintAccordionEditBody';
import { ConstraintAccordionEditHeader } from './ConstraintAccordionEditHeader/ConstraintAccordionEditHeader';

interface IConstraintAccordionEditProps {
    constraint: IConstraint;
}

export const ConstraintAccordionEdit = ({
    constraint,
}: IConstraintAccordionEditProps) => {
    const [localConstraint, setLocalConstraint] =
        useState<IConstraint>(constraint);
    const styles = useStyles();

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

    console.log(localConstraint);

    return (
        <div style={{ boxShadow: 'none' }} className={styles.accordion}>
            <div className={styles.summary} style={{ padding: '1rem' }}>
                <ConstraintAccordionEditHeader
                    localConstraint={localConstraint}
                    setContextName={setContextName}
                    setOperator={setOperator}
                />
            </div>
            <div
                className={styles.accordionDetails}
                style={{ padding: '1rem' }}
            >
                <ConstraintAccordionEditBody
                    localConstraint={localConstraint}
                    setValues={setValues}
                />
            </div>
        </div>
    );
};
