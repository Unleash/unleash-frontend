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
    handleDelete: () => void;
    handleEdit: () => void;
}

export const ConstraintAccordionView = ({
    environmentId,
    constraint,
    handleEdit,
    handleDelete,
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
                    environmentId={environmentId}
                    constraint={constraint}
                    handleEdit={handleEdit}
                    handleDelete={handleDelete}
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
