import { useContext } from 'react';
import FeatureStrategiesUIContext from '../../../../../contexts/FeatureStrategiesUIContext';
import ConditionallyRender from '../../../../common/ConditionallyRender';
import { useStyles } from './FeatureStrategiesBody.styles';
import FeatureStrategiesConfigure from './FeatureStrategiesConfigure/FeatureStrategiesConfigure';
import FeatureStrategiesEnvironments from './FeatureStrategiesEnvironments/FeatureStrategiesEnvironments';

const FeatureStrategiesBody = () => {
    const { configureNewStrategy } = useContext(FeatureStrategiesUIContext);

    const styles = useStyles();
    return (
        <section className={styles.container}>
            <ConditionallyRender
                condition={!configureNewStrategy}
                show={<FeatureStrategiesEnvironments />}
                elseShow={<FeatureStrategiesConfigure />}
            />
        </section>
    );
};

export default FeatureStrategiesBody;
