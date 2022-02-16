import { Chip } from '@material-ui/core';

import { IConstraint } from '../../../../../interfaces/strategy';
import { useStyles } from '../../ConstraintAccordion.styles';

interface IConstraintAccordionViewBodyProps {
    constraint: IConstraint;
}

export const ConstraintAccordionViewBody = ({
    constraint,
}: IConstraintAccordionViewBodyProps) => {
    const styles = useStyles();

    const renderConstraintValues = () => {
        return constraint.values.map(value => (
            <Chip key={value} label={value} className={styles.chip} />
        ));
    };

    return (
        <div className={styles.valuesContainer}>{renderConstraintValues()}</div>
    );
};
