import useSWR, { mutate, SWRConfiguration } from 'swr';
import { useState, useEffect } from 'react';
import { formatApiPath } from '../../../../utils/format-path';
import handleErrorResponses from '../httpErrorResponseHandler';

const useProjectAccess = (
    projectId: string,
    options: SWRConfiguration = {}
) => {
    const fetcher = () => {
        const path = formatApiPath(`api/admin/projects/${projectId}/users`);
        return fetch(path, {
            method: 'GET',
        })
            .then(handleErrorResponses('project access'))
            .then(res => res.json());
    };

    const CACHE_KEY = `api/admin/projects/${projectId}/users`;

    const { data, error } = useSWR(CACHE_KEY, fetcher, options);
    const [loading, setLoading] = useState(!error && !data);

    const refetchProjectAccess = () => {
        mutate(CACHE_KEY);
    };

    useEffect(() => {
        setLoading(!error && !data);
    }, [data, error]);

    return {
        access: data ? data : { roles: [], users: [] },
        error,
        loading,
        refetchProjectAccess,
    };
};

export default useProjectAccess;
