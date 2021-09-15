import useStrategies from '../../../../../hooks/api/getters/useStrategies/useStrategies';
import { IStrategy } from '../../../../../interfaces/strategy';
import FeatureStrategyCard from './FeatureStrategyCard/FeatureStrategyCard';
import { useStyles } from './FeatureStrategiesList.styles';

const FeatureStrategiesList = () => {
    const styles = useStyles();

    const { strategies } = useStrategies();

    const renderStrategies = () => {
        return strategies
            .filter((strategy: IStrategy) => !strategy.deprecated)
            .map((strategy: IStrategy) => (
                <FeatureStrategyCard
                    name={strategy.name}
                    description={strategy.description}
                />
            ));
    };

    return <section className={styles.sidebar}>{renderStrategies()}</section>;
};

export default FeatureStrategiesList;
