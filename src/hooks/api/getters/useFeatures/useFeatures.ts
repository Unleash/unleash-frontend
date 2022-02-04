import useSWR, { mutate, SWRConfiguration } from 'swr';
import { useCallback } from 'react';
import { formatApiPath } from '../../../../utils/format-path';
import handleErrorResponses from '../httpErrorResponseHandler';
import { IFeatureToggle } from '../../../../interfaces/featureToggle';

const PATH = formatApiPath('api/admin/features');

export interface IUseFeaturesOutput {
    features: IFeatureToggle[];
    refetchFeatures: () => void;
    loading: boolean;
    error?: Error;
}

export const useFeatures = (options?: SWRConfiguration): IUseFeaturesOutput => {
    const { data, error } = useSWR<{ features: IFeatureToggle[] }>(
        PATH,
        fetchFeatures,
        options
    );

    const refetchFeatures = useCallback(() => {
        mutate(PATH).catch(console.warn);
    }, []);

    return {
        features: data?.features || [],
        loading: !error && !data,
        refetchFeatures,
        error,
    };
};

function fetchFeatures() {
    return fetch(PATH, { method: 'GET' })
        .then(handleErrorResponses('Features'))
        .then(res => res.json());
}
