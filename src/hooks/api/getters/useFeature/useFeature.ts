import useSWR, { mutate, SWRConfiguration } from 'swr';
import { useState, useEffect } from 'react';

import { formatApiPath } from '../../../../utils/format-path';
import { IFeatureToggle } from '../../../../interfaces/featureToggle';
import { defaultFeature } from './defaultFeature';

const useFeature = (
    projectId: string,
    id: string,
    options: SWRConfiguration = {}
) => {
    const [status, setStatus] = useState<number>();
    const fetcher = async () => {
        const path = formatApiPath(
            `api/admin/projects/${projectId}/features/${id}`
        );
        return fetch(path).then(async res => {
            await setStatus(res.status);
            console.log(status);
            return res.json();
        });
    };

    const FEATURE_CACHE_KEY = `api/admin/projects/${projectId}/features/${id}`;

    const { data, error } = useSWR<IFeatureToggle>(FEATURE_CACHE_KEY, fetcher, {
        ...options,
    });

    const [loading, setLoading] = useState(!error && !data);

    const refetch = () => {
        mutate(FEATURE_CACHE_KEY);
    };

    useEffect(() => {
        setLoading(!error && !data);
    }, [data, error]);

    return {
        feature: data || defaultFeature,
        error,
        status,
        loading,
        refetch,
        FEATURE_CACHE_KEY,
    };
};

export default useFeature;
