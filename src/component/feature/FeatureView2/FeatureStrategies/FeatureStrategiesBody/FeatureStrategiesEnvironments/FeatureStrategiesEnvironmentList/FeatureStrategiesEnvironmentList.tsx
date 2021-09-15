import { IStrategy } from '../../../../../../../interfaces/strategy';
import { FEATURE_STRATEGIES_DRAG_TYPE } from '../../../FeatureStrategiesList/FeatureStrategyCard/FeatureStrategyCard';
import FeatureStrategyAccordion from './FeatureStrategyAccordion/FeatureStrategyAccordion';
import { useDrop, DropTargetMonitor } from 'react-dnd';
import { useEffect, useState } from 'react';
import { resolveDefaultParamValue } from '../../../../../strategy/AddStrategy/utils';
import { useParams } from 'react-router-dom';
import useStrategies from '../../../../../../../hooks/api/getters/useStrategies/useStrategies';
import { mutate } from 'swr';
import useFeature from '../../../../../../../hooks/api/getters/useFeature/useFeature';

interface IFeatureStrategiesEnvironmentListProps {
    strategies: IStrategy[];
    env: string;
}

interface IFeatureDragItem {
    name: string;
}

const FeatureStrategiesEnvironmentList = ({
    strategies,
    env,
}: IFeatureStrategiesEnvironmentListProps) => {
    const { strategies: selectableStrategies } = useStrategies();
    const { projectId, featureId } = useParams();
    const { FEATURE_CACHE_KEY, feature } = useFeature(projectId, featureId);

    const addNewStrategy = async (strategy: IStrategy) => {
        // Consider a deepclone tool or write a utility function
        let envs = [...feature.environments];
        envs = envs.map(env => {
            const newEnv = { ...env };
            newEnv.strategies = [...newEnv.strategies];
            return newEnv;
        });

        const newFeature = {
            ...feature,
            environments: envs,
        };

        const environment = newFeature.environments.find(
            environment => environment.name === env
        );

        environment?.strategies.push(strategy);

        mutate(FEATURE_CACHE_KEY, { ...newFeature }, false);
    };

    const selectStrategy = (name: string) => {
        const selectedStrategy = selectableStrategies.find(
            strategy => strategy.name === name
        );

        selectedStrategy?.parameters.forEach(({ name }) => {
            selectedStrategy.parameters[name] = resolveDefaultParamValue(
                name,
                featureId
            );
        });

        return selectedStrategy;
    };

    const [{ handlerId }, drop] = useDrop({
        accept: FEATURE_STRATEGIES_DRAG_TYPE,
        collect(monitor) {
            return {
                handlerId: monitor.getHandlerId(),
            };
        },
        drop(item: IFeatureDragItem, monitor: DropTargetMonitor) {
            //  const dragIndex = item.index;
            //  const hoverIndex = index;

            const strategy = selectStrategy(item.name);

            if (!strategy) return;
            addNewStrategy(strategy);
        },
    });

    const renderStrategies = () => {
        return strategies.map(strategy => {
            return <FeatureStrategyAccordion strategy={strategy} />;
        });
    };

    return <div ref={drop}>{renderStrategies()}</div>;
};

export default FeatureStrategiesEnvironmentList;
