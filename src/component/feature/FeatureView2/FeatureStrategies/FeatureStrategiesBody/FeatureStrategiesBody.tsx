import { useStyles } from './FeatureStrategiesBody.styles';
import FeatureStrategiesEnvironments from './FeatureStrategiesEnvironments/FeatureStrategiesEnvironments';

const FeatureStrategiesBody = () => {
    const styles = useStyles();
    return (
        <section className={styles.container}>
            <FeatureStrategiesEnvironments />
        </section>
    );
};

export default FeatureStrategiesBody;
