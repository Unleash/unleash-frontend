import useSWR, { mutate } from 'swr';
import { useState, useEffect } from 'react';

import { formatApiPath } from '../../../../utils/format-path';
import { IFeatureToggle } from '../../../../interfaces/featureToggle';
import { defaultFeature } from './defaultFeature';

const useFeature = (projectId: string, id: string, revalidate = true) => {
    const fetcher = () => {
        const path = formatApiPath(
            `api/admin/projects/${projectId}/features/${id}`
        );
        return fetch(path, {
            method: 'GET',
        }).then(res => res.json());
    };

    const FEATURE_CACHE_KEY = `api/admin/projects/${projectId}/features/${id}`;

    const { data, error } = useSWR<IFeatureToggle>(FEATURE_CACHE_KEY, fetcher, {
        revalidateOnFocus: revalidate,
        revalidateOnReconnect: revalidate,
        revalidateIfStale: revalidate,
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
        loading,
        refetch,
        FEATURE_CACHE_KEY,
    };
};

export default useFeature;
