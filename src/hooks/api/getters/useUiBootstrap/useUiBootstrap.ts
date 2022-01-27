import useSWR, { mutate } from 'swr';
import { useState, useEffect } from 'react';
import handleErrorResponses from '../httpErrorResponseHandler';

export const USER_CACHE_KEY = `api/admin/ui-bootstrap`;

const useUiBootstrap = () => {
    const fetcher = () => {
        const path = 'api/admin/ui-bootstrap';
        return fetch(path, {
            method: 'GET',
        })
            .then(handleErrorResponses('bootstrap info'))
            .then(res => res);
    };

    const { data, error } = useSWR(USER_CACHE_KEY, fetcher);
    const [loading, setLoading] = useState(!error && !data);

    const refetchUiBootstrap = () => {
        mutate(USER_CACHE_KEY);
    };

    useEffect(() => {
        setLoading(!error && !data);
    }, [data, error]);

    console.log(data);

    return {
        bootstrap: data || {},
        error,
        loading,
        refetchUiBootstrap,
    };
};

export default useUiBootstrap;
