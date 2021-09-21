import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { mutate } from 'swr';
import FeatureStrategiesUIContext from '../../../../../../../contexts/FeatureStrategiesUIContext';
import useFeatureStrategyApi from '../../../../../../../hooks/api/actions/useFeatureStrategyApi/useFeatureStrategyApi';
import useFeature from '../../../../../../../hooks/api/getters/useFeature/useFeature';
import {
    IStrategy,
    IStrategyPayload,
    IParameter,
} from '../../../../../../../interfaces/strategy';
import FeatureStrategyAccordion from '../../../FeatureStrategyAccordion/FeatureStrategyAccordion';

interface IFeatureStrategeisEnvironmentListItem {
    strategy: IStrategy;
    setStrategyParams: (strategy: IStrategy) => void;
    index: number;
    setDelDialog: React.Dispatch<React.SetStateAction<boolean>>;
    setToastData: React.Dispatch<React.SetStateAction<any>>;
}

const FeatureStrategiesEnvironmentListItem = ({
    strategy,
    index,
    setDelDialog,
    setToastData,
}: IFeatureStrategeisEnvironmentListItem) => {
    const [strategyParams, setStrategyParams] = useState<IParameter>({});
    const [originalParams, setOriginalParams] = useState<IParameter>({});

    const { projectId, featureId } = useParams();
    const { activeEnvironment } = useContext(FeatureStrategiesUIContext);
    const { FEATURE_CACHE_KEY } = useFeature(projectId, featureId);

    const { updateStrategyOnFeature } = useFeatureStrategyApi();

    useEffect(() => {
        setInitialStrategyParams();
        /* eslint-disable-next-line */
    }, [strategy.parameters]);

    const setInitialStrategyParams = () => {
        setStrategyParams(strategy.parameters);
        setOriginalParams(strategy.parameters);
    };

    const isDirty = () => {
        let dirty = false;

        if (!strategyParams || !originalParams) return dirty;

        const keys = Object.keys(strategyParams);

        keys.forEach(key => {
            const old = originalParams[key];
            const current = strategyParams[key];

            if (old !== current) {
                dirty = true;
            }
        });

        return dirty;
    };

    const updateStrategy = async (strategyId: string) => {
        const updateStrategyPayload: IStrategyPayload = {
            constraints: [],
            parameters: strategyParams,
        };
        try {
            await updateStrategyOnFeature(
                projectId,
                featureId,
                activeEnvironment.id,
                strategyId,
                updateStrategyPayload
            );
            //mutate(FEATURE_CACHE_KEY);
            setToastData({
                show: true,
                type: 'success',
                text: `Successfully updated strategy`,
            });

            setOriginalParams(strategyParams);
        } catch (e) {
            setToastData({
                show: true,
                type: 'error',
                text: e.toString(),
            });
        }
    };

    return (
        <FeatureStrategyAccordion
            strategy={strategy}
            setStrategyParams={setStrategyParams}
            index={index}
            setDelDialog={setDelDialog}
            edit
            dirty={isDirty()}
            updateStrategy={updateStrategy}
        />
    );
};

export default FeatureStrategiesEnvironmentListItem;
