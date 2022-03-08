import React, { useEffect, useState, useContext } from 'react';
import { useRequiredPathParam } from 'hooks/useRequiredPathParam';
import { useRequiredQueryParam } from 'hooks/useRequiredQueryParam';
import { useFeature } from 'hooks/api/getters/useFeature/useFeature';
import { FeatureStrategyForm } from 'component/feature/FeatureStrategy/FeatureStrategyForm/FeatureStrategyForm';
import FormTemplate from '../../../common/FormTemplate/FormTemplate';
import useUiConfig from '../../../../hooks/api/getters/useUiConfig/useUiConfig';
import useFeatureStrategyApi from '../../../../hooks/api/actions/useFeatureStrategyApi/useFeatureStrategyApi';
import { formatUnknownError } from 'utils/format-unknown-error';
import { useHistory } from 'react-router-dom';
import useToast from '../../../../hooks/useToast';
import { IFeatureStrategy } from 'interfaces/strategy';
import {
    featureStrategyDocsLink,
    featureStrategyHelp,
    formatFeaturePath,
    createStrategyPayload,
} from '../FeatureStrategyEdit/FeatureStrategyEdit';
import { getStrategyObject } from 'utils/get-strategy-object';
import { useStrategies } from 'hooks/api/getters/useStrategies/useStrategies';
import AccessContext from 'contexts/AccessContext';
import { CREATE_FEATURE_STRATEGY } from 'component/providers/AccessProvider/permissions';

export const FeatureStrategyCreate = () => {
    const projectId = useRequiredPathParam('projectId');
    const featureId = useRequiredPathParam('featureId');
    const environmentId = useRequiredQueryParam('environmentId');
    const strategyName = useRequiredQueryParam('strategyName');
    const [strategy, setStrategy] = useState<Partial<IFeatureStrategy>>({});
    const { strategies } = useStrategies();

    const { addStrategyToFeature, loading } = useFeatureStrategyApi();
    const { feature, refetchFeature } = useFeature(projectId, featureId);
    const { setToastData, setToastApiError } = useToast();
    const { hasAccess } = useContext(AccessContext);
    const { uiConfig } = useUiConfig();
    const { unleashUrl } = uiConfig;
    const { push } = useHistory();

    useEffect(() => {
        // Fill in the default values once the strategies have been fetched.
        setStrategy(getStrategyObject(strategies, strategyName, featureId));
    }, [strategies, strategyName, featureId]);

    const onSubmit = async () => {
        try {
            await addStrategyToFeature(
                projectId,
                featureId,
                environmentId,
                createStrategyPayload(strategy)
            );
            setToastData({
                title: 'Strategy created',
                type: 'success',
                confetti: true,
            });
            refetchFeature();
            push(formatFeaturePath(projectId, featureId));
        } catch (error: unknown) {
            setToastApiError(formatUnknownError(error));
        }
    };

    return (
        <FormTemplate
            title="Add feature strategy"
            description={featureStrategyHelp}
            documentationLink={featureStrategyDocsLink}
            formatApiCode={() =>
                formatAddStrategyApiCode(
                    projectId,
                    featureId,
                    environmentId,
                    strategy,
                    unleashUrl
                )
            }
        >
            <FeatureStrategyForm
                feature={feature}
                strategy={strategy}
                setStrategy={setStrategy}
                environmentId={environmentId}
                onSubmit={onSubmit}
                loading={loading}
                editable={hasAccess(
                    CREATE_FEATURE_STRATEGY,
                    projectId,
                    environmentId
                )}
            />
        </FormTemplate>
    );
};

export const formatCreateStrategyPath = (
    projectId: string,
    featureId: string,
    environmentId: string,
    strategyName: string
): string => {
    const params = new URLSearchParams({ environmentId, strategyName });

    return `/projects/${projectId}/features/${featureId}/strategies/create?${params}`;
};

const formatAddStrategyApiCode = (
    projectId: string,
    featureId: string,
    environmentId: string,
    strategy: Partial<IFeatureStrategy>,
    unleashUrl?: string
): string => {
    if (!unleashUrl) {
        return '';
    }

    const url = `${unleashUrl}/api/admin/projects/${projectId}/features/${featureId}/${environmentId}/development/strategies`;
    const payload = JSON.stringify(strategy, undefined, 2);

    return `curl --location --request POST '${url}' \\
    --header 'Authorization: INSERT_API_KEY' \\
    --header 'Content-Type: application/json' \\
    --data-raw '${payload}'`;
};
