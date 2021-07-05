import useSWR, { mutate } from 'swr';
import { useState, useEffect } from 'react';
import { getProjectFetcher } from './getProjectFetcher';
import { IProject } from '../../../interfaces/project';
import { fallbackProject } from './fallbackProject';

const useProject = (id: string) => {
    const { KEY, fetcher } = getProjectFetcher(id);

    const { data, error } = useSWR<IProject>(KEY, fetcher);
    const [loading, setLoading] = useState(!error && !data);

    const refetch = () => {
        mutate(KEY);
    };

    useEffect(() => {
        setLoading(!error && !data);
    }, [data, error]);

    return {
        project: data || fallbackProject,
        error,
        loading,
        refetch,
    };
};

export default useProject;
