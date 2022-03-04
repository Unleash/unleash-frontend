import { Delete, Edit } from '@material-ui/icons';
import classnames from 'classnames';
import { useParams } from 'react-router';
import { IFeatureViewParams } from '../../../interfaces/params';
import { IConstraint } from '../../../interfaces/strategy';
import { StrategySeparator } from '../StrategySeparator/StrategySeparator';
import { UPDATE_FEATURE } from '../../providers/AccessProvider/permissions';
import ConditionallyRender from '../ConditionallyRender';
import PermissionIconButton from '../PermissionIconButton/PermissionIconButton';
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
    const { projectId } = useParams<IFeatureViewParams>();

    const classes = classnames(styles.constraint, {
        [styles.column]: constraint.values.length > 2,
    });

    const editable = !!(deleteCallback && editCallback);

    return (
        <div className={classes + ' ' + className} {...rest}>
            <div className={classes + ' ' + className} {...rest}>
                <StringTruncator text={constraint.contextName} maxWidth="125" />
                <StrategySeparator text={constraint.operator} maxWidth="none" />
                <span className={styles.values}>
                    {constraint.values.join(', ')}
                </span>
            </div>

            <ConditionallyRender
                condition={editable}
                show={
                    <div className={styles.btnContainer}>
                        <PermissionIconButton
                            onClick={editCallback}
                            permission={UPDATE_FEATURE}
                            projectId={projectId}
                        >
                            <Edit />
                        </PermissionIconButton>

                        <PermissionIconButton
                            onClick={deleteCallback}
                            permission={UPDATE_FEATURE}
                            projectId={projectId}
                        >
                            <Delete />
                        </PermissionIconButton>
                    </div>
                }
            />
        </div>
    );
};

export default Constraint;
