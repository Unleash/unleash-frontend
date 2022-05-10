import useSWR, {SWRConfiguration} from 'swr';
import {useCallback} from 'react';
import {emptyFeature} from './emptyFeature';
import handleErrorResponses from '../httpErrorResponseHandler';
import {formatApiPath} from 'utils/formatPath';
import {IFeatureToggle} from 'interfaces/featureToggle';
import {openApiAdmin} from "../../../../utils/openapiClient";

export interface IUseFeatureOutput {
    feature: IFeatureToggle;
    refetchFeature: () => void;
    loading: boolean;
    status?: number;
    error?: Error;
}

export interface IFeatureResponse {
    status: number;
    body?: IFeatureToggle;
}

export const useFeature = (
    projectId: string,
    featureId: string,
    options?: SWRConfiguration
): IUseFeatureOutput => {

    const { data, error, mutate } = useSWR<IFeatureResponse>(
        ['useFeature'],
        () => featureFetcher(projectId, featureId),
        options
    );

    const refetchFeature = useCallback(() => {
        mutate().catch(console.warn);
    }, [mutate]);

    return {
        feature: data?.body || emptyFeature,
        refetchFeature,
        loading: !error && !data,
        status: data?.status,
        error,
    };
};

export const featureFetcher = async (projectId: string, featureId: string): Promise<IFeatureResponse> => {
    const {raw, value} = await openApiAdmin.getFeatureRaw({projectId, featureName: featureId});

    if (raw.status === 404) {
        return { status: 404 };
    }

    if (!raw.ok) {
        await handleErrorResponses('Feature toggle data')(raw);
    }

    return {
        status: raw.status,
        body: await value(),
    };
};

export const formatFeatureApiPath = (
    projectId: string,
    featureId: string
): string => {
    return formatApiPath(
        `api/admin/projects/${projectId}/features/${featureId}`
    );
};
