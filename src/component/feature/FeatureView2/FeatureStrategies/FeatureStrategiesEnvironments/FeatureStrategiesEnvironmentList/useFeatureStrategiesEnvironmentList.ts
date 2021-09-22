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

const useFeatureStrategiesEnvironmentList = (strategies: IStrategy[]) => {
    const createStrategyData = () => {
        const parameterMap = strategies.reduce((acc, strategy) => {
            acc[strategy.id] = {
                parameters: { ...strategy.parameters },
                constraints: [...strategy.constraints],
            };
            return acc;
        }, {} as { [key: string]: IParameter });

        return parameterMap;
    };

    const createStrategyDataWithDirty = () => {
        const parameterMapWithDirty = strategies.reduce((acc, strategy) => {
            acc[strategy.id] = {
                parameters: { ...strategy.parameters },
                constraints: [...strategy.constraints],
                dirty: false,
            };
            return acc;
        }, {} as { [key: string]: IParameter });

        return parameterMapWithDirty;
    };

    const [strategyParams, setStrategyParams] = useState<{
        [index: string]: {
            parameters: IParameter;
            constraints: IConstraint[];
            dirty: boolean;
        };
    }>(createStrategyDataWithDirty());
    const { projectId, featureId } = useParams<IFeatureViewParams>();
    const { FEATURE_CACHE_KEY } = useFeature(projectId, featureId);

    const { deleteStrategyFromFeature, updateStrategyOnFeature } =
        useFeatureStrategyApi();
    const [originalParams, setOriginalParams] = useState<IParameter>(
        createStrategyData()
    );

    const {
        setConfigureNewStrategy,
        configureNewStrategy,
        activeEnvironment,
        setExpandedSidebar,
        expandedSidebar,
    } = useContext(FeatureStrategiesUIContext);

    const { toast, setToastData } = useToast();
    const [delDialog, setDelDialog] = useState({ strategyId: '', show: false });
    const [productionGuard, setProductionGuard] = useState({
        show: false,
        strategyId: '',
    });

    const paramsRef = useRef(null);
    const activeEnvironmentsRef = useRef(null);

    useEffect(() => {
        setInitialStrategyParams();
        /* eslint-disable-next-line */
    }, [strategies.length]);

    useEffect(() => {
        paramsRef.current = strategyParams;
    }, [strategyParams]);

    useEffect(() => {
        activeEnvironmentsRef.current = activeEnvironment;
    }, [activeEnvironment]);

    const setInitialStrategyParams = () => {
        setStrategyParams(createStrategyDataWithDirty());
        setOriginalParams(createStrategyData());
    };

    const updateStrategy = async (strategyId: string) => {
        try {
            const updateStrategyPayload: IStrategyPayload = {
                constraints: paramsRef?.current[strategyId]?.constraints,
                parameters: paramsRef?.current[strategyId]?.parameters,
            };

            console.log(updateStrategyPayload);

            await updateStrategyOnFeature(
                projectId,
                featureId,
                activeEnvironment.id,
                strategyId,
                updateStrategyPayload
            );

            mutate(FEATURE_CACHE_KEY);
            setToastData({
                show: true,
                type: 'success',
                text: `Successfully updated strategy`,
            });

            setOriginalParams(prevParams => ({
                ...prevParams,
                [strategyId]: { ...updateStrategyPayload },
            }));

            setStrategyParams(prevParams => {
                return {
                    ...prevParams,
                    [strategyId]: { ...updateStrategyPayload, dirty: false },
                };
            });
        } catch (e) {
            setToastData({
                show: true,
                type: 'error',
                text: e.toString(),
            });
        }
    };

    console.log(paramsRef.current);

    const deleteStrategy = async (strategyId: string) => {
        try {
            const environmentId = activeEnvironment.name;
            await deleteStrategyFromFeature(
                projectId,
                featureId,
                environmentId,
                strategyId
            );
            mutate(FEATURE_CACHE_KEY);
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

    const isDirty = (strategyId: string, parameters: IParameter) => {
        let dirty = false;
        console.log(strategyId, parameters);
        const initialParams = originalParams[strategyId].parameters;

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

    const onSetStrategyParams = (strategyId: string) => {
        return (parameters: IParameter) => {
            const dirty = isDirty(strategyId, parameters);
            setStrategyParams(prev => ({
                ...prev,
                [strategyId]: {
                    ...paramsRef?.current[strategyId],
                    parameters: { ...parameters },
                    dirty,
                },
            }));
        };
    };

    const onSetStrategyConstraints = (strategyId: string) => {
        return (constraints: IConstraint[]) => {
            const dirty = true;

            setStrategyParams(prev => ({
                ...prev,
                [strategyId]: {
                    ...paramsRef?.current[strategyId],
                    constraints: [...constraints],
                    dirty,
                },
            }));
        };
    };

    const discardChanges = (strategyId: string) => {
        const oldParams = originalParams[strategyId];

        setStrategyParams(prev => ({
            ...prev,
            [strategyId]: {
                constraints: [...oldParams.constraints],
                parameters: { ...oldParams.parameters },
                dirty: false,
            },
        }));
    };

    return {
        strategyParams,
        activeEnvironmentsRef,
        toast,
        onSetStrategyParams,
        onSetStrategyConstraints,
        originalParams,
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
        discardChanges,
    };
};

export default useFeatureStrategiesEnvironmentList;
