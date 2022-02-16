import {
    Accordion,
    AccordionSummary,
    AccordionDetails,
} from '@material-ui/core';
import { ExpandMore } from '@material-ui/icons';
import { IConstraint } from '../../../../interfaces/strategy';

import { useStyles } from '../ConstraintAccordion.styles';
import { ConstraintAccordionViewBody } from './ConstraintAccordionViewBody/ConstraintAccordionViewBody';
import { ConstraintAccordionViewHeader } from './ConstraintAccordionViewHeader/ConstraintAccordionViewHeader';
interface IConstraintAccordionViewProps {
    constraint: IConstraint;
    setEditMode: any;
}

export const ConstraintAccordionView = ({
    constraint,
    setEditMode,
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
                    setEditMode={setEditMode}
                />
            </AccordionSummary>
            <AccordionDetails className={styles.accordionDetails}>
                <ConstraintAccordionViewBody constraint={constraint} />
            </AccordionDetails>
        </Accordion>
    );
};
