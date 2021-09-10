import useSWR, { mutate } from 'swr';
import { useState, useEffect } from 'react';
import { getProjectFetcher } from './getProjectFetcher';
import { IProject } from '../../../../interfaces/project';
import { fallbackProject } from './fallbackProject';
import { formatApiPath } from '../../../../utils/format-path';

const useFeature = (id: string) => {
    const fetcher = () => {
        const path = formatApiPath(`api/admin/features/${id}`);
        return fetch(path, {
            method: 'GET',
        }).then(res => res.json());
    };

    const KEY = `api/admin/features/${id}`;

    const { data, error } = useSWR<IProject>(KEY, fetcher);
    const [loading, setLoading] = useState(!error && !data);

    const refetch = () => {
        mutate(KEY);
    };

    useEffect(() => {
        setLoading(!error && !data);
    }, [data, error]);

    return {
        feature: data,
        error,
        loading,
        refetch,
    };
};

export default useFeature;
