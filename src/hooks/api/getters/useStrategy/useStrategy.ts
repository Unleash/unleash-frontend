import useSWR, { mutate, SWRConfiguration } from 'swr';
import { useEffect, useState } from 'react';
import { formatApiPath } from '../../../../utils/format-path';
import { IStrategy } from '../../../../interfaces/strategy';
import handleErrorResponses from '../httpErrorResponseHandler';

const useStrategy = (strategyName: string, options: SWRConfiguration = {}) => {
    const STRATEGY_CACHE_KEY = `api/admin/strategies/${strategyName}`;
    const path = formatApiPath(STRATEGY_CACHE_KEY);

    const fetcher = () => {
        return fetch(path, {
            method: 'GET',
            credentials: 'include',
        })
            .then(handleErrorResponses(`${strategyName} strategy`))
            .then(res => res.json());
    };

    const { data, error } = useSWR<{ strategies: IStrategy[] }>(
        STRATEGY_CACHE_KEY,
        fetcher,
        options
    );
    const [loading, setLoading] = useState(!error && !data);

    const refetchStrategy = () => {
        mutate(STRATEGY_CACHE_KEY);
    };

    useEffect(() => {
        setLoading(!error && !data);
    }, [data, error]);

    return {
        strategy: data || {},
        error,
        loading,
        refetchStrategy,
    };
};

export default useStrategy;
