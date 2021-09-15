import { Paper } from '@material-ui/core';
import FeatureStrategiesList from './FeatureStrategiesList/FeatureStrategiesList';
import { useStyles } from './FeatureStrategies.styles';
import FeatureStrategiesBody from './FeatureStrategiesBody/FeatureStrategiesBody';

const FeatureStrategies = () => {
    const styles = useStyles();
    return (
        <Paper className={styles.container}>
            <FeatureStrategiesList />
            <FeatureStrategiesBody />
        </Paper>
    );
};

export default FeatureStrategies;
