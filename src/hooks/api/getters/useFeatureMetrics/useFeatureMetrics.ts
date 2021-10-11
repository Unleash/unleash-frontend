import { formatApiPath } from '../../../../utils/format-path';
import { useEffect, useState } from 'react';
import useSWR, { mutate } from 'swr';
import { IFeatureMetrics } from '../../../../interfaces/featureToggle';

interface IUseFeatureMetricsOptions {
    refreshInterval?: number;
    revalidateOnFocus?: boolean;
    revalidateOnReconnect?: boolean;
    revalidateIfStale?: boolean;
    revalidateOnMount?: boolean;
}

const useFeatureMetrics = (projectId: string, featureId: string, options: IUseFeatureMetricsOptions = {}) => {
    const fetcher = () => {
        const path = formatApiPath(`api/admin/client-metrics/features/${featureId}`);
        return fetch(path, {
            method: 'GET'
        }).then(res => res.json());
    };

    const FEATURE_METRICS_CACHE_KEY = `${projectId}_${featureId}_metrics`;
    const { data, error } = useSWR<IFeatureMetrics>(
        FEATURE_METRICS_CACHE_KEY,
        fetcher,
        {
            ...options
        }
    );

    const [loading, setLoading] = useState(!error && !data);

    const refetch = () => {
        mutate(FEATURE_METRICS_CACHE_KEY);
    };

    useEffect(() => {
        setLoading(!error && !data);
    }, [data, error]);

    return {
        metrics: data || { lastHourUsage: [], seenApplications: [] },
        error,
        loading,
        refetch,
        FEATURE_METRICS_CACHE_KEY
    };
};

export default useFeatureMetrics;
