import classNames from 'classnames';
import { useDrag } from 'react-dnd';
import {
    getFeatureStrategyIcon,
    getHumanReadbleStrategyName,
} from '../../../../../../utils/strategy-names';
import { useStyles } from './FeatureStrategyCard.styles';

interface IFeatureStrategyCardProps {
    name: string;
    description: string;
}

export const FEATURE_STRATEGIES_DRAG_TYPE = 'FEATURE_STRATEGIES_DRAG_TYPE';

const FeatureStrategyCard = ({
    name,
    description,
}: IFeatureStrategyCardProps) => {
    const styles = useStyles();

    const [{ isDragging }, drag] = useDrag({
        type: FEATURE_STRATEGIES_DRAG_TYPE,
        item: () => {
            return { name };
        },
        collect: (monitor: any) => ({
            isDragging: monitor.isDragging(),
        }),
    });

    const readableName = getHumanReadbleStrategyName(name);
    const Icon = getFeatureStrategyIcon(name);

    const classes = classNames(styles.featureStrategyCard);

    return (
        <div className={classes} ref={drag}>
            <div className={styles.leftSection}>
                <div className={styles.iconContainer}>
                    {<Icon className={styles.icon} />}
                </div>
            </div>
            <div className={styles.rightSection}>
                <p>{readableName}</p>
                <p className={styles.description}>{description}</p>
            </div>
        </div>
    );
};

export default FeatureStrategyCard;
