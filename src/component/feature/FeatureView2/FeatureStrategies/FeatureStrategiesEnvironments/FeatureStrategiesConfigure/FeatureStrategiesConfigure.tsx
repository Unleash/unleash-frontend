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
import FeatureStrategiesProductionGuard from '../FeatureStrategiesProductionGuard/FeatureStrategiesProductionGuard';
import { IToast } from '../../../../../../hooks/useToast';
import { IFeatureViewParams } from '../../../../../../interfaces/params';
import cloneDeep from 'lodash.clonedeep';
interface IFeatureStrategiesConfigure {
    setToastData: React.Dispatch<React.SetStateAction<IToastType>>;
}
const FeatureStrategiesConfigure = ({
    setToastData,
}: IFeatureStrategiesConfigure) => {
    const { projectId, featureId } = useParams<IFeatureViewParams>();
    const [productionGuard, setProductionGuard] = useState(false);

    const styles = useStyles();
    const {
        activeEnvironment,
        setConfigureNewStrategy,
        configureNewStrategy,
        setExpandedSidebar,
        featureCache,
        setFeatureCache,
    } = useContext(FeatureStrategiesUIContext);
    const [strategyConstraints, setStrategyConstraints] = useState([]);
    const [strategyParams, setStrategyParams] = useState({});
    const { addStrategyToFeature } = useFeatureStrategyApi();
    const { FEATURE_CACHE_KEY } = useFeature(projectId, featureId);

    const handleCancel = () => {
        setConfigureNewStrategy(null);
        setExpandedSidebar(true);
    };

    const resolveSubmit = () => {
        if (activeEnvironment.type === 'production') {
            setProductionGuard(true);
            return;
        }
        handleSubmit();
    };

    const handleSubmit = async () => {
        const strategyPayload = {
            ...configureNewStrategy,
            constraints: strategyConstraints,
            parameters: strategyParams,
        };

        try {
            const res = await addStrategyToFeature(
                projectId,
                featureId,
                activeEnvironment.name,
                strategyPayload
            );
            const strategy = await res.json();

            const feature = cloneDeep(featureCache);
            const environment = feature.environments.find(
                env => env.name === activeEnvironment.name
            );

            environment.strategies.push(strategy);
            setFeatureCache(feature);

            setConfigureNewStrategy(null);
            setExpandedSidebar(false);
            setToastData({
                show: true,
                type: 'success',
                text: 'Successfully added strategy.',
            });
        } catch (e) {
            setToastData({
                show: true,
                type: 'error',
                text: e.toString(),
            });
        }
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
                    <Alert severity="warning" className={styles.envWarning}>
                        This environment is currently enabled. The strategy will
                        take effect immediately after you save your changes.
                    </Alert>
                }
                elseShow={
                    <Alert severity="warning" className={styles.envWarning}>
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
                        setStrategyConstraints={setStrategyConstraints}
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
                    onClick={resolveSubmit}
                >
                    Save
                </Button>
                <Button className={styles.btn} onClick={handleCancel}>
                    Cancel
                </Button>
            </div>
            <FeatureStrategiesProductionGuard
                primaryButtonText="Save changes"
                show={productionGuard}
                onClick={() => {
                    handleSubmit();
                    setProductionGuard(false);
                }}
                onClose={() => setProductionGuard(false)}
            />
        </div>
    );
};

export default FeatureStrategiesConfigure;
