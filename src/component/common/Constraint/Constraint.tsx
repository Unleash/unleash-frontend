import { Button } from '@material-ui/core';
import classnames from 'classnames';
import { useContext } from 'react';
import AccessContext from '../../../contexts/AccessContext';
import { IConstraint } from '../../../interfaces/strategy';
import FeatureStrategiesSeparator from '../../feature/FeatureView2/FeatureStrategies/FeatureStrategiesEnvironments/FeatureStrategiesSeparator/FeatureStrategiesSeparator';
import { UPDATE_FEATURE } from '../../providers/AccessProvider/permissions';
import ConditionallyRender from '../ConditionallyRender';
import StringTruncator from '../StringTruncator/StringTruncator';
import { useStyles } from './Constraint.styles';

interface IConstraintProps {
    constraint: IConstraint;
    className?: string;
    deleteCallback?: () => void;
    editCallback?: () => void;
}

const Constraint = ({
    constraint,
    deleteCallback,
    editCallback,
    className,
    ...rest
}: IConstraintProps) => {
    const styles = useStyles();
    const { hasAccess } = useContext(AccessContext);

    const classes = classnames(styles.constraint, {
        [styles.column]: constraint.values.length > 2,
    });

    const containerClasses = classnames(
        styles.constraint,
        styles.constraintContainer,
        {
            [styles.column]: true,
        }
    );

    const editable = deleteCallback && editCallback;

    return (
        <div className={containerClasses + ' ' + className} {...rest}>
            <div className={classes + ' ' + className} {...rest}>
                <StringTruncator text={constraint.contextName} maxWidth="125" />
                <FeatureStrategiesSeparator
                    text={constraint.operator}
                    maxWidth="none"
                />
                <span className={styles.values}>
                    {constraint.values.join(', ')}
                </span>
            </div>

            <ConditionallyRender
                condition={hasAccess(UPDATE_FEATURE) && editable}
                show={
                    <div>
                        <Button
                            className={styles.constraintBtn}
                            onClick={editCallback}
                        >
                            Edit
                        </Button>
                        <Button
                            className={styles.constraintBtn}
                            onClick={deleteCallback}
                        >
                            Delete
                        </Button>
                    </div>
                }
            />
        </div>
    );
};

export default Constraint;
