import useSWR, { mutate } from 'swr';
import { useState, useEffect } from 'react';

import { formatApiPath } from '../../../../utils/format-path';
import { IFeatureStrategy } from '../../../../interfaces/strategy';
import handleErrorResponses from '../httpErrorResponseHandler';

interface IUseFeatureOptions {
    refreshInterval?: number;
    revalidateOnFocus?: boolean;
    revalidateOnReconnect?: boolean;
    revalidateIfStale?: boolean;
    revalidateOnMount?: boolean;
}

const useFeatureStrategy = (
    projectId: string,
    featureId: string,
    environmentId: string,
    strategyId: string,
    options: IUseFeatureOptions
) => {
    const fetcher = () => {
        const path = formatApiPath(
            `api/admin/projects/${projectId}/features/${featureId}/environments/${environmentId}/strategies/${strategyId}`
        );
        return fetch(path, {
            method: 'GET',
        }).then(handleErrorResponses).then(res => res.json());
    };

    const FEATURE_STRATEGY_CACHE_KEY = strategyId;

    const { data, error } = useSWR<IFeatureStrategy>(
        FEATURE_STRATEGY_CACHE_KEY,
        fetcher,
        {
            ...options,
        }
    );

    const [loading, setLoading] = useState(!error && !data);

    const refetch = () => {
        mutate(FEATURE_STRATEGY_CACHE_KEY);
    };

    useEffect(() => {
        setLoading(!error && !data);
    }, [data, error]);

    return {
        strategy:
            data ||
            ({
                constraints: [],
                parameters: {},
                id: '',
                name: '',
            } as IFeatureStrategy),
        error,
        loading,
        refetch,
        FEATURE_STRATEGY_CACHE_KEY,
    };
};

export default useFeatureStrategy;
