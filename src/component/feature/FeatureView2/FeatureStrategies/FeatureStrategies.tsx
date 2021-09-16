import { Paper } from '@material-ui/core';
import FeatureStrategiesList from './FeatureStrategiesList/FeatureStrategiesList';
import { useStyles } from './FeatureStrategies.styles';
import FeatureStrategiesBody from './FeatureStrategiesBody/FeatureStrategiesBody';
import FeatureStrategiesUIProvider from './FeatureStrategiesUIProvider';

const FeatureStrategies = () => {
    const styles = useStyles();
    return (
        <Paper className={styles.container}>
            <FeatureStrategiesUIProvider>
                <FeatureStrategiesList />
                <FeatureStrategiesBody />
            </FeatureStrategiesUIProvider>
        </Paper>
    );
};

export default FeatureStrategies;
