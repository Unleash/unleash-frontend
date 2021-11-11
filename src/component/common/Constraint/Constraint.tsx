import { IConstraint } from '../../../interfaces/strategy';
import FeatureStrategiesSeparator from '../../feature/FeatureView2/FeatureStrategies/FeatureStrategiesEnvironments/FeatureStrategiesSeparator/FeatureStrategiesSeparator';
import { useStyles } from './Constraint.styles';

interface IConstraintProps {
    constraint: IConstraint;
}

const Constraint = ({ constraint }: IConstraintProps) => {
    const styles = useStyles();
    return (
        <div className={styles.constraint}>
            <span className={styles.contextName}>{constraint.contextName}</span>
            <FeatureStrategiesSeparator
                text={constraint.operator}
                maxWidth="none"
            />
            <span className={styles.values}>
                {constraint.values.join(', ')}
            </span>
        </div>
    );
};

export default Constraint;
