import { useRef, useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { mutate } from 'swr';
import FeatureStrategiesUIContext from '../../../../../../contexts/FeatureStrategiesUIContext';
import useFeatureStrategyApi from '../../../../../../hooks/api/actions/useFeatureStrategyApi/useFeatureStrategyApi';
import useFeature from '../../../../../../hooks/api/getters/useFeature/useFeature';
import useToast from '../../../../../../hooks/useToast';
import { IFeatureViewParams } from '../../../../../../interfaces/params';
import { IParameter, IStrategy } from '../../../../../../interfaces/strategy';

const useFeatureStrategiesEnvironmentList = (strategies: IStrategy[]) => {
    const [strategyParams, setStrategyParams] = useState<{
        [index: string]: { parameters: IParameter; dirty: boolean };
    }>({});
    const { projectId, featureId } = useParams<IFeatureViewParams>();
    const { FEATURE_CACHE_KEY } = useFeature(projectId, featureId);

    const { deleteStrategyFromFeature, updateStrategyOnFeature } =
        useFeatureStrategyApi();
    const [originalParams, setOriginalParams] = useState<IParameter>({});
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
        const parameterMap = strategies.reduce((acc, strategy) => {
            acc[strategy.id] = { ...strategy.parameters };
            return acc;
        }, {} as { [key: string]: IParameter });

        const parameterMapWithDirty = strategies.reduce((acc, strategy) => {
            acc[strategy.id] = {
                parameters: { ...strategy.parameters },
                dirty: false,
            };
            return acc;
        }, {} as { [key: string]: IParameter });

        setStrategyParams(parameterMapWithDirty);
        setOriginalParams(parameterMap);
    };

    const updateStrategy = async (strategyId: string) => {
        try {
            const updateStrategyPayload: IStrategyPayload = {
                constraints: [],
                parameters: paramsRef?.current[strategyId]?.parameters,
            };

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
                [strategyId]: updateStrategyPayload.parameters,
            }));

            setStrategyParams(prevParams => {
                return {
                    ...prevParams,
                    [strategyId]: {
                        ...prevParams[strategyId].parameters,
                        dirty: false,
                    },
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
        const initialParams = originalParams[strategyId];

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

    const onSetStrategyParams = (
        parameters: IParameter,
        strategyId: string
    ) => {
        const dirty = isDirty(strategyId, parameters);
        setStrategyParams(prev => ({
            ...prev,
            [strategyId]: { parameters: { ...parameters }, dirty },
        }));
    };

    return {
        strategyParams,
        activeEnvironmentsRef,
        toast,
        onSetStrategyParams,
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
