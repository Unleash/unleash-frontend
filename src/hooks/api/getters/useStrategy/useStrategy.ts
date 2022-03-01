import useSWR, { mutate, SWRConfiguration } from 'swr';
import { useEffect, useState } from 'react';
import { formatApiPath } from '../../../../utils/format-path';
import { IStrategy } from '../../../../interfaces/strategy';
import handleErrorResponses from '../httpErrorResponseHandler';

const useStrategy = (strategyName: string, options: SWRConfiguration = {}) => {
    const STRATEGY_CACHE_KEY = `api/admin/strategies/${strategyName}`;
    const path = formatApiPath(STRATEGY_CACHE_KEY);

    const fetcher = () => {
        return fetch(path)
            .then(handleErrorResponses(`${strategyName} strategy`))
            .then(res => res.json());
    };

    const { data, error } = useSWR<{ strategy: IStrategy }>(
        STRATEGY_CACHE_KEY,
        fetcher,
        options
    );

    const refetchStrategy = () => {
        mutate(STRATEGY_CACHE_KEY);
    };

    return {
        strategy: data || {
            name: '',
            description: '',
            parameters: [],
        },
        error,
        loading: !error && !data,
        refetchStrategy,
    };
};

export default useStrategy;
