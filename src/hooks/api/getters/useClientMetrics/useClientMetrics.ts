import useSWR, { mutate } from 'swr';
import { useState, useEffect } from 'react';
import { formatApiPath } from '../../../../utils/format-path';

import { ToggleMetricsSummary } from '../../../../interfaces/client-metrics';

const useClientMetrics = (featureName: string) => {
    const fetcher = () => {
        const path = formatApiPath(`api/admin/client-metrics/${featureName}`);
        return fetch(path, {
            method: 'GET',
        }).then(res => res.json());
    };

    const KEY = `api/admin/client-metrics/${featureName}`;

    const { data, error } = useSWR<ToggleMetricsSummary>(KEY, fetcher);
    const [loading, setLoading] = useState(!error && !data);

    const refetch = () => {
        mutate(KEY);
    };

    useEffect(() => {
        setLoading(!error && !data);
    }, [data, error]);

    return {
        toggleMetricsSummary: data,
        error,
        loading,
        refetch,
    };
};

export default useClientMetrics;
