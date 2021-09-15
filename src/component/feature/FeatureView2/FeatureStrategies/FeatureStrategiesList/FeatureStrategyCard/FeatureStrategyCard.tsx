import {
    getFeatureStrategyIcon,
    getHumanReadbleStrategyName,
} from '../../../../../../utils/strategy-names';
import { useStyles } from './FeatureStrategyCard.styles';

interface IFeatureStrategyCardProps {
    name: string;
    description: string;
}

const FeatureStrategyCard = ({
    name,
    description,
}: IFeatureStrategyCardProps) => {
    const styles = useStyles();

    const readableName = getHumanReadbleStrategyName(name);
    const Icon = getFeatureStrategyIcon(name);

    return (
        <div className={styles.featureStrategyCard}>
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
