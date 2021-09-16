import useStrategies from '../../../../../hooks/api/getters/useStrategies/useStrategies';
import { IStrategy } from '../../../../../interfaces/strategy';
import FeatureStrategyCard from './FeatureStrategyCard/FeatureStrategyCard';
import { useStyles } from './FeatureStrategiesList.styles';
import { useContext } from 'react';
import FeatureStrategiesUIContext from '../../../../../contexts/FeatureStrategiesUIContext';
import classnames from 'classnames';

const FeatureStrategiesList = () => {
    const { configureNewStrategy } = useContext(FeatureStrategiesUIContext);
    const styles = useStyles();

    const { strategies } = useStrategies();

    console.log('CONFIGURING NEW STRATEGY', configureNewStrategy);

    const renderStrategies = () => {
        return strategies
            .filter((strategy: IStrategy) => !strategy.deprecated)
            .map((strategy: IStrategy) => (
                <FeatureStrategyCard
                    configureNewStrategy={configureNewStrategy}
                    name={strategy.name}
                    description={strategy.description}
                />
            ));
    };

    const classes = classnames(styles.sidebar, {
        [styles.sidebarSmall]: configureNewStrategy,
    });

    return <section className={classes}>{renderStrategies()}</section>;
};

export default FeatureStrategiesList;
