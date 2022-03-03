import {
    Accordion,
    AccordionSummary,
    AccordionDetails,
} from '@material-ui/core';
import { ExpandMore } from '@material-ui/icons';
import { IConstraint } from '../../../../interfaces/strategy';

import { ConstraintAccordionViewBody } from './ConstraintAccordionViewBody/ConstraintAccordionViewBody';
import { ConstraintAccordionViewHeader } from './ConstraintAccordionViewHeader/ConstraintAccordionViewHeader';
import { useStyles } from '../ConstraintAccordion.styles';
import { oneOf } from '../../../../utils/one-of';
import {
    dateOperators,
    numOperators,
    semVerOperators,
} from '../../../../constants/operators';
import ConditionallyRender from '../../ConditionallyRender';

interface IConstraintAccordionViewProps {
    environmentId: string;
    constraint: IConstraint;
    onDelete: () => void;
    onEdit: () => void;
    compact: boolean;
}

export const ConstraintAccordionView = ({
    compact,
    environmentId,
    constraint,
    onEdit,
    onDelete,
}: IConstraintAccordionViewProps) => {
    const styles = useStyles();

    const nonExpandable = oneOf(
        [...semVerOperators, ...numOperators, ...dateOperators],
        constraint.operator
    );

    return (
        <Accordion style={{ boxShadow: 'none' }} className={styles.accordion}>
            <AccordionSummary
                className={styles.summary}
                expandIcon={<ExpandMore />}
            >
                <ConstraintAccordionViewHeader
                    compact={compact}
                    environmentId={environmentId}
                    constraint={constraint}
                    onEdit={onEdit}
                    onDelete={onDelete}
                    nonExpandable={nonExpandable}
                />
            </AccordionSummary>
            <ConditionallyRender
                condition={true}
                show={
                    <AccordionDetails className={styles.accordionDetails}>
                        <ConstraintAccordionViewBody constraint={constraint} />
                    </AccordionDetails>
                }
            />
        </Accordion>
    );
};
