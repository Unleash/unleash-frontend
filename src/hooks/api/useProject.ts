import useSWR, { mutate } from 'swr';
import { useState, useEffect } from 'react';
import { formatApiPath } from '../../utils/format-path';

const useProject = (id: string) => {
    const fetcher = () => {
        const path = formatApiPath(`api/admin/projects/${id}/features`);
        return fetch(path, {
            method: 'GET',
        }).then(res => res.json());
    };

    const KEY = `api/admin/projects`;

    const { data, error } = useSWR(KEY, fetcher);
    const [loading, setLoading] = useState(!error && !data);

    const refetch = () => {
        mutate(KEY);
    };

    useEffect(() => {
        setLoading(!error && !data);
    }, [data, error]);

    return {
        project: data || {},
        error,
        loading,
        refetch,
    };
};

export default useProject;
