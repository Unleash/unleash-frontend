import React, { useEffect, useState, useContext } from 'react';
import { useFeature } from 'hooks/api/getters/useFeature/useFeature';
import { FeatureStrategyForm } from 'component/feature/FeatureStrategy/FeatureStrategyForm/FeatureStrategyForm';
import FormTemplate from '../../../common/FormTemplate/FormTemplate';
import useUiConfig from '../../../../hooks/api/getters/useUiConfig/useUiConfig';
import { useRequiredQueryParam } from 'hooks/useRequiredQueryParam';
import { useRequiredPathParam } from 'hooks/useRequiredPathParam';
import useFeatureStrategyApi from '../../../../hooks/api/actions/useFeatureStrategyApi/useFeatureStrategyApi';
import { formatUnknownError } from 'utils/format-unknown-error';
import { useHistory } from 'react-router-dom';
import useToast from '../../../../hooks/useToast';
import { IFeatureStrategy, IStrategyPayload } from 'interfaces/strategy';
import { UPDATE_FEATURE_STRATEGY } from 'component/providers/AccessProvider/permissions';
import AccessContext from 'contexts/AccessContext';

export const FeatureStrategyEdit = () => {
    const projectId = useRequiredPathParam('projectId');
    const featureId = useRequiredPathParam('featureId');
    const environmentId = useRequiredQueryParam('environmentId');
    const strategyId = useRequiredQueryParam('strategyId');

    const [strategy, setStrategy] = useState<Partial<IFeatureStrategy>>({});
    const { updateStrategyOnFeature, loading } = useFeatureStrategyApi();
    const { feature, refetchFeature } = useFeature(projectId, featureId);
    const { setToastData, setToastApiError } = useToast();
    const { hasAccess } = useContext(AccessContext);
    const { uiConfig } = useUiConfig();
    const { unleashUrl } = uiConfig;
    const { push } = useHistory();

    useEffect(() => {
        const savedStrategy = feature.environments
            .flatMap(environment => environment.strategies)
            .find(strategy => strategy.id === strategyId);
        setStrategy(prev => ({ ...prev, ...savedStrategy }));
    }, [strategyId, feature]);

    const onSubmit = async () => {
        try {
            await updateStrategyOnFeature(
                projectId,
                featureId,
                environmentId,
                strategyId,
                createStrategyPayload(strategy)
            );
            setToastData({
                title: 'Strategy updated',
                type: 'success',
                confetti: true,
            });
            refetchFeature();
            push(formatFeaturePath(projectId, featureId));
        } catch (error: unknown) {
            setToastApiError(formatUnknownError(error));
        }
    };

    // Wait until the strategy has loaded before showing the form.
    if (!strategy.id) {
        return null;
    }

    return (
        <FormTemplate
            modal
            title="Edit feature strategy"
            description={featureStrategyHelp}
            documentationLink={featureStrategyDocsLink}
            formatApiCode={() =>
                formatUpdateStrategyApiCode(
                    projectId,
                    featureId,
                    environmentId,
                    strategy,
                    unleashUrl
                )
            }
        >
            <FeatureStrategyForm
                mode="edit"
                feature={feature}
                strategy={strategy}
                setStrategy={setStrategy}
                environmentId={environmentId}
                onSubmit={onSubmit}
                loading={loading}
                hasAccess={hasAccess(
                    UPDATE_FEATURE_STRATEGY,
                    projectId,
                    environmentId
                )}
            />
        </FormTemplate>
    );
};

export const createStrategyPayload = (
    strategy: Partial<IFeatureStrategy>
): IStrategyPayload => {
    return {
        name: strategy.name,
        constraints: strategy.constraints ?? [],
        parameters: strategy.parameters ?? {},
    };
};

export const formatFeaturePath = (
    projectId: string,
    featureId: string
): string => {
    return `/projects/${projectId}/features/${featureId}`;
};

export const formatEditStrategyPath = (
    projectId: string,
    featureId: string,
    environmentId: string,
    strategyId: string
): string => {
    const params = new URLSearchParams({ environmentId, strategyId });

    return `/projects/${projectId}/features/${featureId}/strategies/edit?${params}`;
};

const formatUpdateStrategyApiCode = (
    projectId: string,
    featureId: string,
    environmentId: string,
    strategy: Partial<IFeatureStrategy>,
    unleashUrl?: string
): string => {
    if (!unleashUrl) {
        return '';
    }

    const url = `${unleashUrl}/api/admin/projects/${projectId}/features/${featureId}/${environmentId}/development/strategies/${strategy.id}`;
    const payload = JSON.stringify(strategy, undefined, 2);

    return `curl --location --request PUT '${url}' \\
    --header 'Authorization: INSERT_API_KEY' \\
    --header 'Content-Type: application/json' \\
    --data-raw '${payload}'`;
};

export const featureStrategyHelp = `
    An activation strategy will only run when a feature toggle is enabled and provides a way to control who will get access to the feature.
    If any of a feature toggle's activation strategies returns true, the user will get access.
`;

export const featureStrategyDocsLink =
    'https://docs.getunleash.io/user_guide/activation_strategy';
