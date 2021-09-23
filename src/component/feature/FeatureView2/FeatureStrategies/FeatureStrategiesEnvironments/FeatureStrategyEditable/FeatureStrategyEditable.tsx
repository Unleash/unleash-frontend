import { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { mutate } from 'swr';
import FeatureStrategiesUIContext from '../../../../../../contexts/FeatureStrategiesUIContext';
import useFeatureStrategy from '../../../../../../hooks/api/getters/useFeatureStrategy/useFeatureStrategy';
import { IFeatureViewParams } from '../../../../../../interfaces/params';
import {
    IConstraint,
    IParameter,
    IStrategy,
} from '../../../../../../interfaces/strategy';
import FeatureStrategyAccordion from '../../FeatureStrategyAccordion/FeatureStrategyAccordion';
import cloneDeep from 'lodash.clonedeep';
import { Button } from '@material-ui/core';
import ConditionallyRender from '../../../../../common/ConditionallyRender';
import { useStyles } from './FeatureStrategyEditable.styles';

interface IFeatureStrategyEditable {
    currentStrategy: IStrategy;
}

const FeatureStrategyEditable = ({
    currentStrategy,
    updateStrategy,
}: IFeatureStrategyEditable) => {
    const { projectId, featureId } = useParams<IFeatureViewParams>();
    const {
        activeEnvironment,
        featureCache,
        resetParams,
        setResetParams,
        dirty,
        setDirty,
    } = useContext(FeatureStrategiesUIContext);
    const [strategyCache, setStrategyCache] = useState<IStrategy | null>(null);
    const styles = useStyles();

    const { strategy, FEATURE_STRATEGY_CACHE_KEY } = useFeatureStrategy(
        projectId,
        featureId,
        activeEnvironment.name,
        currentStrategy.id,
        {
            revalidateOnMount: false,
            revalidateOnReconnect: false,
            revalidateIfStale: false,
            revalidateOnFocus: false,
        }
    );

    const setStrategyParams = (parameters: IParameter) => {
        const updatedStrategy = { ...strategy };
        updatedStrategy.parameters = parameters;
        mutate(FEATURE_STRATEGY_CACHE_KEY, { ...updatedStrategy }, false);

        const dirtyParams = isDirtyParams();
        setDirty(prev => ({ ...prev, [strategy.id]: dirtyParams }));
    };

    const updateFeatureStrategy = () => {
        updateStrategy(strategy);
        setStrategyCache(cloneDeep(strategy));
        setDirty(prev => ({ ...prev, [strategy.id]: false }));
    };

    useEffect(() => {
        const dirtyStrategy = dirty[strategy.id];
        if (dirtyStrategy) return;

        mutate(FEATURE_STRATEGY_CACHE_KEY, { ...currentStrategy }, false);
        setStrategyCache(cloneDeep(currentStrategy));
        setResetParams({ reset: false });
    }, [featureCache]);

    const isDirtyParams = () => {
        let dirty = false;
        const parameters = strategy?.parameters;
        const initialParams = strategyCache?.parameters;

        if (!initialParams || !parameters) return dirty;

        const keys = Object.keys(initialParams);

        keys.forEach(key => {
            const old = initialParams[key];
            const current = parameters[key];

            if (old !== current) {
                dirty = true;
            }
        });

        return dirty;
    };

    const discardChanges = () => {
        mutate(FEATURE_STRATEGY_CACHE_KEY, { ...strategyCache }, false);
        setDirty(prev => ({ ...prev, [strategy.id]: false }));
    };

    const setStrategyConstraints = (constraints: IConstraint[]) => {
        const updatedStrategy = { ...strategy };
        updatedStrategy.constraints = constraints;
        mutate(FEATURE_STRATEGY_CACHE_KEY, { ...updatedStrategy }, false);
        setDirty(prev => ({ ...prev, [strategy.id]: true }));
    };

    if (!strategy.id) return null;
    const { parameters, constraints } = strategy;

    return (
        <FeatureStrategyAccordion
            parameters={parameters}
            constraints={constraints}
            strategy={strategy}
            setStrategyParams={setStrategyParams}
            setStrategyConstraints={setStrategyConstraints}
            dirty={dirty[strategy.id]}
        >
            <ConditionallyRender
                condition={dirty[strategy.id]}
                show={
                    <>
                        <div className={styles.unsaved}>Unsaved changes</div>
                        <div className={styles.buttonContainer}>
                            <Button
                                variant="contained"
                                color="primary"
                                style={{ marginRight: '1rem' }}
                                onClick={updateFeatureStrategy}
                            >
                                Save changes
                            </Button>
                            <Button onClick={discardChanges}>
                                Discard changes
                            </Button>
                        </div>
                    </>
                }
            />
        </FeatureStrategyAccordion>
    );
};

export default FeatureStrategyEditable;
