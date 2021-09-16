import { Button } from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import { useContext } from 'react';
import FeatureStrategiesUIContext from '../../../../../../contexts/FeatureStrategiesUIContext';
import { getHumanReadbleStrategyName } from '../../../../../../utils/strategy-names';
import ConditionallyRender from '../../../../../common/ConditionallyRender';
import FeatureStrategyAccordion from '../FeatureStrategiesEnvironments/FeatureStrategiesEnvironmentList/FeatureStrategyAccordion/FeatureStrategyAccordion';
import { useStyles } from './FeatureStrategiesConfigure.styles';

const FeatureStrategiesConfigure = () => {
    const styles = useStyles();
    const { activeEnvironment, setConfigureNewStrategy } = useContext(
        FeatureStrategiesUIContext
    );
    const configurableStrategy =
        activeEnvironment.strategies[activeEnvironment.strategies.length - 1];

    const handleCancel = () => setConfigureNewStrategy(false);

    console.log(activeEnvironment);

    return (
        <div className={styles.container}>
            <h2 className={styles.header}>
                Configuring{' '}
                {getHumanReadbleStrategyName(configurableStrategy.name)} in{' '}
                {activeEnvironment.name}
            </h2>
            <ConditionallyRender
                condition={activeEnvironment.enabled}
                show={
                    <Alert severity="warning">
                        This environment is currently enabled. The strategy will
                        take effect immediately after you save your changes.
                    </Alert>
                }
            />
            <FeatureStrategyAccordion
                strategy={configurableStrategy}
                expanded
                hideActions
            />

            <div className={styles.buttonContainer}>
                <Button
                    variant="contained"
                    color="primary"
                    className={styles.btn}
                >
                    Save
                </Button>
                <Button className={styles.btn} onClick={handleCancel}>
                    Cancel
                </Button>
            </div>
        </div>
    );
};

export default FeatureStrategiesConfigure;
