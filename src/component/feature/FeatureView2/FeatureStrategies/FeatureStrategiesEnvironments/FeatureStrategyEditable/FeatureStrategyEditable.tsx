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
import { Button, IconButton, Tooltip } from '@material-ui/core';
import ConditionallyRender from '../../../../../common/ConditionallyRender';
import { useStyles } from './FeatureStrategyEditable.styles';
import { Delete, FileCopy } from '@material-ui/icons';

interface IFeatureStrategyEditable {
    currentStrategy: IStrategy;
    setDelDialog?: React.Dispatch<React.SetStateAction<any>>;
}

const FeatureStrategyEditable = ({
    currentStrategy,
    updateStrategy,
    setDelDialog,
}: IFeatureStrategyEditable) => {
    const { projectId, featureId } = useParams<IFeatureViewParams>();
    const { activeEnvironment, featureCache, dirty, setDirty } = useContext(
        FeatureStrategiesUIContext
    );
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

        const dirtyParams = isDirtyParams(parameters);
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
    }, [featureCache]);

    const isDirtyParams = (parameters: IParameter) => {
        const initialParams = strategyCache?.parameters;

        if (!initialParams || !parameters) return false;

        const keys = Object.keys(initialParams);

        const dirty = keys.some(key => {
            const old = initialParams[key];
            const current = parameters[key];

            return old !== current;
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
            actions={
                <>
                    <Tooltip title="Delete strategy">
                        <IconButton
                            onClick={e => {
                                e.stopPropagation();
                                setDelDialog({
                                    strategyId: strategy.id,
                                    show: true,
                                });
                            }}
                        >
                            <Delete />
                        </IconButton>
                    </Tooltip>

                    <Tooltip title="Copy strategy">
                        <IconButton
                            onClick={e => {
                                e.stopPropagation();
                            }}
                        >
                            <FileCopy />
                        </IconButton>
                    </Tooltip>
                </>
            }
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
