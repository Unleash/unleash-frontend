import { Button } from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import { useContext, useState } from 'react';
import { getHumanReadbleStrategyName } from '../../../../../../utils/strategy-names';
import { useParams } from 'react-router-dom';
import { mutate } from 'swr';

import FeatureStrategiesUIContext from '../../../../../../contexts/FeatureStrategiesUIContext';
import ConditionallyRender from '../../../../../common/ConditionallyRender';
import FeatureStrategyAccordion from '../../FeatureStrategyAccordion/FeatureStrategyAccordion';
import FeatureStrategiesExecution from '../../FeatureStrategiesExecution/FeatureStrategiesExecution';
import useFeatureStrategyApi from '../../../../../../hooks/api/actions/useFeatureStrategyApi/useFeatureStrategyApi';
import useFeature from '../../../../../../hooks/api/getters/useFeature/useFeature';

import { useStyles } from './FeatureStrategiesConfigure.styles';

const FeatureStrategiesConfigure = () => {
    const { projectId, featureId } = useParams();

    const styles = useStyles();
    const { activeEnvironment, setConfigureNewStrategy, configureNewStrategy } =
        useContext(FeatureStrategiesUIContext);
    const [strategyParams, setStrategyParams] = useState({});
    const { addStrategyToFeature } = useFeatureStrategyApi();
    const { FEATURE_CACHE_KEY } = useFeature(projectId, featureId);

    const handleCancel = () => setConfigureNewStrategy(null);

    const handleSubmit = async () => {
        const strategyPayload = {
            ...configureNewStrategy,
            parameters: strategyParams,
        };

        try {
            await addStrategyToFeature(
                projectId,
                featureId,
                activeEnvironment.name,
                strategyPayload
            );

            mutate(FEATURE_CACHE_KEY);
            setConfigureNewStrategy(false);
        } catch {}
    };

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
                    onClick={handleSubmit}
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
