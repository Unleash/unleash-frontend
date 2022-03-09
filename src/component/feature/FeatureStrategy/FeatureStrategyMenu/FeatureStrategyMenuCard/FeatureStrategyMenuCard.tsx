import { IStrategy } from 'interfaces/strategy';
import { Link } from 'react-router-dom';
import { useStyles } from './FeatureStrategyMenuCard.styles';
import {
    getFeatureStrategyIcon,
    formatStrategyName,
} from 'utils/strategy-names';
import { formatCreateStrategyPath } from '../../FeatureStrategyCreate/FeatureStrategyCreate';

interface IFeatureStrategyMenuCardProps {
    projectId: string;
    featureId: string;
    environmentId: string;
    strategy: IStrategy;
}

export const FeatureStrategyMenuCard = ({
    projectId,
    featureId,
    environmentId,
    strategy,
}: IFeatureStrategyMenuCardProps) => {
    const styles = useStyles();
    const StrategyIcon = getFeatureStrategyIcon(strategy.name);
    const strategyName = formatStrategyName(strategy.name);

    const createStrategyPath = formatCreateStrategyPath(
        projectId,
        featureId,
        environmentId,
        strategy.name
    );

    return (
        <Link to={createStrategyPath} className={styles.card}>
            <div>
                <StrategyIcon className={styles.icon} aria-hidden />
            </div>
            <div>
                <div className={styles.name}>
                    {strategy.displayName || strategyName}
                </div>
                <div className={styles.description}>{strategy.description}</div>
            </div>
        </Link>
    );
};
