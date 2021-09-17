import { Button } from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import { useContext, useState } from 'react';
import FeatureStrategiesUIContext from '../../../../../contexts/FeatureStrategiesUIContext';
import { getHumanReadbleStrategyName } from '../../../../../utils/strategy-names';
import ConditionallyRender from '../../../../common/ConditionallyRender';
import FeatureStrategyAccordion from '../FeatureStrategyAccordion/FeatureStrategyAccordion';
import { useStyles } from './FeatureStrategiesConfigure.styles';
import cloneDeep from 'lodash.clonedeep';
import FeatureStrategiesExecution from '../FeatureStrategiesExecution/FeatureStrategiesExecution';

const FeatureStrategiesConfigure = () => {
    const styles = useStyles();
    const { activeEnvironment, setConfigureNewStrategy, configureNewStrategy } =
        useContext(FeatureStrategiesUIContext);
    const [strategyParams, setStrategyParams] = useState({});

    const handleCancel = () => setConfigureNewStrategy(null);

    console.log(strategyParams);

    return (
        <div className={styles.container}>
            <h2 className={styles.header}>
                Configuring{' '}
                {getHumanReadbleStrategyName(configureNewStrategy.name)} in{' '}
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
                elseShow={
                    <Alert severity="warning">
                        This environment is currently disabled. The strategy
                        will not take effect before you enable the environment
                        on the feature toggle.
                    </Alert>
                }
            />

            <div className={styles.configureContainer}>
                <div className={styles.accordionContainer}>
                    <FeatureStrategyAccordion
                        strategy={configureNewStrategy}
                        expanded
                        hideActions
                        setStrategyParams={setStrategyParams}
                    />
                </div>
                <div className={styles.executionContainer}>
                    <FeatureStrategiesExecution {...strategyParams} />
                </div>
            </div>

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
