import { useRef, useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { mutate } from 'swr';
import FeatureStrategiesUIContext from '../../../../../../contexts/FeatureStrategiesUIContext';
import useFeatureStrategyApi from '../../../../../../hooks/api/actions/useFeatureStrategyApi/useFeatureStrategyApi';
import useFeature from '../../../../../../hooks/api/getters/useFeature/useFeature';
import useToast from '../../../../../../hooks/useToast';
import { IFeatureViewParams } from '../../../../../../interfaces/params';
import {
    IConstraint,
    IParameter,
    IStrategy,
} from '../../../../../../interfaces/strategy';
import cloneDeep from 'lodash.clonedeep';
import useFeatureStrategy from '../../../../../../hooks/api/getters/useFeatureStrategy/useFeatureStrategy';

const useFeatureStrategiesEnvironmentList = (strategies: IStrategy[]) => {
    const { projectId, featureId } = useParams<IFeatureViewParams>();

    const { deleteStrategyFromFeature, updateStrategyOnFeature } =
        useFeatureStrategyApi();

    const {
        setConfigureNewStrategy,
        configureNewStrategy,
        activeEnvironment,
        setExpandedSidebar,
        expandedSidebar,
        setFeatureCache,
        featureCache,
    } = useContext(FeatureStrategiesUIContext);

    const { toast, setToastData } = useToast();
    const [delDialog, setDelDialog] = useState({ strategyId: '', show: false });
    const [productionGuard, setProductionGuard] = useState({
        show: false,
        strategyId: '',
    });

    const activeEnvironmentsRef = useRef(null);

    useEffect(() => {
        activeEnvironmentsRef.current = activeEnvironment;
    }, [activeEnvironment]);

    const updateStrategy = async (updatedStrategy: IStrategy) => {
        try {
            const updateStrategyPayload: IStrategyPayload = {
                constraints: updatedStrategy.constraints,
                parameters: updatedStrategy.parameters,
            };

            await updateStrategyOnFeature(
                projectId,
                featureId,
                activeEnvironment.id,
                updatedStrategy.id,
                updateStrategyPayload
            );

            setToastData({
                show: true,
                type: 'success',
                text: `Successfully updated strategy`,
            });

            const feature = cloneDeep(featureCache);

            const environment = feature.environments.find(
                env => env.name === activeEnvironment.name
            );

            const strategy = environment.strategies.find(
                strategy => strategy.id === updatedStrategy.id
            );

            strategy.parameters = updateStrategyPayload.parameters;
            strategy.constraints = updateStrategyPayload.constraints;

            setFeatureCache(feature);
        } catch (e) {
            setToastData({
                show: true,
                type: 'error',
                text: e.toString(),
            });
        }
    };

    const deleteStrategy = async (strategyId: string) => {
        try {
            const environmentId = activeEnvironment.name;
            await deleteStrategyFromFeature(
                projectId,
                featureId,
                environmentId,
                strategyId
            );

            const feature = cloneDeep(featureCache);
            const environment = feature.environments.find(
                env => env.name === environmentId
            );
            const strategyIdx = environment.strategies.findIndex(
                strategy => strategy.id === strategyId
            );

            environment.strategies.splice(strategyIdx, 1);
            setFeatureCache(feature);

            setDelDialog({ strategyId: '', show: false });
            setToastData({
                show: true,
                type: 'success',
                text: `Successfully deleted strategy from ${featureId}`,
            });
        } catch (e) {
            setToastData({
                show: true,
                type: 'error',
                text: e.toString(),
            });
        }
    };

    return {
        activeEnvironmentsRef,
        toast,
        deleteStrategy,
        updateStrategy,
        delDialog,
        setDelDialog,
        setProductionGuard,
        productionGuard,
        setConfigureNewStrategy,
        configureNewStrategy,
        setExpandedSidebar,
        expandedSidebar,
        featureId,
    };
};

export default useFeatureStrategiesEnvironmentList;
