import { IConstraint } from 'interfaces/strategy';
import { formatConstraintOperator } from 'component/common/ConstraintAccordion/ConstraintOperator/formatConstraintOperator';
import { useStyles } from 'component/common/ConstraintAccordion/ConstraintOperator/ConstraintOperator.styles';

interface IConstraintOperatorProps {
    constraint: IConstraint;
}

export const ConstraintOperator = ({
    constraint,
}: IConstraintOperatorProps) => {
    const styles = useStyles();

    const operatorName = constraint.operator;
    const operatorText = formatConstraintOperator(constraint.operator);

    const notLabel = constraint.inverted && (
        <div className={styles.not}>
            <span>NOT</span>
        </div>
    );

    return (
        <div className={styles.container}>
            {notLabel}
            <div className={styles.name}>{operatorName}</div>
            <div className={styles.text}>{operatorText}</div>
        </div>
    );
};
