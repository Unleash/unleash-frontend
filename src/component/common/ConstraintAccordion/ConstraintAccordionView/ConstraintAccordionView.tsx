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

interface IConstraintAccordionViewProps {
    constraint: IConstraint;
    setEditMode: any;
}

export const ConstraintAccordionView = ({
    constraint,
    handleEdit,
    handleDelete,
}: IConstraintAccordionViewProps) => {
    const styles = useStyles();
    return (
        <Accordion style={{ boxShadow: 'none' }} className={styles.accordion}>
            <AccordionSummary
                className={styles.summary}
                expandIcon={<ExpandMore />}
            >
                <ConstraintAccordionViewHeader
                    constraint={constraint}
                    handleEdit={handleEdit}
                    handleDelete={handleDelete}
                />
            </AccordionSummary>
            <AccordionDetails className={styles.accordionDetails}>
                <ConstraintAccordionViewBody constraint={constraint} />
            </AccordionDetails>
        </Accordion>
    );
};
